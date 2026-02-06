import express from 'express';
import cors from 'cors';
import path from 'node:path';
import fs from 'node:fs/promises';
import { nanoid } from 'nanoid';
import { fileURLToPath } from 'node:url';
import { generateMod } from '../../generator/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = process.env.PORT || 4000;

app.use(cors());
app.use(express.json({ limit: '1mb' }));

const generatedRoot = path.join(__dirname, '../generated');

app.post('/api/generate', async (req, res) => {
  try {
    const prompt = req.body?.prompt?.trim();
    if (!prompt) {
      return res.status(400).json({ error: 'Prompt is required.' });
    }

    const jobId = nanoid(10);
    const outputDir = path.join(generatedRoot, jobId);
    const templateDir = path.join(__dirname, '../../forge_template');

    await fs.mkdir(outputDir, { recursive: true });

    const result = await generateMod({ prompt, outputDir, templateDir });

    res.json({
      jobId,
      modId: result.modId,
      displayName: result.displayName,
      itemId: result.itemId,
      downloadUrl: `/api/download/${jobId}`,
      textureUrl: `/api/texture/${jobId}`,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message || 'Generation failed.' });
  }
});

app.get('/api/download/:jobId', async (req, res) => {
  try {
    const jobId = req.params.jobId;
    const jobDir = path.join(generatedRoot, jobId);
    const manifestPath = path.join(jobDir, 'build', 'libs');
    const files = await fs.readdir(manifestPath);
    const jar = files.find((file) => file.endsWith('.jar'));
    if (!jar) {
      return res.status(404).json({ error: 'Jar not found.' });
    }
    res.download(path.join(manifestPath, jar), 'mod.jar');
  } catch (error) {
    res.status(500).json({ error: 'Unable to download jar.' });
  }
});

app.get('/api/texture/:jobId', async (req, res) => {
  try {
    const jobId = req.params.jobId;
    const jobDir = path.join(generatedRoot, jobId);
    const resourceDir = path.join(jobDir, 'src', 'main', 'resources', 'assets');
    const [modId] = await fs.readdir(resourceDir);
    const texturePath = path.join(resourceDir, modId, 'textures', 'item');
    const files = await fs.readdir(texturePath);
    const png = files.find((file) => file.endsWith('.png'));
    if (!png) {
      return res.status(404).json({ error: 'Texture not found.' });
    }
    res.sendFile(path.join(texturePath, png));
  } catch (error) {
    res.status(500).json({ error: 'Unable to load texture.' });
  }
});

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' });
});

app.listen(port, () => {
  console.log(`CraftForge backend listening on ${port}`);
});
