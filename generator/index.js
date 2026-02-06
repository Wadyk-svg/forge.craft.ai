import fs from 'node:fs/promises';
import path from 'node:path';
import crypto from 'node:crypto';
import { spawn } from 'node:child_process';
import sharp from 'sharp';

const slugify = (value) =>
  value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '_')
    .replace(/^_+|_+$/g, '')
    .slice(0, 40) || 'craftforge_mod';

const hashPrompt = (prompt) =>
  crypto.createHash('sha256').update(prompt).digest('hex');

const toTitleCase = (value) =>
  value
    .replace(/[_-]+/g, ' ')
    .replace(/\b\w/g, (match) => match.toUpperCase());

const replaceInFile = async (filePath, replacements) => {
  const content = await fs.readFile(filePath, 'utf8');
  let updated = content;
  Object.entries(replacements).forEach(([key, value]) => {
    updated = updated.replaceAll(key, value);
  });
  await fs.writeFile(filePath, updated, 'utf8');
};

const createPixelTexture = async (prompt, outputFile) => {
  const hash = hashPrompt(prompt);
  const width = 16;
  const height = 16;
  const pixels = Buffer.alloc(width * height * 4);

  for (let y = 0; y < height; y += 1) {
    for (let x = 0; x < width; x += 1) {
      const index = (y * width + x) * 4;
      const hashIndex = (x + y * width) % (hash.length - 6);
      const base = parseInt(hash.slice(hashIndex, hashIndex + 6), 16);
      const r = (base >> 16) & 0xff;
      const g = (base >> 8) & 0xff;
      const b = base & 0xff;
      const shade = ((x + y) % 4) * 16;
      pixels[index] = Math.min(255, r + shade);
      pixels[index + 1] = Math.min(255, g + shade);
      pixels[index + 2] = Math.min(255, b + shade);
      pixels[index + 3] = 255;
    }
  }

  await sharp(pixels, { raw: { width, height, channels: 4 } })
    .png()
    .toFile(outputFile);
};

const runCommand = (command, args, cwd) =>
  new Promise((resolve, reject) => {
    const child = spawn(command, args, { cwd, stdio: 'inherit' });
    child.on('close', (code) => {
      if (code === 0) {
        resolve();
      } else {
        reject(new Error(`${command} exited with code ${code}`));
      }
    });
    child.on('error', reject);
  });

export const generateMod = async ({ prompt, outputDir, templateDir }) => {
  const modId = slugify(prompt);
  const displayName = toTitleCase(modId.replace(/_/g, ' '));
  const itemId = `${modId}_item`;
  const itemField = itemId.toUpperCase();

  await fs.cp(templateDir, outputDir, { recursive: true });

  await replaceInFile(path.join(outputDir, 'build.gradle'), {
    '__MODID__': modId,
    '__MODNAME__': displayName,
  });
  await replaceInFile(path.join(outputDir, 'settings.gradle'), {
    '__MODID__': modId,
  });
  await replaceInFile(path.join(outputDir, 'src/main/java/com/craftforge/mod/CraftForgeMod.java'), {
    '__MODID__': modId,
  });
  await replaceInFile(path.join(outputDir, 'src/main/java/com/craftforge/mod/ModItems.java'), {
    '__MODID__': modId,
    '__ITEM_ID__': itemId,
    '__ITEM_FIELD__': itemField,
  });
  await replaceInFile(path.join(outputDir, 'src/main/resources/META-INF/mods.toml'), {
    '__MODID__': modId,
    '__MODNAME__': displayName,
  });

  const assetsBase = path.join(outputDir, 'src/main/resources/assets', modId);
  await fs.mkdir(path.join(assetsBase, 'models', 'item'), { recursive: true });
  await fs.mkdir(path.join(assetsBase, 'textures', 'item'), { recursive: true });
  await fs.mkdir(path.join(assetsBase, 'lang'), { recursive: true });

  const texturePath = path.join(assetsBase, 'textures', 'item', `${itemId}.png`);
  await createPixelTexture(prompt, texturePath);

  const modelJson = {
    parent: 'item/handheld',
    textures: {
      layer0: `${modId}:item/${itemId}`,
    },
  };

  await fs.writeFile(
    path.join(assetsBase, 'models', 'item', `${itemId}.json`),
    JSON.stringify(modelJson, null, 2),
    'utf8'
  );

  const langJson = {
    [`item.${modId}.${itemId}`]: displayName,
  };

  await fs.writeFile(
    path.join(assetsBase, 'lang', 'en_us.json'),
    JSON.stringify(langJson, null, 2),
    'utf8'
  );

  const recipesBase = path.join(outputDir, 'src/main/resources/data', modId, 'recipes');
  await fs.mkdir(recipesBase, { recursive: true });
  const recipeJson = {
    type: 'minecraft:crafting_shaped',
    pattern: [' S ', ' S ', ' I '],
    key: {
      S: { item: 'minecraft:stick' },
      I: { item: 'minecraft:iron_ingot' },
    },
    result: { item: `${modId}:${itemId}` },
  };
  await fs.writeFile(
    path.join(recipesBase, `${itemId}.json`),
    JSON.stringify(recipeJson, null, 2),
    'utf8'
  );

  await runCommand('gradle', ['build'], outputDir);

  const jarPath = path.join(outputDir, 'build', 'libs', `${modId}-1.0.jar`);
  return {
    modId,
    displayName,
    itemId,
    jarPath,
    texturePath,
  };
};
