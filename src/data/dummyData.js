// Dummy users (in a real app, these would be stored in a database)
export const users = [
  {
    id: 'admin-1',
    name: 'Admin User',
    email: 'admin@infinix.com',
    password: 'admin123',
    role: 'admin',
    createdAt: '2024-01-01T00:00:00.000Z'
  },
  {
    id: 'user-1',
    name: 'John Doe',
    email: 'john@example.com',
    password: 'password123',
    role: 'user',
    createdAt: '2024-01-15T00:00:00.000Z'
  }
]

// Product categories
export const categories = [
  { id: 'living-room', name: 'Living Room' },
  { id: 'bedroom', name: 'Bedroom' },
  { id: 'dining', name: 'Dining' },
  { id: 'office', name: 'Office' },
  { id: 'outdoor', name: 'Outdoor' }
]

// Dummy products
export const products = [
  {
    id: 'sofa-1',
    name: 'Modern Leather Sofa',
    category: 'living-room',
    price: 1299.99,
    discount: 0,
    rating: 4.7,
    reviews: 32,
    inStock: true,
    description: 'Luxurious leather sofa with a modern design, perfect for contemporary living rooms. Features high-density foam cushions for exceptional comfort and durability.',
    details: {
      dimensions: '90"W x 38"D x 35"H',
      weight: '110 lbs',
      material: 'Top Grain Leather',
      color: 'Caramel Brown',
      assemblyRequired: true,
      warranty: '3 years limited'
    },
    features: [
      'Genuine top-grain leather upholstery',
      'Kiln-dried hardwood frame',
      'No-sag spring system',
      'High-density foam cushions',
      'Reinforced corner blocks'
    ],
    images: [
      'https://images.pexels.com/photos/1866149/pexels-photo-1866149.jpeg',
      'https://images.pexels.com/photos/276583/pexels-photo-276583.jpeg',
      'https://images.pexels.com/photos/276566/pexels-photo-276566.jpeg'
    ],
    modelPath: 'sofa-1.glb'
  },
  {
    id: 'table-1',
    name: 'Scandinavian Dining Table',
    category: 'dining',
    price: 899.99,
    discount: 100,
    rating: 4.5,
    reviews: 18,
    inStock: true,
    description: 'Elegant dining table inspired by Scandinavian design with solid oak top and angled legs. Comfortably seats 6 people.',
    details: {
      dimensions: '72"L x 36"W x 30"H',
      weight: '85 lbs',
      material: 'Solid Oak, Engineered Wood',
      color: 'Natural Oak',
      assemblyRequired: true,
      warranty: '2 years limited'
    },
    features: [
      'Solid oak tabletop',
      'Durable polyurethane finish',
      'Angled solid wood legs',
      'Seats 6 comfortably',
      'Water-resistant surface'
    ],
    images: [
      'https://images.pexels.com/photos/1395967/pexels-photo-1395967.jpeg',
      'https://images.pexels.com/photos/2995644/pexels-photo-2995644.jpeg'
    ],
    modelPath: 'table-1.glb'
  },
  {
    id: 'bed-1',
    name: 'King Platform Bed',
    category: 'bedroom',
    price: 799.99,
    discount: 0,
    rating: 4.8,
    reviews: 42,
    inStock: true,
    description: 'Modern platform bed with upholstered headboard and solid wood frame. Features clean lines and a minimalist aesthetic.',
    details: {
      dimensions: '82"L x 78"W x 45"H',
      weight: '120 lbs',
      material: 'Solid Pine, Linen Upholstery',
      color: 'Gray',
      assemblyRequired: true,
      warranty: '2 years limited'
    },
    features: [
      'Upholstered headboard',
      'Solid wood frame',
      'Center support legs',
      'No box spring needed',
      'Under-bed storage space'
    ],
    images: [
      'https://images.pexels.com/photos/1743229/pexels-photo-1743229.jpeg',
      'https://images.pexels.com/photos/1853371/pexels-photo-1853371.jpeg'
    ],
    modelPath: 'bed-1.glb'
  },
  {
    id: 'chair-1',
    name: 'Ergonomic Office Chair',
    category: 'office',
    price: 349.99,
    discount: 50,
    rating: 4.6,
    reviews: 27,
    inStock: true,
    description: 'Fully adjustable ergonomic office chair with breathable mesh back and lumbar support. Perfect for long working hours.',
    details: {
      dimensions: '26"W x 26"D x 45"H',
      weight: '35 lbs',
      material: 'Mesh, Metal, Nylon',
      color: 'Black',
      assemblyRequired: true,
      warranty: '5 years limited'
    },
    features: [
      'Breathable mesh back',
      'Adjustable lumbar support',
      'Adjustable armrests',
      'Tilt and height adjustment',
      '360° swivel'
    ],
    images: [
      'https://images.pexels.com/photos/1957477/pexels-photo-1957477.jpeg',
      'https://images.pexels.com/photos/1661375/pexels-photo-1661375.jpeg'
    ],
    modelPath: 'chair-1.glb'
  },
  {
    id: 'table-2',
    name: 'Modern Coffee Table',
    category: 'living-room',
    price: 249.99,
    discount: 0,
    rating: 4.4,
    reviews: 19,
    inStock: true,
    description: 'Sleek coffee table with tempered glass top and wooden shelf. The perfect centerpiece for any modern living room.',
    details: {
      dimensions: '47"L x 24"W x 16"H',
      weight: '40 lbs',
      material: 'Tempered Glass, Engineered Wood',
      color: 'Walnut/Clear',
      assemblyRequired: true,
      warranty: '1 year limited'
    },
    features: [
      'Tempered glass top',
      'Lower wooden shelf',
      'Sturdy construction',
      'Easy to clean surface',
      'Contemporary design'
    ],
    images: [
      'https://images.pexels.com/photos/276583/pexels-photo-276583.jpeg',
      'https://images.pexels.com/photos/1248583/pexels-photo-1248583.jpeg'
    ],
    modelPath: 'table-2.glb'
  },
  {
    id: 'chair-2',
    name: 'Accent Armchair',
    category: 'living-room',
    price: 399.99,
    discount: 75,
    rating: 4.5,
    reviews: 23,
    inStock: true,
    description: 'Stylish accent armchair with plush cushioning and solid wood legs. Adds a touch of elegance to any room.',
    details: {
      dimensions: '31"W x 32"D x 33"H',
      weight: '45 lbs',
      material: 'Polyester Fabric, Solid Beech Wood',
      color: 'Emerald Green',
      assemblyRequired: false,
      warranty: '1 year limited'
    },
    features: [
      'High-density foam cushioning',
      'Sturdy wood frame',
      'Soft polyester upholstery',
      'Tapered wooden legs',
      'Fire-resistant'
    ],
    images: [
      'https://images.pexels.com/photos/1350789/pexels-photo-1350789.jpeg',
      'https://images.pexels.com/photos/1668860/pexels-photo-1668860.jpeg'
    ],
    modelPath: 'chair-2.glb'
  },
  {
    id: 'dresser-1',
    name: 'Queen Dresser',
    category: 'bedroom',
    price: 599.99,
    discount: 0,
    rating: 4.3,
    reviews: 15,
    inStock: true,
    description: 'Classic dresser with six spacious drawers and antique-inspired hardware. Perfect for storing clothes and accessories.',
    details: {
      dimensions: '58"W x 18"D x 34"H',
      weight: '130 lbs',
      material: 'Solid and Engineered Wood',
      color: 'Antique White',
      assemblyRequired: true,
      warranty: '2 years limited'
    },
    features: [
      'Six spacious drawers',
      'Dovetail drawer construction',
      'Antique-inspired hardware',
      'Ball-bearing drawer glides',
      'Felt-lined top drawers'
    ],
    images: [
      'https://images.pexels.com/photos/2762247/pexels-photo-2762247.jpeg',
      'https://images.pexels.com/photos/11112735/pexels-photo-11112735.jpeg'
    ],
    modelPath: 'dresser-1.glb'
  },
  {
    id: 'patio-1',
    name: 'Outdoor Patio Set',
    category: 'outdoor',
    price: 749.99,
    discount: 150,
    rating: 4.7,
    reviews: 31,
    inStock: true,
    description: 'Weather-resistant 4-piece patio set including sofa, two chairs and coffee table. Perfect for outdoor entertaining.',
    details: {
      dimensions: 'Various',
      weight: '85 lbs (total)',
      material: 'Powder-coated Aluminum, Polyester',
      color: 'Gray',
      assemblyRequired: true,
      warranty: '3 years limited'
    },
    features: [
      'Weather-resistant materials',
      'UV-protected fabric',
      'Quick-dry foam cushions',
      'Rust-resistant frame',
      'Includes protective cover'
    ],
    images: [
      'https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg',
      'https://images.pexels.com/photos/2079249/pexels-photo-2079249.jpeg'
    ],
    modelPath: 'patio-1.glb'
  }
]

