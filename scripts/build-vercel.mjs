import { cpSync, existsSync, mkdirSync, rmSync } from 'node:fs';
import { execSync } from 'node:child_process';
import path from 'node:path';

const rootDir = process.cwd();
const frontendDistDir = path.join(rootDir, 'frontend', 'dist');
const rootDistDir = path.join(rootDir, 'dist');

execSync('npm run build --workspace frontend', { stdio: 'inherit' });

rmSync(rootDistDir, { recursive: true, force: true });

if (!existsSync(frontendDistDir)) {
  throw new Error('No se encontro frontend/dist despues del build');
}

mkdirSync(rootDistDir, { recursive: true });
cpSync(frontendDistDir, rootDistDir, { recursive: true });