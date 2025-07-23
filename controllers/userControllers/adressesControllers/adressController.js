const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

exports.addNewUserAddress = async (req, res) => {
  const { id: userId } = req.user;
  const { street, city, country } = req.body;
  try {
    const newAddress = await prisma.address.create({
      data: {
        street: street,
        city: city,
        country: country,
        userId: userId,
      },
    });
    res.json(newAddress);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

exports.getUserAdresses = async (req, res) => {
  const { id: userId } = req.user;
  const { addressId } = req.query;
  try {
    if (addressId) {
        const address = await prisma.address.findFirst({
          where: {
            id: Number(addressId),
            userId: userId,
          },
          select: {
            street: true,
            city: true,
            country: true,
          },
        });
  
        if (!address) {
          return res.status(404).json({ message: "Address not found" });
        }
  
        return res.json({ address });
      }
    const addresses = await prisma.address.findMany({
      where: {
        userId: Number(userId),
      },
      select: {
        street: true,
        city: true,
        country: true,
      },
    });
    res.json({
      addresses,
    });
  
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

exports.updateUserAddress = async (req, res) => {
  const { id: userId } = req.user;
  const { id: addressId } = req.params;
  const { street, city, country } = req.body;

  const data = {};
  if (street) data.street = street;
  if (city) data.city = city;
  if (country) data.country = country;
  try {
    const address = await prisma.address.update({
      where: {
        id: Number(addressId),
        userId: userId,
      },
      data,
      select: {
        street: true,
        city: true,
        country: true,
      },
    });
    res.json(address);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

exports.deleteUserAddress = async (req, res) => {
  const { id: userId } = req.user;
  const { id: addressId } = req.params;
  try {
    const address = await prisma.address.delete({
      where: {
        id: Number(addressId),
        userId: userId,
      },
    });
    res.json(address);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};