import { Document, model, Schema } from "mongoose";

interface Transaction extends Document {
	user_id: string;
	time: Date;
	bill_cleared: boolean;
	bill_id: string;
}

const TransactionSchema = new Schema<Transaction>({
	user_id: {
		type: String,
		required: true,
	},
	time: {
		type: Date,
		required: true,
		default: new Date(Date.now()),
	},
	bill_cleared: {
		type: Boolean,
		required: true,	
		default: false,
	},
	bill_id: {
		type: String,
	}
});

const TransactionModel = model<Transaction>("Transaction", TransactionSchema);

export default TransactionModel;