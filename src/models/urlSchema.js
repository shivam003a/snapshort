import mongoose from 'mongoose';

const urlSchema = new mongoose.Schema({
	shortId: {
		type: String,
		required: true,
	},
	originalUrl: {
		type: String,
		required: true,
	},
	userId: {
		type: mongoose.Schema.Types.ObjectId,
		required: true
	},
	clickCount: {
		type: Number,
		default: 0,
	},
	clicks: [{
		uAgent: String,
		ip: String,
		device: String,
		browser: String,
		os: String,
		timestamp: { type: Date, default: Date.now },
	}],
}, { timestamps: true });

const Url = mongoose.models.Url || mongoose.model('Url', urlSchema);
export default Url;
