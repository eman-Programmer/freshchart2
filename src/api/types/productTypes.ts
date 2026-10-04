export interface Product {
  _id: string;
  title: string;
  slug: string;
  description?: string;
  quantity: number;
  price: number;
  imageCover: string;
  images: string[];
  category: Category;
  subcategory: Subcategory[];
  ratingsQuantity: number;
  ratingsAverage?: number;
  sold: number;
}

export interface Subcategory {
  _id: string;
  name: string;
  slug: string;
  category: string;
}

export interface Category {
  _id: string;
  name: string;
  slug: string;
  image?: string;
  createdAt?: string;
  updatedAt?: string;
}