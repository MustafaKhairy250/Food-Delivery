const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

exports.getRestaurants = async (req, res) => {
  const { ownerId } = req.query;

  try {
    const specifec = {};

    if (ownerId) {
      const id = Number(ownerId);
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid ownerId" });
      }
      specifec.ownerId = Number(id);
    }

    const restaurants = await prisma.restaurant.findMany({
      where: specifec,
      select : ownerId ? {
        id: true,
            name: true,
            address: true,
            createdAt: true,
            status: true,
            owner: {
              select: {
                id: true,
                name: true,
                email: true,
                isreviewd: true,
      }
    }
    } : {
      id : true,
      name : true,
      address : true,
      ownerId : true,
      status : true
    }
  });
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
    const restaurants = await prisma.restaurant.findUnique({
      where: {
        id: Number(paramId),
      },
      include: {
        menuItem: true,
        orders: true,
      },
    });
    res.status(200).json({
      restaurants,
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

exports.deleteRestaurant = async (req, res) => {
  const { id: restId } = req.params;
  try {
    await prisma.restaurant.update({
      where: {
        id: Number(restId),
      },data : {
        status : "DELETED",
        deletedAt : new Date()
      }
    });
    res.json({ message: "Restaurant deleted" });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};
