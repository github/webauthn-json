type SchemaLeaf = "copy" | "convert";
export interface SchemaProperty {
  required: boolean;
  schema: Schema;
}
interface SchemaObject {
  [property: string]: SchemaProperty;
}
type SchemaArray = [SchemaObject] | [SchemaLeaf];

export type Schema = SchemaLeaf | SchemaArray | SchemaObject;
