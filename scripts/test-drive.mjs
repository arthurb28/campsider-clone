import { google } from "googleapis";
import { config } from "dotenv";

config({ path: ".env.local" });

const auth = new google.auth.GoogleAuth({
  credentials: {
    client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
    private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
  },
  scopes: ["https://www.googleapis.com/auth/drive"],
});

const drive = google.drive({ version: "v3", auth });
const folderId = process.env.GOOGLE_DRIVE_FOLDER_ID;

console.log("📁 Dossier parent :", folderId);
console.log("⏳ Création d'un dossier test...\n");

try {
  const created = await drive.files.create({
    supportsAllDrives: true,
    requestBody: {
      name: `Test Campsider – ${new Date().toLocaleString("fr-FR")}`,
      mimeType: "application/vnd.google-apps.folder",
      parents: [folderId],
    },
    fields: "id,name,webViewLink",
  });

  console.log("✅ Dossier créé !");
  console.log("   Nom  :", created.data.name);
  console.log("   ID   :", created.data.id);
  console.log("   Lien :", created.data.webViewLink);
} catch (err) {
  console.error("❌ Échec :", err.message);
}
