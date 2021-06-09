type SchemaLeaf = "copy" | "convert";
export interface SchemaProperty {
  required: boolean;
  schema: Schema;
  deriveFn?(v: any): any;
}
interface SchemaObject {
  [property: string]: SchemaProperty;
}
type SchemaArray = [SchemaObject] | [SchemaLeaf];

export type Schema = SchemaLeaf | SchemaArray | SchemaObject;
