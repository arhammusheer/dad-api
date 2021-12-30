import { Document, model, Number, Schema } from "mongoose";

interface Invoice extends Document {
	user_id: string;
	date_created: Date;
	date_paid: Date;
	request_ids: string[];
	amount: number;
	status: string;
}

const InvoiceSchema = new Schema<Invoice>({
	user_id: {
		type: String,
		required: true,
	},
	date_created: {
		type: Date,
		required: true,
		default: new Date(Date.now()),
	},
	date_paid: {
		type: Date,
		required: false,
		default: null,
	},
	request_ids: {
		type: [String],
		required: true,
	},
	amount: {
		type: Number,
		required: true,
	},
	status: {
		type: String,
		required: true,
		default: "pending",
	},
});

const InvoiceModel = model<Invoice>("Invoice", InvoiceSchema);

export default InvoiceModel;
