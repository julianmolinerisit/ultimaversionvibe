import mongoose from "mongoose";

const NewsSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      maxlength: 200,
    },
    subtitle: {
      type: String,
      maxlength: 300,
    },
    content: {
      type: String,
      required: true,
    },
    imageUrl: {
      type: String,
    },
    publicationDate: {
      type: Date, // Campo para la fecha de publicación
      default: Date.now,
    },
    business: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Business', // Referencia al modelo de Business
    },
    // Otros campos que desees agregar
  },
  { timestamps: true }
);

export default mongoose.models.News || mongoose.model("News", NewsSchema);
