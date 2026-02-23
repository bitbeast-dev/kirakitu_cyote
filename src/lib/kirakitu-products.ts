export interface Product {
  id: number
  name: string
  description: string
  image: string
  category: string
  price: string
}

export const products: Product[] = [
  {
    id: 1,
    name: 'Building Blocks',
    description: 'Colorful building blocks for creative minds. Hours of fun and learning.',
    image: 'rightboy.png',
    category: 'blocks',
    price: '24,990 RWF',
  },
  {
    id: 2,
    name: 'Puzzling',
    description: 'Educational puzzle sets that develop problem-solving skills in kids.',
    image: 'leftbear.png',
    category: 'puzzles',
    price: '19,990 RWF',
  },
  {
    id: 3,
    name: 'Rain Jay',
    description: 'Exciting adventure toy set. Explore and discover new worlds together.',
    image: 'rightboy.png',
    category: 'adventure',
    price: '34,990 RWF',
  },
  {
    id: 4,
    name: 'Art Supplies',
    description: 'Premium art supplies for young creative artists. Safe and non-toxic.',
    image: 'leftbear.png',
    category: 'art',
    price: '29,990 RWF',
  },
  {
    id: 5,
    name: 'Aply Hachernion',
    description: 'Interactive learning toy that makes education fun and engaging for kids.',
    image: 'rightboy.png',
    category: 'learning',
    price: '44,990 RWF',
  },
  {
    id: 6,
    name: 'Staasiove',
    description: 'Creative construction toy with colorful interlocking pieces for all ages.',
    image: 'leftboy.png',
    category: 'construction',
    price: '39,990 RWF',
  },
  {
    id: 7,
    name: 'Gate Beass',
    description: 'Outdoor adventure toy set designed for active and energetic kids.',
    image: 'righboy.png',
    category: 'outdoor',
    price: '27,990 RWF',
  },
]

export const bestsellers = [
  {
    id: 1,
    name: 'Ney Aatieutal',
    image: 'https://images.unsplash.com/photo-1566576721346-d4a3b4eaeb55?w=200&h=200&fit=crop',
    price: '32,990 RWF',
  },
  {
    id: 2,
    name: 'Pewrevaly Aragie',
    image: 'https://images.unsplash.com/photo-1558060370-d644479cb6f7?w=200&h=200&fit=crop',
    price: '28,990 RWF',
  },
]
