import { writeFile, mkdir } from "fs/promises";
import { createWriteStream } from "fs";
import { pipeline } from "stream/promises";
import path from "path";

const BASE_DIR = new URL("../public/images", import.meta.url).pathname.replace(/^\/([A-Z]:)/, "$1");

const assets = [
  // Hero banner images
  {
    url: "https://images.ctfassets.net/g56npo3mo9q7/1tlY1d5vYEOlTjWmmcMYJr/20a818e1c1bd04a83d66515003096ee5/gen-slider-without-trustpilot-desktop-min.jpg",
    dest: "hero/slider-1-desktop.jpg",
  },
  {
    url: "https://images.ctfassets.net/g56npo3mo9q7/17jvi5cUyIaA6PQQYhKBjq/145037a1a3eedad64722df3fb9eaf555/gen-slider-without-trustpilot-mobile-min__1_.jpg",
    dest: "hero/slider-1-mobile.jpg",
  },
  // Category cards
  {
    url: "https://images.ctfassets.net/g56npo3mo9q7/5wrC1ND8s83pYiC9CXot68/a7a576222e423820b0be225c622b6291/V_los_de_route.jpg",
    dest: "categories/velos-de-route.jpg",
  },
  {
    url: "https://images.ctfassets.net/g56npo3mo9q7/1LZwKjsReR4fWrrWlJsULA/edd53652d78a279b506421b82fa2dacd/V_los_gravel___voyage.png",
    dest: "categories/velos-gravel.png",
  },
  {
    url: "https://images.ctfassets.net/g56npo3mo9q7/7kJNRHrVW3elWubwrJQkeE/ef12b3775a91befb380c781a32bc83e5/VTT__lectriques.png",
    dest: "categories/vtt-electriques.png",
  },
  {
    url: "https://images.ctfassets.net/g56npo3mo9q7/1ao1DXMzZbcZvAjROqV5s8/8cae2ed4ade41457411bec677e0818e9/Ve_los_VTT.jpg",
    dest: "categories/vtt-musculaires.jpg",
  },
  {
    url: "https://images.ctfassets.net/g56npo3mo9q7/3H1txn7QA0WKZtkBWdDSen/3586d8d51c4343c85c0dc5e02f33e4b7/VTC__lectriques_1.png",
    dest: "categories/vtc-electriques.png",
  },
  // Flag icons
  {
    url: "https://assets.campsider.com/images/locales-selector/flag-fr.svg",
    dest: "flags/flag-fr.svg",
  },
  // Product cards (best deals)
  {
    url: "https://public.campsider.com/images/production/products/0/1779953944/6a17f1185a72c5.43499245-blob.png?size=390x390",
    dest: "products/corratec-dolomiti.png",
  },
  {
    url: "https://public.campsider.com/images/production/products/0/1774449754/69c3f45aa8caa6.86276427-blob.jpg?size=390x390",
    dest: "products/bmc-urs01.jpg",
  },
  {
    url: "https://public.campsider.com/images/production/products/0/1733322059/6750654b9acfa0.54509578-6698638d5c5344-08128589-orbea-orca-omx-t50.jpg?size=390x390",
    dest: "products/orbea-orca-omx.jpg",
  },
];

async function download(url, destRel) {
  const dest = path.join(BASE_DIR, destRel);
  await mkdir(path.dirname(dest), { recursive: true });
  const resp = await fetch(url);
  if (!resp.ok) {
    console.error(`FAIL ${url} → ${resp.status}`);
    return;
  }
  await pipeline(resp.body, createWriteStream(dest));
  console.log(`OK   ${destRel}`);
}

// Download in batches of 4
async function run() {
  const chunks = [];
  for (let i = 0; i < assets.length; i += 4) {
    chunks.push(assets.slice(i, i + 4));
  }
  for (const chunk of chunks) {
    await Promise.all(chunk.map(({ url, dest }) => download(url, dest)));
  }
  console.log("Done");
}

run().catch(console.error);
