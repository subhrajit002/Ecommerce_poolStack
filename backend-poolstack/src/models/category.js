import mongoose from "mongoose";

const CategorySchema = new mongoose.Schema({
    name: {
        type: String,
        maxlength: 50,
    },
    parentCategory: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "categories",
    },
    level: {
        type: Number,
        required: true,
    },
});

const Category = mongoose.model("categories", CategorySchema)
export default Category;