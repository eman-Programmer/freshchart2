import { Product } from "@/api/types/productTypes";

export async function getAllProducts(): Promise<Product[]> {
  try {

    const response = await fetch(
      "https://ecommerce.routemisr.com/api/v1/products"
    );

    if (!response.ok) {
      throw new Error("Failed to fetch products");
    }

    const payload = await response.json();

    return payload.data;

  } catch (error) {

    console.log(error);
    throw error;

  }
}


export async function getSingleProduct(prodId: string): Promise<Product> {
  try {

    const response = await fetch(
      `https://ecommerce.routemisr.com/api/v1/products/${prodId}`
    );

    if (!response.ok) {
      throw new Error("Failed to fetch product");
    }

    const payload = await response.json();

    return payload.data;

  } catch (error) {

    console.log(error);
    throw error;

  }
}


export async function getShopCate() {
  try {

    const response = await fetch(
      `https://ecommerce.routemisr.com/api/v1/categories`
    );

    if (!response.ok) {
      throw new Error("Failed to fetch product");
    }

    const payload = await response.json();

    return payload.data;

  } catch (error) {

    console.log(error);
    throw error;

  }
}


export async function getProductsByBrand(brandId: string): Promise<Product[]> {
  try {
    const response = await fetch(
      `https://ecommerce.routemisr.com/api/v1/products?brand=${brandId}`
    );

    if (!response.ok) {
      throw new Error("Failed to fetch products by brand");
    }

    const payload = await response.json();

    return payload.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