// Dummy orders
export const orders = [
  {
    id: 'order-1',
    userId: 'user-1',
    userName: 'John Doe',
    status: 'delivered',
    items: [
      { 
        productId: 'sofa-1', 
        name: 'Modern Leather Sofa',
        price: 1299.99,
        quantity: 1,
        image: 'https://images.pexels.com/photos/1866149/pexels-photo-1866149.jpeg'
      },
      { 
        productId: 'table-2', 
        name: 'Modern Coffee Table',
        price: 249.99,
        quantity: 1,
        image: 'https://images.pexels.com/photos/276583/pexels-photo-276583.jpeg'
      }
    ],
    shippingAddress: {
      street: '123 Main St',
      city: 'New York',
      state: 'NY',
      zipCode: '10001',
      country: 'USA'
    },
    paymentMethod: 'Credit Card',
    total: 1549.98,
    tax: 124.00,
    shipping: 0,
    grandTotal: 1673.98,
    createdAt: '2024-06-01T10:23:45.000Z',
    updatedAt: '2024-06-05T14:12:30.000Z'
  },
  {
    id: 'order-2',
    userId: 'user-1',
    userName: 'John Doe',
    status: 'processing',
    items: [
      { 
        productId: 'chair-1', 
        name: 'Ergonomic Office Chair',
        price: 299.99,
        quantity: 1,
        image: 'https://images.pexels.com/photos/1957477/pexels-photo-1957477.jpeg'
      }
    ],
    shippingAddress: {
      street: '123 Main St',
      city: 'New York',
      state: 'NY',
      zipCode: '10001',
      country: 'USA'
    },
    paymentMethod: 'PayPal',
    total: 299.99,
    tax: 24.00,
    shipping: 0,
    grandTotal: 323.99,
    createdAt: '2024-06-10T09:15:22.000Z',
    updatedAt: '2024-06-10T09:15:22.000Z'
  }
]

