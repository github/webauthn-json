type SchemaLeaf = "copy" | "convert";
export interface SchemaProperty {
  required: boolean;
  schema: Schema;
  derive?: (v: any) => any; // For client extension results, transports, etc.
}
interface SchemaObject {
  [property: string]: SchemaProperty;
}
type SchemaArray = [SchemaObject] | [SchemaLeaf];

export type Schema = SchemaLeaf | SchemaArray | SchemaObject;
