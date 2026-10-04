export async function getAllBrands() {
  try {
    const response = await fetch(
      "https://ecommerce.routemisr.com/api/v1/brands"
    );

    if (!response.ok) {
      throw new Error(response.statusText);
    }

    const data = await response.json();

    return data;
  } catch (error) {
    return error;
  }
}

export async function getSpecificBrand(brandId: string) {
  try {
    const response = await fetch(
      `https://ecommerce.routemisr.com/api/v1/brands/${brandId}`
    );

    if (!response.ok) {
      throw new Error(response.statusText);
    }

    const data = await response.json();

    return data;
  } catch (error) {
    return error;
  }
}