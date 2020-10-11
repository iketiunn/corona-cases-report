export function formatNumber(n: number) {
  return n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
}

export const colors = {
  total: "#4ba9c8",
  bio :"#ff8280",
  recover: "#4bc86a",
  death: "#939393" 
}

export async function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(() => resolve(), ms))
}