import Item from "../models/item.model.js"

export const createItems = async (req, res) => {
    const { name, description, category, price } = req.body
    if (!name || !category || !price)
        throw new Error("Name, Category, Price are required");
        

    const item = new Item({ name, description, category, price })
    const saveI = await item.save()

    res.status(201).json({
        saveI
    })
}


export const getItems = async (req,res) => {
    const items = await Item.find()

    res.status(200).json({
        status: "success",
        total_items: items.length,
        data: { items }
    })
}