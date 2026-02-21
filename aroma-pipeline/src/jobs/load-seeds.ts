import fs from 'fs';
import path from 'path';
import { validatePerfume, scorePerfumeCompleteness } from '../validators/perfume-validator.js';
import { upsertPerfume } from '../loaders/upsert-perfume.js';
import { logger } from '../utils/logger.js';

const SEEDS_DIR = path.join(process.cwd(), 'data/seeds');

async function main() {
  const files = fs.readdirSync(SEEDS_DIR).filter(f => f.endsWith('.json'));
  logger.info(`Found ${files.length} seed files`);

  let success = 0;
  let failed = 0;

  for (const file of files) {
    const raw = JSON.parse(fs.readFileSync(path.join(SEEDS_DIR, file), 'utf-8'));
    const validated = validatePerfume(raw);
    if (!validated) { failed++; continue; }

    const completeness = scorePerfumeCompleteness(validated);
    try {
      await upsertPerfume({ ...validated, data_completeness: completeness });
      success++;
    } catch (err) {
      logger.error(`Failed to load ${file}`, err);
      failed++;
    }
  }

  logger.info(`Done. Success: ${success}, Failed: ${failed}`);
}

main().catch(err => { console.error(err); process.exit(1); });
