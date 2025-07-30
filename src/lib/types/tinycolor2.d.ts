declare module "tinycolor2" {
  interface Instance {
    lighten: (amount?: number) => Instance;
    darken: (amount?: number) => Instance;
    toHexString: () => string;
  }

  interface TinyColor {
    (color: string): Instance;
  }

  const tinycolor: TinyColor;
  export default tinycolor;
}
