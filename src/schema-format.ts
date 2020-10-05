type SchemaLeaf = "copy" | "convert";
interface SchemaObject {
  [property: string]: { required: boolean; schema: Schema };
}
type SchemaArray = [SchemaObject] | [SchemaLeaf];

export type Schema = SchemaLeaf | SchemaArray | SchemaObject;
