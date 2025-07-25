const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

exports.createNewOrder = async (req, res) => {
  const { id: userId } = req.user;
  const { restaurantId, items , addressId} = req.body;

  try {
    const address = await prisma.address.findUnique({
      where: {
          id: addressId ,
          userId: Number(userId) }
    });
    if (!address) {
      return res.status(400).json({ error: 'Invalid user address' });
    }

    const menuItemIds = items.map(i => i.menuItemId);
    const menuItems = await prisma.menuItem.findMany({
      where: { id: { in: menuItemIds }, restaurantId },
    });

    if (menuItems.length !== items.length) {
      return res.status(400).json({ error: 'One or more menu items not found in this restaurant' });
    }

    let total = 0;
    const orderItemsData = items.map(i => {
      const mi = menuItems.find(m => m.id === i.menuItemId);
      const price = mi.price;
      total += price * i.quantity;
      return {
        menuItemId: i.menuItemId,
        quantity: i.quantity,
        price: price,
      };
    });

    if (total < 50) {
      return res.status(400).json({ error: `Total must be at least 50, current total is ${total}` });
    }

    const order = await prisma.$transaction(async tx => {
      return tx.order.create({
        data: {
          userId: userId,
          restaurantId: restaurantId,
          total: total,
          addressId: addressId,
          items: { create: orderItemsData },
        },
        include: { items: true, deliveryAddress: true },
      });
    });

    res.status(201).json(order);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to create order' });
  } finally {
    await prisma.$disconnect();
  }
};

exports.getMyOrders = async (req, res) => {
  const { id: userId } = req.user;
  try {
    const orders = await prisma.order.findMany({
      where: { userId: userId },
      select: {
        userId : true,
        restaurantId : true,
        status : true,
        total : true,
        createdAt : true
      }
    });
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

exports.getOrdersDetails = async (req , res ) => {
  const { id: orderId } = req.params;
  const { id: userId } = req.user;
  try {
    const order = await prisma.order.findUnique({
      where: { 
        id: Number(orderId),
        userId: Number(userId)
       },
      include: { items: true, deliveryAddress: true },
    });
    res.json(order);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
}

exports.cancelOrder = async (req, res) => {
  const {id : orderId } = req.params;
  const { id : userId } = req.user;

  try {
    const order = await prisma.order.findUnique({ where: { id:  Number(orderId) } });
    if (!order) return res.status(404).json({ message: 'Order not found' });

    if (order.userId !== Number(userId))
      return res.status(403).json({ message: 'Forbidden: not your order' });

    if (order.status !== 'PENDING')
      return res.status(400).json({ message: 'Cannot cancel unless order is PENDING' });

    const updated = await prisma.order.update({
      where: { id: Number(orderId) },
      data: { status: 'CANCELED' },
    });

    res.json({ message: 'Order cancelled', order: updated });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};
