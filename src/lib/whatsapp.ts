import { env } from './env';

export function generateWhatsAppOrderMessage(order: any) {
  const items = order.items.map((item: any) => 
    `${item.quantity}x ${item.product.name} - $${item.price * item.quantity}`
  ).join('\n');
  
  return `🛒 *New Order*\n\nCustomer: ${order.customerName}\nPhone: ${order.customerPhone}\n\n*Items:*\n${items}\n\n*Total: $${order.totalAmount}*`;
}

export function getWhatsAppOrderLink(order: any) {
  const message = encodeURIComponent(generateWhatsAppOrderMessage(order));
  return `https://wa.me/${env.WHATSAPP_PHONE_NUMBER}?text=${message}`;
}
