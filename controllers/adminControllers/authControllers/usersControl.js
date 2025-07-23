const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

exports.getUsers = async (req, res) => {
  const { id } = req.query;

  try {
    if (id) {
      const userId = Number(id);
      if (isNaN(userId)) {
        return res.status(400).json({ message: 'Invalid user ID' });
      }

      const user = await prisma.user.findUnique({
        where: { id: userId },
        select: {
          id: true,
          name: true,
          email: true,
          phone: true,
          role: true,
          createdAt: true,
          isreviewd: true,
          deleted: true,
          addresses: true,
          orders: true,
        }
      });

      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      return res.json(user);
    }

    const users = await prisma.user.findMany({
      select: {
        id: true,
        name: true,
      },
    });

    res.json(users);
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: 'Server error',
    });
  }
};

exports.getUnreviewedUsers = async (req, res) => {
  try {
    const rest = await prisma.user.findMany({
      where: {
        role: "RESTAURANT",
        isreviewd: null,
      },select : {
        id : true,
        name : true,
        email : true,
        phone : true,
        createdAt : true
      }
    });
    res.status(200).json({
      rest,
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};
exports.updateUser = async (req, res) => {
  const { id: userId } = req.params;
  const { name, email, phone, isreviewd } = req.body;
  const id = Number(userId);
  if (isNaN(id)) {
    return res.status(400).json({ message: 'Invalid user ID' });
  }
  const data = {};
  if (name) {
    data.name = name;
  }
  if (email) {
    data.email = email;
  }
  if (phone) {
    data.phone = phone;
  }
  if (typeof isreviewd === 'boolean') {
    data.isreviewd = isreviewd;
  }
  try {
    const existingUser = await prisma.user.findUnique({
      where: {
        id : Number(userId),
        deleted: false,
      },
    });

    if (!existingUser) {
      return res.status(404).json({ message: 'User not found' });
    }
    const user = await prisma.user.update({
      where: {
        id: Number(userId),
      },
      data,
      select: {
        id: true,
        name: true,
        email: true,
        phone: true,
        role: true,
        createdAt: true,
      },
    });
    res.json(user);
  } catch (err) {
    if (err.code === "P2002")
      return res.status(400).json({ message: "Email already in use" });
    res.status(500).json({ message: "Server error" });
  }
};

exports.deleteUser = async (req, res) => {
  const { id: userId } = req.params;
  try {
    await prisma.user.update({
      where: {
        id: Number(userId),
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
