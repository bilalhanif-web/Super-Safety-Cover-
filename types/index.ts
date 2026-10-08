export interface Category {
  id: string;
  name: string;
  slug: string;
  shortDescription: string;
  image: string;
  bannerImage?: string;
  itemCount: number;
}

export interface BikeModel {
  id: string;
  name: string;
  slug: string;
  brand: 'Honda' | 'Yamaha' | 'Suzuki' | 'Universal';
  isPopular?: boolean;
}

export interface ProductSize {
  name: string;
  dimensions?: string;
  inStock: boolean;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  category: string; // slug
  categoryName: string;
  bikeModel?: string;
  bikeModelSlug?: string;
  compatibleModels?: string[];
  images: string[];
  price: number;
  compareAtPrice?: number;
  discountPercent?: number;
  isBestSeller?: boolean;
  isNewArrival?: boolean;
  isFeatured?: boolean;
  shortDescription: string;
  description: string;
  features: string[];
  specifications: Record<string, string>;
  sizes?: ProductSize[];
  stock: number;
  rating: number;
  reviewsCount: number;
  badge?: string;
}

export interface CustomMeasurements {
  productTypeOrModel: string;
  dim1Label: string;
  dim1Value: string;
  dim2Label: string;
  dim2Value: string;
  dim3Label: string;
  dim3Value: string;
  unit: 'inches' | 'cm';
  notes?: string;

  // Compatibility fields
  bikeModel?: string;
  length?: string;
  width?: string;
  height?: string;
}

export interface CartItem {
  id: string; // composite
  productId: string;
  slug: string;
  name: string;
  price: number;
  image: string;
  selectedModel?: string;
  selectedSize?: string;
  selectedColor?: string;
  selectedType?: string;
  selectedCapacity?: string;
  customMeasurements?: CustomMeasurements;
  variantSummary?: string;
  quantity: number;
}

export interface CustomerReview {
  id: string;
  customerName: string;
  city: string;
  rating: number;
  comment: string;
  date: string;
  verifiedPurchase: boolean;
  productName: string;
  productImage?: string;
  language?: 'en' | 'ur' | 'roman';
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

export interface OrderDetails {
  fullName: string;
  phone: string;
  email?: string;
  province: string;
  city: string;
  address: string;
  orderNotes?: string;
  items: CartItem[];
  subtotal: number;
  shipping: number;
  total: number;
  paymentMethod: 'Cash on Delivery';
  orderId?: string;
  createdAt?: string;
}
