import mongoose from "mongoose";

const CartsSchema = new mongoose.Schema({
    id: {
        type: String,
        required: true
    },
    products: {
        type: [String],
        required: true
    }
});

export default mongoose.model("Carts", CartsSchema);