const {PrismaClient} = require('@prisma/client')
const prisma = new PrismaClient()

exports.getAllMenuItems = async (req , res) => {
    const {restId} = req.params
    try {
        const items = await prisma.menuItem.findMany({
            where : {
                restaurantId : Number(restId)
            }
        })
        res.json(items)
    } catch (err) {
        res.status(500).json({
            message : err.message
        })
    }
}

exports.getOneMenuItem = async (req , res) => {
    const {id} = req.params
    try {
        const item = await prisma.menuItem.findUnique({
            where : {
                id : Number(id)
            }
        })
        if(!item){
            return res.status(404).json({
                message : "Item not found"
            })
        }
        res.json(item)
    } catch (err) {
        res.status(500).json({
            message : err.message
        })
    }
}

exports.createMenuItem = async (req , res) => {
    const {restId} = req.params
    const {name , description , price } = req.body
    const rest = await prisma.restaurant.findUnique({
        where : {
            id : Number(restId), ownerId : req.user.id
        }
    })
    if(!rest){
        return res.status(403).json({
            message : "Forbidden - can't add menu item to this restaurant"
        })
    }
    try {
        const item = await prisma.menuItem.create({
            data : {
                name : name,
                describtion : description,
                price : Number(price),
                restaurantId : Number(restId)
            }
        })
        res.status(201).json(item)
    } catch (err) {
        res.status(500).json({
            message : err.message
        })
    }
}

exports.updateMenuItem = async (req, res) => {
    const itemId = Number(req.params.id);
    const { name, description, price } = req.body;
  
    const item = await prisma.menuItem.findUnique({ where: { id: itemId } });
    if (!item) return res.status(404).json({ message: 'MenuItem not found' });
  
    const rest = await prisma.restaurant.findUnique({
      where: { id: item.restaurantId, ownerId: req.user.id },
    });
    if (!rest) return res.status(403).json({ message: 'Forbidden: not owner' });
  
    const data = {};
    if (name !== undefined) data.name = name;
    if (description !== undefined) data.describtion = description;
    if (price !== undefined) data.price = Number(price);
  
    if (Object.keys(data).length === 0)
      return res.status(400).json({ message: 'No valid fields provided for update' });
  
    const updated = await prisma.menuItem.update({
      where: { id: itemId },
      data,
    });
    res.json(updated);
  };


exports.deleteMenuItem = async (req, res) => {
    const itemId = Number(req.params.id);
    const item = await prisma.menuItem.findUnique({ where: { id: itemId } });
    if (!item) return res.status(404).json({ message: 'MenuItem not found' });
  
    const rest = await prisma.restaurant.findUnique({
      where: { id: item.restaurantId, ownerId: req.user.id },
    });
    if (!rest) return res.status(403).json({ message: 'Forbidden: not owner' });
  
    await prisma.menuItem.delete({ where: { id: itemId } });
    res.json({ message: 'MenuItem deleted' });
  };