import { prisma } from './db';

export async function getProducts() {
  return await prisma.product.findMany({ orderBy: { createdAt: 'desc' } });
}

export async function getProductById(id: string) {
  return await prisma.product.findUnique({ where: { id } });
}

export async function getInStockProducts() {
  return await prisma.product.findMany({ where: { inStock: true } });
}

export async function updateProductStock(id: string, stockCount: number) {
  return await prisma.product.update({
    where: { id },
    data: { stockCount, inStock: stockCount > 0 },
  });
}
