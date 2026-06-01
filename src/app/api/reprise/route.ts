import { NextRequest, NextResponse } from "next/server";
import { google } from "googleapis";
import { Readable } from "stream";
import { Resend } from "resend";

export const runtime = "nodejs";

function getSheetsAuth() {
  return new google.auth.GoogleAuth({
    credentials: {
      client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
      private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
    },
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
  });
}

function getDriveAuth() {
  const oauth2 = new google.auth.OAuth2(
    process.env.GOOGLE_OAUTH_CLIENT_ID,
    process.env.GOOGLE_OAUTH_CLIENT_SECRET,
  );
  oauth2.setCredentials({
    refresh_token: process.env.GOOGLE_OAUTH_REFRESH_TOKEN,
  });
  return oauth2;
}

async function uploadToDrive(file: File, folderId: string): Promise<void> {
  const auth  = getDriveAuth();
  const drive = google.drive({ version: "v3", auth });
  const buffer = Buffer.from(await file.arrayBuffer());

  const created = await drive.files.create({
    supportsAllDrives: true,
    requestBody: {
      name: file.name,
      parents: [folderId],
    },
    media: {
      mimeType: file.type || "application/octet-stream",
      body: Readable.from(buffer),
    },
    fields: "id",
  });

  await drive.permissions.create({
    fileId: created.data.id!,
    supportsAllDrives: true,
    requestBody: { role: "reader", type: "anyone" },
  });
}

async function createDriveFolder(
  name: string,
  parentId: string,
): Promise<{ id: string; link: string }> {
  const auth  = getDriveAuth();
  const drive = google.drive({ version: "v3", auth });

  const folder = await drive.files.create({
    supportsAllDrives: true,
    requestBody: {
      name,
      mimeType: "application/vnd.google-apps.folder",
      parents: [parentId],
    },
    fields: "id,webViewLink",
  });

  const id   = folder.data.id!;
  const link = folder.data.webViewLink ?? `https://drive.google.com/drive/folders/${id}`;

  // Rendre le dossier accessible via le lien
  await drive.permissions.create({
    fileId: id,
    supportsAllDrives: true,
    requestBody: { role: "reader", type: "anyone" },
  });

  return { id, link };
}

