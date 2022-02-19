type TClassnamesParam =
  | {
      [key: string]: any;
    }
  | Array<string>
  | string;

export type TClassNamesFunction = (classes: TClassnamesParam) => string;

export default function classnames(classes: TClassnamesParam): string {
  if (Array.isArray(classes)) {
    return classes.join(" ");
  }
  if (typeof classes === "object") {
    return Object.keys(classes)
      .filter((className) => Boolean(classes[className]))
      .join(" ");
  }

  return classes as string;
}
