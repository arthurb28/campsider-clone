/**
 * Script one-shot pour obtenir un refresh token OAuth2 Google.
 * Lance : node scripts/get-refresh-token.mjs
 */
import { google } from "googleapis";
import { createServer } from "http";
import { config } from "dotenv";

config({ path: ".env.local" });

const CLIENT_ID     = process.env.GOOGLE_OAUTH_CLIENT_ID;
const CLIENT_SECRET = process.env.GOOGLE_OAUTH_CLIENT_SECRET;
const REDIRECT_URI  = "http://localhost:3099";
const PORT          = 3099;

if (!CLIENT_ID || !CLIENT_SECRET) {
  console.error("❌ GOOGLE_OAUTH_CLIENT_ID et GOOGLE_OAUTH_CLIENT_SECRET manquants dans .env.local");
  process.exit(1);
}

const oauth2 = new google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI);

const authUrl = oauth2.generateAuthUrl({
  access_type: "offline",
  prompt: "consent",                              // force l'émission d'un refresh token
  scope: ["https://www.googleapis.com/auth/drive"],
});

console.log("\n──────────────────────────────────────────────────");
console.log("👉 Ouvre cette URL dans ton navigateur :\n");
console.log(authUrl);
console.log("\n──────────────────────────────────────────────────");
console.log("⏳ En attente de l'autorisation...\n");

const server = createServer(async (req, res) => {
  const url  = new URL(req.url, `http://localhost:${PORT}`);
  const code = url.searchParams.get("code");

  if (!code) {
    res.writeHead(400);
    res.end("Code manquant.");
    return;
  }

  try {
    const { tokens } = await oauth2.getToken(code);

    res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
    res.end(`
      <html><body style="font-family:sans-serif;padding:40px">
        <h2>✅ Autorisation réussie !</h2>
        <p>Tu peux fermer cet onglet et retourner dans le terminal.</p>
      </body></html>
    `);

    console.log("✅ Refresh token obtenu !\n");
    console.log("Ajoute ces 3 lignes dans ton .env.local :\n");
    console.log(`GOOGLE_OAUTH_CLIENT_ID=${CLIENT_ID}`);
    console.log(`GOOGLE_OAUTH_CLIENT_SECRET=${CLIENT_SECRET}`);
    console.log(`GOOGLE_OAUTH_REFRESH_TOKEN=${tokens.refresh_token}`);
    console.log("\n──────────────────────────────────────────────────\n");
  } catch (err) {
    res.writeHead(500);
    res.end("Erreur : " + err.message);
    console.error("❌ Erreur :", err.message);
  } finally {
    server.close();
  }
});

server.listen(PORT, () => {
  console.log(`Serveur local démarré sur http://localhost:${PORT}`);
});
