import { connect } from "mongoose";

export async function start() {
  const uri = "mongodb://localhost/test";
  await connect(uri)
}
