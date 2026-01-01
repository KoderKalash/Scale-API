import mongoose from "mongoose";

const itemSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    category: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    }
}, { timestamps: true })

//⚠️ Indexes are defined ONCE and created in DB
//search index
itemSchema.index({
    name: "text",
    description: "text"
})

//sort indices: 1-> ascending, -1: descending
//✅ Index what you query/sort often
itemSchema.index({ price: 1 })
itemSchema.index({ category: 1 })
itemSchema.index({ createdAt: -1 })
//itemSchema.index({ category: 1, price: 1 });


const Item = mongoose.model("Item", itemSchema)

export default Item