// Dummy saved room designs
export const savedDesigns = [
  {
    id: 'design-1',
    userId: 'user-1',
    userName: 'John Doe',
    name: 'Modern Living Room',
    thumbnail: 'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg',
    roomData: {
      dimensions: { width: 15, length: 20, height: 10 },
      wallColor: '#F5F5F5',
      floorColor: '#8B4513',
      furniture: [
        { id: 'sofa-1', position: { x: 0, y: 0, z: 0 }, rotation: 0, scale: 1 },
        { id: 'table-2', position: { x: 2, y: 0, z: 3 }, rotation: 0, scale: 1 }
      ]
    },
    createdAt: '2024-05-15T08:30:00.000Z',
    updatedAt: '2024-05-15T08:30:00.000Z'
  },
  {
    id: 'design-2',
    userId: 'user-1',
    userName: 'John Doe',
    name: 'Home Office Setup',
    thumbnail: 'https://images.pexels.com/photos/1957477/pexels-photo-1957477.jpeg',
    roomData: {
      dimensions: { width: 12, length: 12, height: 9 },
      wallColor: '#E0E0E0',
      floorColor: '#654321',
      furniture: [
        { id: 'chair-1', position: { x: 0, y: 0, z: 0 }, rotation: 0, scale: 1 }
      ]
    },
    createdAt: '2024-05-20T15:45:00.000Z',
    updatedAt: '2024-05-20T15:45:00.000Z'
  }
]