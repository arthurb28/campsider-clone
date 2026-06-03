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
      typeVelo:     get("typeVelo"),
      infos:        get("infos"),
      dossier:      "",
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
      range: "A:M",
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
          row.typeVelo,
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
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; color: #262f2c; background: #ffffff;">

            <!-- En-tête -->
            <div style="background-color: #1D3D2D; padding: 28px 40px; text-align: center;">
              <p style="color: white; margin: 0; font-size: 26px; font-weight: 800; letter-spacing: -0.5px;">Campsider</p>
              <p style="color: rgba(255,255,255,0.6); margin: 4px 0 0; font-size: 13px; letter-spacing: 1px; text-transform: uppercase;">Reprise de vélo</p>
            </div>

            <!-- Accroche -->
            <div style="padding: 40px 40px 24px; background: #f9f9f9; border-bottom: 1px solid #e5e5e5; text-align: center;">
              <p style="font-size: 36px; margin: 0 0 12px;">✅</p>
              <h1 style="margin: 0 0 10px; font-size: 22px; font-weight: 800; color: #1D3D2D;">Votre demande est bien enregistrée</h1>
              <p style="margin: 0; font-size: 15px; color: #6b7280; line-height: 1.6;">
                Merci pour votre confiance. Un expert Campsider prendra contact avec vous<br/>
                <strong style="color: #262f2c;">dans les 48 heures</strong> pour vous présenter notre estimation.
              </p>
            </div>

            <!-- Récapitulatif -->
            <div style="padding: 32px 40px;">
              <p style="font-size: 11px; font-weight: 800; color: #9ca3af; text-transform: uppercase; letter-spacing: 1px; margin: 0 0 16px;">Récapitulatif de votre demande</p>
              <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
                <tr>
                  <td style="padding: 11px 0; border-bottom: 1px solid #f0f0f0; color: #9ca3af; width: 42%;">Numéro de demande</td>
                  <td style="padding: 11px 0; border-bottom: 1px solid #f0f0f0; font-weight: 700; color: #1D3D2D;">${row.numeroDemande}</td>
                </tr>
                <tr>
                  <td style="padding: 11px 0; border-bottom: 1px solid #f0f0f0; color: #9ca3af;">Type de vélo</td>
                  <td style="padding: 11px 0; border-bottom: 1px solid #f0f0f0;">${row.typeVelo}</td>
                </tr>
                <tr>
                  <td style="padding: 11px 0; border-bottom: 1px solid #f0f0f0; color: #9ca3af;">Vélo</td>
                  <td style="padding: 11px 0; border-bottom: 1px solid #f0f0f0;">${row.marque} ${row.modele} — ${row.annee}</td>
                </tr>
                <tr>
                  <td style="padding: 11px 0; border-bottom: 1px solid #f0f0f0; color: #9ca3af;">État</td>
                  <td style="padding: 11px 0; border-bottom: 1px solid #f0f0f0;">${row.etat.replace(/_/g, " ")}</td>
                </tr>
                ${row.localisation ? `<tr>
                  <td style="padding: 11px 0; border-bottom: 1px solid #f0f0f0; color: #9ca3af;">Localisation</td>
                  <td style="padding: 11px 0; border-bottom: 1px solid #f0f0f0;">${row.localisation}</td>
                </tr>` : ""}
                <tr>
                  <td style="padding: 11px 0; color: #9ca3af;">Date de la demande</td>
                  <td style="padding: 11px 0;">${row.timestamp}</td>
                </tr>
              </table>
            </div>

            <!-- Bloc étapes -->
            <div style="padding: 0 40px 36px;">
              <p style="font-size: 11px; font-weight: 800; color: #9ca3af; text-transform: uppercase; letter-spacing: 1px; margin: 0 0 16px;">La suite</p>
              <div style="display: flex; flex-direction: column; gap: 12px;">
                <div style="display: flex; align-items: flex-start; gap: 14px; padding: 16px; background: #f4f2ee; border-radius: 10px;">
                  <span style="font-size: 20px; flex-shrink: 0;">📞</span>
                  <div>
                    <p style="margin: 0 0 3px; font-size: 14px; font-weight: 700; color: #262f2c;">Un expert vous contacte sous 48h</p>
                    <p style="margin: 0; font-size: 13px; color: #6b7280;">Nous analysons votre dossier et vous proposons une estimation personnalisée, sans engagement.</p>
                  </div>
                </div>
                <div style="display: flex; align-items: flex-start; gap: 14px; padding: 16px; background: #f4f2ee; border-radius: 10px;">
                  <span style="font-size: 20px; flex-shrink: 0;">🤝</span>
                  <div>
                    <p style="margin: 0 0 3px; font-size: 14px; font-weight: 700; color: #262f2c;">Vous acceptez (ou non) l'offre</p>
                    <p style="margin: 0; font-size: 13px; color: #6b7280;">Aucune obligation. Vous gardez le contrôle à chaque étape.</p>
                  </div>
                </div>
                <div style="display: flex; align-items: flex-start; gap: 14px; padding: 16px; background: #f4f2ee; border-radius: 10px;">
                  <span style="font-size: 20px; flex-shrink: 0;">💳</span>
                  <div>
                    <p style="margin: 0 0 3px; font-size: 14px; font-weight: 700; color: #262f2c;">Paiement rapide et sécurisé</p>
                    <p style="margin: 0; font-size: 13px; color: #6b7280;">Une fois votre vélo vendu, vous êtes payé directement. Pas de frais cachés.</p>
                  </div>
                </div>
              </div>
            </div>

            <!-- CTA -->
            <div style="padding: 0 40px 40px; text-align: center;">
              <p style="font-size: 13px; color: #9ca3af; margin: 0;">
                Une question ? Répondez directement à cet email, nous serons ravis de vous aider.
              </p>
            </div>

            <!-- Pied de page -->
            <div style="background: #1D3D2D; padding: 20px 40px; text-align: center;">
              <p style="margin: 0; font-size: 12px; color: rgba(255,255,255,0.45);">© 2026 Campsider — La 1ère marketplace de sport outdoor d'occasion</p>
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
