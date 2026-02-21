import fs from 'fs';
import path from 'path';

const CHECKPOINT_DIR = path.join(process.cwd(), 'data/checkpoints');

export function saveCheckpoint(jobName: string, data: unknown): void {
  fs.mkdirSync(CHECKPOINT_DIR, { recursive: true });
  const file = path.join(CHECKPOINT_DIR, `${jobName}.json`);
  fs.writeFileSync(file, JSON.stringify(data, null, 2));
}

export function loadCheckpoint<T>(jobName: string): T | null {
  const file = path.join(CHECKPOINT_DIR, `${jobName}.json`);
  if (!fs.existsSync(file)) return null;
  return JSON.parse(fs.readFileSync(file, 'utf-8')) as T;
}

export function clearCheckpoint(jobName: string): void {
  const file = path.join(CHECKPOINT_DIR, `${jobName}.json`);
  if (fs.existsSync(file)) fs.unlinkSync(file);
}
