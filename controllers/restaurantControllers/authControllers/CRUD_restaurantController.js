const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

exports.createRestaurant = async (req, res) => {
  const { id: ownerId } = req.user;
  const { name, address } = req.body;
  try {
    await prisma.restaurant.create({
      data: {
        name: name,
        address: address,
        ownerId: ownerId,
      },
    });
    res.status(201).json({
      message: "Your Restaurant is under review",
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

exports.getMyRestaurants = async (req, res) => {
  const { id: userId } = req.user;
  try {
    const restaurants = await prisma.restaurant.findMany({
      where: {
        ownerId: Number(userId),
        status : {
          not :  "DELETED"
        }
      },select : {
        name : true,
        address : true,
        status : true
      }
    });
    if (!restaurants) {
      return res.status(404).json({
        message: "Restaurant not found for this user",
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
  const {id : ownerId } = req.user
  try {
    const restaurant = await prisma.restaurant.findUnique({
      where: {
        id: Number(paramId),
        ownerId : Number(ownerId),
        status : {
          not : "DELETED"
        }
      },
      select: {
        name: true,
        address: true,
        createdAt: true,
        updateRequests: true,
        menuItem: {
          select: {
            name: true,
            describtion: true,
            price: true,
          },
        },orders : {
          select : {
            status : true,
            createdAt : true,
            total : true,
          }
        }
      },
    });
    if(restaurant.status === "REVIEWING") return res.status(200).json({
      message : "Your Restaurant is under review"
    })
    res.status(200).json({
      restaurant,
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};
exports.updateRestaurant = async (req, res) => {
  const { id: restId } = req.params;
  const { id: ownerId } = req.user;
  const { name, address } = req.body;
  //check if there are any changes in the request
  if (!name && !address) {
    return res.status(400).json({ message: "No changes provided" });
  }
  // store the changes in a data object
  const data = {};
  if (name) {
    data.name = name;
  }
  if (address) {
    data.address = address;
  }
  try {
    // check if the user is the owner of the restaurant and if the restaurant exists
    const rest = await prisma.restaurant.findUnique({
      where: {
        id: Number(restId),
        ownerId: Number(ownerId),
      },
    });
    if (!rest) {
      return res
        .status(404)
        .json({ message: "Restaurant not found or forbidden" });
    }
    // check if there is already a pending update request
    const existingPendingRequest =
      await prisma.restaurantUpdateRequest.findFirst({
        where: {
          restaurantId: Number(restId),
          status: "PENDING",
        },
      });

    if (existingPendingRequest) {
      return res.status(400).json({
        message:
          "There is already a pending update request for this restaurant",
      });
    }
    // create the update request in updateRequest model
    await prisma.restaurantUpdateRequest.create({
      data: {
        restaurantId: Number(restId),
      ...data,
      }
    });
    // update the status of the restaurant
    await prisma.restaurant.update({
      where: {
        id: Number(restId),
      },
      data: {
        status: "UPDATING",
      },
    });
    res.status(200).json({
      message: "Update request submitted for admin review",
    });
  } catch (err) {
    if (err.code === "P2025")
      // not found
      return res.status(404).json({ message: "Restaurant not found" });
    res.status(500).json({
      message: err.message,
    });
  }
};

exports.deleteRestaurant = async (req, res) => {
  const { id: restId } = req.params;
  const { id: ownerId } = req.user;
  try {
    // check if the owner is the owner of the restaurant and if the restaurant exists
    const rest = await prisma.restaurant.findUnique({
      where: {
        id: Number(restId),
        ownerId: Number(ownerId),
      }
    });
    if (!rest) {
      return res.status(404).json({ message: "Restaurant not found or forbidden" });
    }
    // check if there are any active orders for this restaurant
    const existingOrders = await prisma.order.findMany({
      where: {
        restaurantId: Number(restId),
        status: {
          notIn: ["DELIVERED", "CANCELED"],
        },
      },
    });
    if (existingOrders.length > 0)
      return res.status(400).json({
        message: "There are active orders for this restaurant",
      });
    // update the status of the restaurant to deleted
      await prisma.restaurant.update({
        where: {
          id: Number(restId),
        },
        data: {
          status: "DELETED",
          deletedAt: new Date(),
        },
      });
    res.status(200).json({
      message: "Restaurant deleted successfully",
    });
  } catch (err) {
    if (err.code === "P2025")
      // not found
      return res.status(404).json({ message: "Restaurant not found" });
    res.status(500).json({
      message: err.message,
    });
  }
};
