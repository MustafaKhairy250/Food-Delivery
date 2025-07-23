const bcrypt = require("bcrypt");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

exports.getUser = async (req, res) => {
  const {id : userId} = req.user
  try {
    const user = await prisma.user.findFirst({
      where: {
        id: userId,
        deleted: false,
      },
      select: {
        id: true,
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
  const {id : userId} = req.user;
  const { name, email, oldpassword ,password, phone } = req.body;

  const data = {};
  try {
    const existingUser = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!existingUser) {
      return res.status(404).json({ message: "User not found" });
    }

  if (name) {
    data.name = name;
  }
  if (email) {
    data.email = email;
  }
  if (password) {
    const isMatch = await bcrypt.compare(oldpassword, existingUser.password);
    if(!isMatch) {
      return res.status(400).json({
        message: 'Invalid old password'
      })
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    data.password = hashedPassword;
  }
  if (phone) {
    data.phone = phone;
  }
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

exports.deleteUser = async (req, res) => {
  const {id : userId} = req.user;
  try {
    const existingOrders = await prisma.order.findMany({
      where: {
        userId: userId,
        status: {
          notIn : ["DELIVERED", "CANCELED"]
        }
      },
    })
    if(existingOrders.length > 0) {
      return res.status(400).json({
        message: "There are active orders for this user",
      });
    }
    await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        deleted: true,
      },
    });
    res.json({ message: "User deleted" });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};
