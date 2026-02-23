'use server';

import { prisma } from '@/lib/db';
import { getWhatsAppOrderLink } from '@/lib/whatsapp';
import { redirect } from 'next/navigation';

export async function createOrder(formData: FormData) {
  const customerName = formData.get('customerName') as string;
  const customerPhone = formData.get('customerPhone') as string;
  const customerEmail = formData.get('customerEmail') as string;
  const cartItems = JSON.parse(formData.get('cartItems') as string);

  const totalAmount = cartItems.reduce((sum: number, item: any) => sum + (item.price * item.quantity), 0);

  const order = await prisma.order.create({
    data: {
      customerName,
      customerPhone,
      customerEmail,
      totalAmount,
      items: {
        create: cartItems.map((item: any) => ({
          productId: item.id,
          quantity: item.quantity,
          price: item.price,
        })),
      },
    },
    include: {
      items: {
        include: {
          product: true,
        },
      },
    },
  });

  for (const item of cartItems) {
    await prisma.product.update({
      where: { id: item.id },
      data: {
        stockCount: { decrement: item.quantity },
        inStock: { set: item.stockCount - item.quantity > 0 },
      },
    });
  }

  const whatsappLink = getWhatsAppOrderLink(order);
  redirect(whatsappLink);
}
