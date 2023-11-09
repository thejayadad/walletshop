import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        min: 4
    },
    desc: {
        type: String,
        required: true,
        min: 6
    },
    price: {
        type: Number,
        required: true,
    },
    imageUrl: {
        type: String,
        required: true,
    },
}, {timestamps: true})

export default mongoose?.models?.Product || mongoose.model("Product", ProductSchema)