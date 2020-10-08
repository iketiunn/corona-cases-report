// [ ] The temperature cannot be less than 30 °C or higher than 50 °C
//     for Fahrenheit degree, the temperature cannot be less than 86 °F or higher than 122 °F.
//     If the user input temperature is beyond the range,
//     show an error popup with meaningful message text.
export function validateC(c: string) {
  const t = Number(c);
  if (t < 30) return false;
  if (t > 50) return false;

  return true;
}

export function validateF(f: string) {
  const t = Number(f);
  if (t < 86) return false;
  if (t > 122) return false;

  return true;
}

export function cTof(c: string) {
  return ((Number(c) * 9) / 5 + 32).toFixed(2);
}

export function fToc(f: string) {
  return ((5 / 9) * (Number(f) - 32)).toFixed(2);
}
