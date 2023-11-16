// models/Business.js
import mongoose from 'mongoose';

const businessSchema = new mongoose.Schema({
  title: { type: String, required: true, maxlength: 60 },
  desc: { type: String, required: true, maxlength: 200 },
  img: { type: String, required: true },
  bannerImg: { type: String, required: true },
  profileImg: { type: String, required: true },
  price: { type: Number, required: true },
  prices: { type: [Number], required: true },
  extraOptions: [
    {
      text: { type: String, required: true },
      price: { type: Number, required: true },
    },
  ],
  // Agregamos referencias a News y Product
  news: [{ type: mongoose.Schema.Types.ObjectId, ref: 'News' }],
  products: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }],
}, { timestamps: true });

export default mongoose.models.Business || mongoose.model('Business', businessSchema);
