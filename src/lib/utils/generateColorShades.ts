import tinycolor from "tinycolor2";

export function generateColorShades(baseColor: string) {
  return {
    100: tinycolor(baseColor).lighten(45).toHexString(),
    200: tinycolor(baseColor).lighten(35).toHexString(),
    300: tinycolor(baseColor).lighten(25).toHexString(),
    400: tinycolor(baseColor).lighten(15).toHexString(),
    500: tinycolor(baseColor).toHexString(),
    600: tinycolor(baseColor).darken(10).toHexString(),
    700: tinycolor(baseColor).darken(20).toHexString(),
    800: tinycolor(baseColor).darken(30).toHexString(),
    900: tinycolor(baseColor).darken(40).toHexString(),
  };
}
