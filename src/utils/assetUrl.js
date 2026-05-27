/** public 目录资源路径（兼容 GitHub Pages 子路径 base） */
export function assetUrl(path) {
  const normalized = path.startsWith('/') ? path.slice(1) : path
  const base = import.meta.env.BASE_URL
  return base.endsWith('/') ? `${base}${normalized}` : `${base}/${normalized}`
}
