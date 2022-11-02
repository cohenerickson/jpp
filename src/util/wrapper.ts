export default function wrapper(js: string): string {
  return `
new class {
  constructor() {
    ((
      ${Object.keys(window).join(", ")}
    ) => {
      ${js}
    })();
  }
};`;
}
