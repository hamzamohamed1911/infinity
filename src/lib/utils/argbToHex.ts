export function argbToHex(argb: string): string {
  const hex = argb.replace(/^0xff/, "#");
  return hex;
}
