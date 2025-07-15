const bcrypt = require("bcrypt");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

exports.getUser = async (req, res) => {
  const userId = req.user.id;
  try {
    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
      select: {
        name: true,
        email: true,
        phone : true ,
        addresses: true ,
        createdAt: true,
      },
    });
    res.json(user);
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

exports.updateUser = async (req, res) => {
  const userId = req.user.id;
  const { name, email, password, phone } = req.body;

  const data = {};
  if (name) {
    data.name = name;
  }
  if (email) {
    data.email = email;
  }
  if (password) {
    const hashedPassword = await bcrypt.hash(password, 10);
    data.password = hashedPassword;
  }
  if (phone) {
    data.phone = phone;
  }
  try {
    const user = await prisma.user.update({
      where: {
        id: userId,
      },
      data,
      select: {
        name: true,
        email: true,
        phone: true,
      }
    });
    res.json(user);
  } catch (err) {
    if (err.code === "P2002")
      return res.status(400).json({ message: "Email already in use" });
    res.status(500).json({ message: "Server error" });
  }
};

exports.addUserAddress = async(req , res) =>{
  const userId = req.user.id
  const {street , city , country} = req.body
  try {
    const newAddress = await prisma.address.create({
      data : {
        street : street,
        city : city,
        country : country,
        user : {
          connect : {
            id : userId
          }
        }
      }
    })
    res.json(newAddress)
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
}
exports.deleteUser = async (req, res) => {
  const userId = req.user.id;
  try {
    await prisma.user.delete({
      where: {
        id: userId,
      },
    });
    res.json({ message: "User deleted" });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};
