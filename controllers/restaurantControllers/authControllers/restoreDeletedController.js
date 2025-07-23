const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

exports.getMyDeletedRestaurants = async (req, res) => {
  const { id: ownerId } = req.user;
  try {
    const deletedRestaurants = await prisma.restaurant.findMany({
      where : {
        ownerId : Number(ownerId),
        status : "DELETED"
      },
      select: {
          name: true,
          address: true,
          deletedAt: true,
        },
    })
    if(deletedRestaurants.length === 0){
      return res.status(404).json({ message : "No Deleted Restaurants Founded"})
    }
    res.json(deletedRestaurants);
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

exports.restoreDeletedRestaurant = async (req, res) => {
  const { id: ownerId } = req.user;
  const { id: restId } = req.params;
  try {
    const deletedRest = await prisma.restaurant.findFirst({
      where: {
        ownerId: Number(ownerId),
        id: Number(restId),
        status: "DELETED",
      }
    });
    if (!deletedRest)
      return res.status(404).json({ message: "Restaurant not found" });
    const restoredRest =  await prisma.restaurant.update({
      where: {
        id: deletedRest.id,
      },
      data: {
        status: "REVIEWED",
      },
      select: {
        name: true,
        address: true,
      },
    });
    return res.status(201).json({
      message: "Restaurant restored successfully",
      restoredRest,
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};
