const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

exports.getAllUpdateRequests = async (req, res) => {
  try {
    const all = await prisma.restaurantUpdateRequest.findMany({
      where: {
        status: "PENDING",
      },select : {
        id : true,
        name : true,
        address : true,
        restaurantId : true,
        createdAt : true
      }
    });
    res.status(200).json({
      all
    })
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

exports.updateRestStatus = async (req, res) => {
  const { id: restId } = req.params;
  const { status } = req.body;
  try {
    const match = await prisma.restaurantUpdateRequest.findFirst({
      where: {
        restaurantId: Number(restId),
        status: "PENDING",
      },
    });
    if(!match) return res.status(404).json({message : "Not Found"})
      if (status === "APPROVED") {
        await prisma.restaurantUpdateRequest.update({
          where: {
            id: match.id,
          },
          data: {
            status: "APPROVED",
            updatedAt : new Date()
          },
        });
        await prisma.restaurant.update({
          where: {
            id: Number(restId),
          },
          data: {
            name: match.name,
            address: match.address,
            status: "UPDATED",
          },
        });
        return res.status(200).json({ message: "Restaurant update approved and applied" });
      } else if (status === "REJECTED") {
        await prisma.restaurantUpdateRequest.update({
          where: {
            id: match.id,
          },
          data: {
            status: "REJECTED",
            updatedAt : new Date()
          },
        });
        await prisma.restaurant.update({
          where: {
            id: Number(restId),
          },
          data: {
            status: "REJECTED",
          },
        });
        return res.status(200).json({ message: "Restaurant update rejected" });
      }
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};
