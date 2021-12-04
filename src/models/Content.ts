import { Document, Schema } from "mongoose";

interface Content extends Document {
  type: string;
  content: string;
  date_created: Date;
  date_updated: Date;
}

const JokeSchema = new Schema<Content>({
  type: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  date_created: {
    type: Date,
    default: new Date(Date.now()),
  },
  date_updated: {
    type: Date,
    default: new Date(Date.now()),
  },
});