async function getNextRequestNumber(
  sheets: ReturnType<typeof google.sheets>,
  spreadsheetId: string,
): Promise<string> {
  const res = await sheets.spreadsheets.values.get({
    spreadsheetId,
    range: "A:A",
  });

  const rows = res.data.values ?? [];
  // Chercher le plus grand numéro existant (ignorer l'en-tête éventuel)
  let max = 0;
  for (const row of rows) {
    const val = row[0];
    if (typeof val === "string" && /^\d+$/.test(val)) {
      const n = parseInt(val, 10);
      if (n > max) max = n;
    }
  }

  return String(max + 1).padStart(8, "0");
}

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const get = (key: string) => (formData.get(key) as string | null) ?? "";

    const timestamp = new Date().toLocaleString("fr-FR", {
      timeZone: "Europe/Paris",
      dateStyle: "short",
      timeStyle: "medium",
    });

    const sheetsAuth = getSheetsAuth();
    const sheets = google.sheets({ version: "v4", auth: sheetsAuth });

    const numeroDemande = await getNextRequestNumber(
      sheets,
      process.env.GOOGLE_SHEET_ID!,
    );

    const row = {
      numeroDemande,
      timestamp,
      email:        get("email"),
      tel:          get("tel"),
      marque:       get("marque"),
      modele:       get("modele"),
      annee:        get("annee"),
      etat:         get("etat"),
      prix:         get("prix"),
      localisation: get("localisation"),
      infos:        get("infos"),
      dossier:      "", // lien dossier Drive (rempli si fichiers fournis)
    };

    const photoFiles  = formData.getAll("photos") as File[];
    const factureFile = formData.get("facture") as File | null;
    const hasFiles    = photoFiles.some((f) => f.size > 0) || (factureFile?.size ?? 0) > 0;

    const folderId = process.env.GOOGLE_DRIVE_FOLDER_ID;
    const hasOAuth = !!(
      process.env.GOOGLE_OAUTH_CLIENT_ID &&
      process.env.GOOGLE_OAUTH_CLIENT_SECRET &&
      process.env.GOOGLE_OAUTH_REFRESH_TOKEN
    );

    if (folderId && hasOAuth && hasFiles) {
      try {
        const folderName = `${numeroDemande} – ${row.marque} ${row.modele} – ${row.email}`.replace(
          /[/\\?%*:|"<>]/g,
          "-",
        );
        const { id: subFolderId, link: folderLink } = await createDriveFolder(
          folderName,
          folderId,
        );
        row.dossier = folderLink;

        for (const photo of photoFiles) {
          if (photo.size > 0) await uploadToDrive(photo, subFolderId);
        }
        if (factureFile && factureFile.size > 0) {
          await uploadToDrive(factureFile, subFolderId);
        }
      } catch (driveErr) {
        console.warn("[POST /api/reprise] Drive upload skipped:", driveErr);
      }
    }

    await sheets.spreadsheets.values.append({
      spreadsheetId: process.env.GOOGLE_SHEET_ID,
      range: "A:L",
      valueInputOption: "USER_ENTERED",
      requestBody: {
        values: [[
          row.numeroDemande,
          row.timestamp,
          row.email,
          row.tel,
          row.marque,
          row.modele,
          row.annee,
          row.etat,
          row.prix,
          row.localisation,
          row.infos,
          row.dossier,
        ]],
      },
    });

    // Envoyer l'email de confirmation au client
    try {
      const resend = new Resend(process.env.RESEND_API_KEY);
      await resend.emails.send({
        from: "Campsider Reprise <onboarding@resend.dev>",
        to: row.email,
        subject: `✅ Demande ${row.numeroDemande} bien reçue — ${row.marque} ${row.modele}`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; color: #262f2c;">
            <div style="background-color: #262f2c; padding: 24px 32px;">
              <h1 style="color: white; margin: 0; font-size: 24px; font-weight: 800; letter-spacing: -0.5px;">Campsider</h1>
            </div>
            <div style="padding: 32px; background: #f9f9f9; border-bottom: 3px solid #4c8076;">
              <h2 style="margin: 0 0 8px; font-size: 20px;">Votre demande a bien été reçue ✅</h2>
              <p style="margin: 0; color: #6b7280; font-size: 15px;">Un expert vous contactera sous <strong>48h</strong>.</p>
            </div>
            <div style="padding: 32px;">
              <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
                <tr>
                  <td style="padding: 10px 0; border-bottom: 1px solid #e5e5e5; color: #6b7280; width: 40%;">Numéro de demande</td>
                  <td style="padding: 10px 0; border-bottom: 1px solid #e5e5e5; font-weight: 700;">${row.numeroDemande}</td>
                </tr>
                <tr>
                  <td style="padding: 10px 0; border-bottom: 1px solid #e5e5e5; color: #6b7280;">Vélo</td>
                  <td style="padding: 10px 0; border-bottom: 1px solid #e5e5e5;">${row.marque} ${row.modele} (${row.annee})</td>
                </tr>
                <tr>
                  <td style="padding: 10px 0; border-bottom: 1px solid #e5e5e5; color: #6b7280;">État</td>
                  <td style="padding: 10px 0; border-bottom: 1px solid #e5e5e5;">${row.etat.replace("_", " ")}</td>
                </tr>
                <tr>
                  <td style="padding: 10px 0; color: #6b7280;">Date</td>
                  <td style="padding: 10px 0;">${row.timestamp}</td>
                </tr>
              </table>
              <div style="margin-top: 28px; padding: 20px; background: #f0f7f5; border-radius: 8px; border-left: 4px solid #4c8076;">
                <p style="margin: 0; font-size: 14px; color: #262f2c;">
                  🚴 Notre équipe analyse votre dossier et vous contacte sous <strong>48h</strong> avec une estimation personnalisée. Sans engagement.
                </p>
              </div>
              <p style="margin-top: 28px; font-size: 13px; color: #9ca3af;">
                Vous avez une question ? Répondez simplement à cet email.
              </p>
            </div>
            <div style="background: #262f2c; padding: 20px 32px; text-align: center;">
              <p style="margin: 0; font-size: 12px; color: rgba(255,255,255,0.5);">© 2026 Campsider — La 1ère marketplace de sport outdoor d'occasion</p>
            </div>
          </div>
        `,
      });
    } catch (emailErr) {
      console.warn("[POST /api/reprise] Email non envoyé :", emailErr);
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("[POST /api/reprise]", err);
    return NextResponse.json(
      { error: "Erreur serveur. Veuillez réessayer." },
      { status: 500 },
    );
  }
}
