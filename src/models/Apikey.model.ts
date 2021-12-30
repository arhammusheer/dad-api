import { Document, model, Schema } from "mongoose";

interface Apikey extends Document {
    key: string;
    date_created: Date;
    date_expired: Date;
    user_id: string;
};

const ApikeySchema = new Schema<Apikey>({
    key: {
        type: String,
        required: true,
        unique: true,
    },
    date_created: {
        type: Date,
        default: new Date(Date.now()),
    },
    date_expired: {
        type: Date,
        default: new Date(Date.now() + (1000 * 60 * 60 * 24 * 30)),
    },
    user_id: {
        type: String,
        required: true,
    },
});

const ApikeyModel = model<Apikey>("Apikey", ApikeySchema);
export default ApikeyModel;