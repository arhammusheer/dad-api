import { Document, model, Number, Schema } from "mongoose";

interface Request extends Document {
	user_id: string;
	time: Date;
	origin: {
		ip: string;
		user_agent: string;
	}
	transaction_id: string;
	url: string;
	method: string;
	status: number;
}

const RequestSchema = new Schema<Request>({
	user_id: {
		type: String,
		required: true,
	},
	time: {
		type: Date,
		required: true,
		default: new Date(Date.now()),
	},
	origin: {
		ip: {
			type: String,
			required: true,
		},
		user_agent: {
			type: String,
			required: true,
		}
	},
	transaction_id: {
		type: String,
	},
	url: {
		type: String,
		required: true,
	},
	method: {
		type: String,
		required: true,
	},
	status: {
		type: Number,
		required: true,
		default: 200,
	}
});

const RequestModel = model<Request>("Request", RequestSchema);

export default RequestModel;