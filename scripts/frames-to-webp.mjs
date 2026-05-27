/**
 * 序列帧 → 动图 WebP
 * 每帧 dispose=background + blend=no：第 N 帧只显示第 N 张图，不叠加上一帧
 */
import { spawnSync } from 'node:child_process'
import { readdir, mkdtemp, rm } from 'node:fs/promises'
import { join, resolve, dirname } from 'node:path'
import { tmpdir } from 'node:os'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))

const WEBPMUX = join(
  process.env.TEMP || tmpdir(),
  'libwebp',
  'libwebp-1.4.0-windows-x64',
  'bin',
  'webpmux.exe',
)
const CWEBP = join(
  process.env.TEMP || tmpdir(),
  'libwebp',
  'libwebp-1.4.0-windows-x64',
  'bin',
  'cwebp.exe',
)

const inputDir = resolve(process.argv[2] || '')
const fps = Number(process.argv[4]) || 30
const quality = Number(process.argv[5]) || 0
const delayMs = Math.round(1000 / fps)
const outputPath = resolve(
  process.argv[3] || join(inputDir, '..', '总场景.webp'),
)
const lossless = quality <= 0

if (!inputDir) {
  console.error(
    '用法: node scripts/frames-to-webp.mjs <输入目录> [输出.webp] [fps] [quality]',
  )
  process.exit(1)
}

function run(cmd, args) {
  const r = spawnSync(cmd, args, { maxBuffer: 128 * 1024 * 1024 })
  if (r.status !== 0) {
    throw new Error(
      `${cmd} failed\n${(r.stderr || r.stdout || '').toString()}`,
    )
  }
}

const pngs = (await readdir(inputDir))
  .filter((f) => f.toLowerCase().endsWith('.png'))
  .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }))

if (!pngs.length) {
  console.error('目录内没有 PNG:', inputDir)
  process.exit(1)
}

console.log(
  `共 ${pngs.length} 帧, ${fps}fps (${delayMs}ms/帧), ${lossless ? '无损' : `有损 q=${quality}`}`,
)
console.log('输出:', outputPath)

const tempDir = await mkdtemp(join(tmpdir(), 'webp-frames-'))
try {
  const frameWebps = []
  for (let i = 0; i < pngs.length; i++) {
    const framePath = join(tempDir, `f${String(i).padStart(5, '0')}.webp`)
    const cwebpArgs = lossless
      ? ['-lossless', join(inputDir, pngs[i]), '-o', framePath]
      : ['-q', String(quality), '-alpha_q', '90', join(inputDir, pngs[i]), '-o', framePath]
    run(CWEBP, cwebpArgs)
    frameWebps.push(framePath)
    if ((i + 1) % 50 === 0) console.log(`  cwebp ${i + 1}/${pngs.length}`)
  }

  // 文件名与 +时长 必须分开传参；+1-b = 先清空画布再画本帧（不叠上一帧）
  const muxArgs = []
  for (const f of frameWebps) {
    muxArgs.push('-frame', f, `+${delayMs}+0+0+1-b`)
  }
  muxArgs.push('-loop', '0', '-o', outputPath)

  console.log('webpmux 合成中…')
  run(WEBPMUX, muxArgs)
  console.log('完成')
} finally {
  await rm(tempDir, { recursive: true, force: true })
}
