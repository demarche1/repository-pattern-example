import {
  FilterQuery,
  Model,
  Types,
  UpdateQuery,
  SaveOptions,
  Connection,
} from 'mongoose';
import { AbstractModel } from './AbstractModel';
import { AbstractDocument } from '../Schemas/AbstractSchema';

export abstract class AbstractRepository<TDocument extends AbstractDocument> {

  constructor(
    protected readonly model: Model<AbstractModel>,
    private readonly connection: Connection,
  ) {}

  async create(document: Omit<TDocument, '_id'>,options?: SaveOptions): Promise<TDocument> {

    const createdDocument = new this.model({
      ...document,
      _id: new Types.ObjectId(),
    });

    return (await createdDocument.save(options)).toJSON() as unknown as TDocument;
  }

  async findOne(filterQuery: FilterQuery<TDocument>): Promise<TDocument> {
    const document = await this.model.findOne(filterQuery, {}, { lean: true });

    if (!document) {
      throw new Error('Document not found.');
    }

    return document;
  }

  async findOneAndUpdate(filterQuery: FilterQuery<TDocument>,update: UpdateQuery<TDocument>): Promise<TDocument> {
    const document = await this.model.findOneAndUpdate(filterQuery, update, {
      lean: true,
      new: true,
    });

    if (!document) {
      throw new Error('Document not found.');
    }

    return document;
  }

  upsert(filterQuery: FilterQuery<TDocument>,document: Partial<TDocument>) {
    return this.model.findOneAndUpdate(filterQuery, document, {
      lean: true,
      upsert: true,
      new: true,
    });
  }

  find(filterQuery: FilterQuery<TDocument>) {
    return this.model.find(filterQuery, {}, { lean: true });
  }

  async startTransaction() {
    const session = await this.connection.startSession();
    session.startTransaction();
    return session;
  }
}