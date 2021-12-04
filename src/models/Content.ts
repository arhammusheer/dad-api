import { Document, model, Schema } from "mongoose";

interface Content extends Document {
  type: string;
  content: string;
  date_created: Date;
  date_updated: Date;
}

const ContentSchema = new Schema<Content>({
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

const ContentModel = model<Content>("Content", ContentSchema);

export default ContentModel;