import fetch from 'node-fetch';
import fs from 'fs/promises';
import sharp from 'sharp';

import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const overrides = {
  PokeMMO: 'A free-to-play online monster mmorpg.',
};

const additions = [
  // Example:
  {
   name: 'MeloNX',
   desc: 'A Nintendo Switch Emulator for iOS / iPadOS devices on 15.0+.',
   iconURL: 'https://git.ryujinx.app/melonx/emu/-/raw/XC-ios-ht/src/MeloNX/MeloNX/Assets/Assets.xcassets/AppIcon.appiconset/nxgradientpng.png?ref_type=heads'
  },
];

const folderExists = async (path) => {
  let exists = false;
  try {
    exists = (await fs.stat(path)) && true;
  } catch (e) {
    if (e.code !== 'ENOENT') throw e;
  }
  return exists;
};

const outFolder = path.join(__dirname, '../src/assets/apps_data/');
//for each app get the name icon and subtitle and download the icon
(async () => {
  console.log(`✨ Updating mock events...`);
  const mockEvents = await (await fetch('https://api.github.com/orgs/sidestore/events?per_page=100')).json();
  await fs.writeFile(path.join(__dirname, '../src/assets/mockevents.json'), JSON.stringify(mockEvents, null, 2));

  console.log(`✨ Updating mock repos...`);
  const mockRepos = await (await fetch('https://api.github.com/users/sidestore/repos?per_page=50')).json();
  await fs.writeFile(path.join(__dirname, '../src/assets/mockrepos.json'), JSON.stringify(mockRepos, null, 2));

  //delete the folder if it exists and if command input contained --no-cache
  if (process.argv.includes('--no-cache') && (await folderExists(outFolder))) {
    await fs.rm(outFolder, { recursive: true });
  } else {
    console.log(`📂 Skipping apps_out folder deletion...`);
  }

  if (!(await folderExists(outFolder))) {
    await fs.mkdir(outFolder);
    console.log(`📂 Created apps_out folder...`);
  }

  //https://raw.githubusercontent.com/SideStore/SideStore/develop/trustedapps.json
  console.log(`✨ Fetching trusted sources...`);
  const rawSource = await (await fetch('https://raw.githubusercontent.com/SideStore/SideStore/develop/trustedapps.json')).json();
  const sources = rawSource.sources.map((i) => i.sourceURL).filter((i) => !(i === undefined || i === null));
  console.log(`✅ Got ${sources.length} sources...`);

  let built = [];

  const promises = sources.map(async (source) => {
    console.log(`✨ Fetching source ${source}...`);
    try {
      const response = await fetch(source);
      const json = await response.json();

      const appPromises = json.apps
        .filter((a) => {
          const allow = !['alpha', 'beta'].map((i) => a.name.toLowerCase().includes(i)).includes(true);
          if (!allow) {
            console.log(`🚫 Skipping ${a.name} as it's name contains "alpha" or "beta"`);
          }
          return allow;
        })
        .map(async (app) => {
          let name = app.name;
          let icon = app.iconURL || null;
          let subtitle = app.subtitle;

          let exists = false;
          try {
            exists = await fs.stat(outFolder + name + '.webp');
          } catch {}

          // if the app has an icon download it to the apps_out folder and then use sharp to resize it and convert it to webp
          if (icon && !exists) {
            try {
              console.log(`🖼️  Downloading icon for app ${name}...`);
              const file = await fetch(icon, {
                headers: {
                  'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36',
                },
              });
              const buffer = await file.arrayBuffer();
              const buffer2 = Buffer.from(buffer);
              const image = sharp(buffer2);

              //resize to 128x128
              image.resize(128, 128);
              //convert to webp
              image.webp();
              //save to apps_out folder
              await image.toFile(`${outFolder}${name}.webp`);
            } catch (e) {
              console.log(`🚫 Failed to download icon for ${name}... - ${icon}`);
              console.log(e);
              return;
            }
          }

          built.push({
            name,
            desc: overrides[name] || subtitle,
          });
        });
      await Promise.all(appPromises);
    } catch (e) {
      console.log(`🚫 Failed to fetch source ${source}...`);
    }
  });
  await Promise.all(promises);

  // Process custom additions
  console.log(`✨ Processing ${additions.length} custom additions...`);
  for (const app of additions) {
    const { name, desc, iconURL } = app;
    
    if (!name || !desc) {
      console.log(`🚫 Skipping custom app - missing name or desc`);
      continue;
    }

    let exists = false;
    try {
      exists = await fs.stat(outFolder + name + '.webp');
    } catch {}

    // Download and process icon if provided
    if (iconURL && !exists) {
      try {
        console.log(`🖼️  Downloading icon for custom app ${name}...`);
        const file = await fetch(iconURL, {
          headers: {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36',
          },
        });
        const buffer = await file.arrayBuffer();
        const buffer2 = Buffer.from(buffer);
        const image = sharp(buffer2);

        image.resize(128, 128);
        image.webp();
        await image.toFile(`${outFolder}${name}.webp`);
      } catch (e) {
        console.log(`🚫 Failed to download icon for custom app ${name}... - ${iconURL}`);
        console.log(e);
      }
    }

    built.push({
      name,
      desc,
    });
  }

  //remove dupe apps based on name
  built = built.filter((thing, index, self) => index === self.findIndex((t) => t.name === thing.name));
  console.log(`📝 Writing applist.json (${built.length} apps)...`);

  await fs.writeFile(outFolder + 'applist.json', JSON.stringify(built, null, 2));
})();
