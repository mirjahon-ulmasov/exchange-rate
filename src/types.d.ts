declare module "uuid" {
  export function v4(): string;
}

declare module "*.svg" {
  const content: any;
  export default content;
}
