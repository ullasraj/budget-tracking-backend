import mongoose from "mongoose";

const BudgetSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  categoryId: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true },
  month: { type: Number, required: true },  // 0–11 (JS months)
  year: { type: Number, required: true },
  amount: { type: Number, required: true }
});

BudgetSchema.index({ userId: 1, categoryId: 1, month: 1, year: 1 }, { unique: true });

const Budget = mongoose.model('Budget', BudgetSchema);

export default Budget;
