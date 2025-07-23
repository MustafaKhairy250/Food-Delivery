const {PrismaClient} = require('@prisma/client')
const prisma = new PrismaClient()


exports.getAllRestaurants = async (req, res) => {
  try {
    const restaurants = await prisma.restaurant.findMany({
      where: {
        status: {
          notIn: ["DELETED", "REVIEWING"],
        },
      },
      select: {
        name: true,
        address: true,
      },
    });
    if (!restaurants) {
      return res.status(404).json({
        message: "Restaurants not found",
      });
    }
    res.status(200).json({
      restaurants,
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

exports.getOneRestaurant = async (req, res) => {
  const { id: paramId } = req.params;
  try {
    const restaurant = await prisma.restaurant.findUnique({
      where: {
        id: Number(paramId),
        status: {
          notIn: ["DELETED", "REVIEWING"],
        },
      },select :{
        name : true,
        address : true ,
        menuItem : {
          select : {
            name : true,
            price : true
          }
        }
      }
    });
    res.status(200).json({
      restaurant,
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

exports.getOneMenuItem = async (req, res) => {
  const { restId, id: menuItemId } = req.params;
  try {
    const rest = await prisma.restaurant.findUnique({
      where: {
        id: Number(restId),
        status: {
          notIn: ["DELETED", "REVIEWING"],
        },
      },
    });
    if (!rest)
      return res.status(404).json({
        message: "Restaurant not found",
      });
    const item = await prisma.menuItem.findUnique({
      where: {
        id: Number(menuItemId),
        restaurantId: Number(restId),
      },
      select: {
        name: true,
        describtion: true,
        price: true,
      },
    });
    if (!item) {
      return res.status(404).json({
        message: "Item not found",
      });
    }
    res.json(item);
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};