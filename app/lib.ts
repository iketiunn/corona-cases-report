export function cTof(c: string) {
  return ((Number(c) * 9) / 5 + 32).toFixed(2);
}

export function fToc(f: string) {
  return ((5 / 9) * (Number(f) - 32)).toFixed(2);
}
