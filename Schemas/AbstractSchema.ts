import { SchemaType, Types } from 'mongoose';

export class AbstractDocument {
  _id: SchemaType<Types.ObjectId>|undefined;
}

