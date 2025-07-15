const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

exports.createNewOrder = async (req, res) => {
  const { id: userId } = req.user;
  const { restaurantId, items , addressId} = req.body;

  try {
    const address = await prisma.address.findUnique({
      where: { id: addressId, userId },
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
