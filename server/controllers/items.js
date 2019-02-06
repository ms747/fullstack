const router = require("express").Router()
const Joi = require("joi")

const items = [
    {
        id: 1,
        item: "pen",
        price: 10,
        quantity: 10,
        fromShop: "ABC"
    },
    {
        id: 2,
        item: "pen",
        price: 10,
        quantity: 2,
        fromShop: "XYZ"
    }
]

const itemSchema = Joi.object().keys({
    id: Joi.number(),
    item: Joi.string().required(),
    price: Joi.number().required(),
    quantity: Joi.number().required(),
    fromShop: Joi.string().required()
})


router.get("/", (req, res) => {
    res.json({ items: items })
})


// add new item

router.post("/", (req, res) => {
    const result = Joi.validate(req.body, itemSchema);
    if (result.error) {
        next(result.error.details[0].message)
    }
    const newItem = { ...req.body, id: items.length + 1 };
    items.push(newItem);
    res.json({ item: newItem })
})

// get item by id
router.get("/:id", (req, res, next) => {
    const foundItem = items.find((item) => {
        return item.id === parseInt(req.params.id)
    })
    if (foundItem) {
        console.log(foundItem)
        res.json({ item: foundItem })
    }
    else {
        next("Item not found");
    }
})

// edit item by id
router.post("/:id", (req, res, next) => {
    const result = Joi.validate(req.body,itemSchema);
    if (result.error) {
        next(result.error.details[0].message)
    }
    const foundItemIndex = items.findIndex((item)=>{
        return item.id === parseInt(req.params.id);
    })

    if(foundItemIndex === -1){
        next("item not found")
    }
    else{
        items[foundItemIndex] = {...req.body,id:req.params.id}
        res.json({item:items[foundItemIndex]})
    }
})

module.exports = router;