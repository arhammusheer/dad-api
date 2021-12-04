import { Document, model, Schema } from "mongoose";

interface User extends Document {
  firstName: string;
  lastName: string;
  email: string;
  password_hash: string;
  password_salt: string;
  created_at: Date;
  updated_at: Date;
}

const UserSchema = new Schema<User>({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password_hash: {
    type: String,
    required: true,
  },
  password_salt: {
    type: String,
    required: true,
  },
  created_at: {
    type: Date,
    default: new Date(Date.now()),
  },
  updated_at: {
    type: Date,
    default: new Date(Date.now()),
  },
});

const UserModel = model<User>("User", UserSchema);

export default UserModel;
