'use server';

import { prisma } from '@/lib/db';
import { revalidatePath } from 'next/cache';

export async function createProduct(formData: FormData) {
  const name = formData.get('name') as string;
  const brand = formData.get('brand') as string;
  const price = parseFloat(formData.get('price') as string);
  const oldPrice = parseFloat(formData.get('oldPrice') as string);
  const imageUrl = formData.get('imageUrl') as string;
  const category = formData.get('category') as string;
  const stockCount = parseInt(formData.get('stockCount') as string);

  await prisma.product.create({
    data: {
      name,
      brand,
      price,
      oldPrice,
      imageUrl,
      category,
      stockCount,
      inStock: stockCount > 0,
      discount: `${Math.round(((oldPrice - price) / oldPrice) * 100)}%`,
    },
  });

  revalidatePath('/');
  revalidatePath('/admin');
}

export async function updateProduct(id: string, formData: FormData) {
  await prisma.product.update({
    where: { id },
    data: {
      name: formData.get('name') as string,
      brand: formData.get('brand') as string,
      price: parseFloat(formData.get('price') as string),
      oldPrice: parseFloat(formData.get('oldPrice') as string),
      imageUrl: formData.get('imageUrl') as string,
      category: formData.get('category') as string,
      stockCount: parseInt(formData.get('stockCount') as string),
      inStock: parseInt(formData.get('stockCount') as string) > 0,
    },
  });

  revalidatePath('/');
  revalidatePath('/admin');
}

export async function deleteProduct(id: string) {
  await prisma.product.delete({ where: { id } });
  revalidatePath('/');
  revalidatePath('/admin');
}
