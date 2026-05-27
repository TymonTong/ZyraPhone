import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const root = path.dirname(path.dirname(fileURLToPath(import.meta.url)))
const src = path.join(root, '..', '确定要用的图片')
const dst = path.join(root, 'public', 'img')

function copyDir(from, to) {
  fs.mkdirSync(to, { recursive: true })
  for (const name of fs.readdirSync(from)) {
    const sf = path.join(from, name)
    const df = path.join(to, name)
    if (fs.statSync(sf).isDirectory()) copyDir(sf, df)
    else fs.copyFileSync(sf, df)
  }
}

if (!fs.existsSync(src)) {
  console.error('Source not found:', src)
  process.exit(1)
}

copyDir(src, dst)
console.log('Copied to', dst)
console.log('Folders:', fs.readdirSync(dst))
