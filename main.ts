import { PostRepository } from "./Repositories/PostRepository";
import PostSchema from "./Schemas/post.schema"
import mongoose from "mongoose";
import { start } from "./MongoDB/Config";

async function Main() {
  try {
    await start();
    const postRepository = new PostRepository(PostSchema, mongoose.connection);
    const session = await postRepository.startTransaction();
  
    console.log("Creating a new post");
  
    const post = await postRepository.create({
      title: "Hello World 2",
      content: "This is my first post",
    });
  
    console.log(post);
  
    session.commitTransaction();
  } catch (error) {
    console.log(error);
  }
}

Main();