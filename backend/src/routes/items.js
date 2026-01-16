const express = require('express');

const Item = require('../../models/items')

const router = express.Router()

router.get('/reviewItems', async (req, res) => {
    try{
        const items = await Item.find()
        res.json(items)
    } 
    catch(err){
        res.status(500).json({message:err.message})
    }
});

// dynamic ids
router.get('/reviewItems/:id', async (req, res) => {
    // console.log("router working");
    try{
        const items = await Item.findById()
        res.json(items)
    } 
    catch(err){
        res.status(500).json({message:err.message})
    }
});

router.post('/createItems', async (req, res) =>{
    // console.log('headers:', req.headers);
    // console.log('body:', req.body);

    const items = new Item({
        itemName : req.body.name,
        quantity : req.body.quantity,
        description : req.body.description,
        found_at : req.body.found_at,
        placed_at : req.body.placed_at,
        photos : req.body.photos,
    });

    try {
        const newItems = await items.save()
        res.status(201).json(newItems)
    } catch (error) {
        res.status(400).json({message: error.message})
    }

});

router.delete('/deleteItems/:id', async (req, res) =>{
    console.log("Delete api")
    try{
        const items = await Item.findByIdAndDelete(req.params.id)
        if (!items) return res.status(404).json({ message: 'Not found' });
        res.status(200).json(items)
    }
    catch(error){
        res.status(400).json({message:error.message})
    }
    
});


module.exports = router