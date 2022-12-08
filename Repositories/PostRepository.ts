import { SchemaType, Types } from 'mongoose';
import { AbstractRepository } from "../MongoDB/AbastractRepository";

interface Post {
  _id: SchemaType<Types.ObjectId>|undefined;
  title: string;
  content: string;
}

export class PostRepository extends AbstractRepository<Post> {}