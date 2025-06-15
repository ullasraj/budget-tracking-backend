import mongoose from "mongoose";

const CategorySchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  name: { type: String, required: true },
  color: { type: String, default: '#cccccc' },
  createdAt: { type: Date, default: Date.now }
});

const Category = mongoose.model('Category', CategorySchema);

export default Category;
