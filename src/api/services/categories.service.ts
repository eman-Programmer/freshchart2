const BASE_URL = "https://ecommerce.routemisr.com/api/v1";

export async function getCategories() {
  try {
    const response = await fetch(`${BASE_URL}/categories`);

    if (!response.ok) {
      throw new Error(response.statusText);
    }

    const data = await response.json();

    return data;
  } catch (error) {
    return error;
  }
}

export async function getSpecificCategory(categoryId: string) {
  try {
    const response = await fetch(`${BASE_URL}/categories/${categoryId}`);

    if (!response.ok) {
      throw new Error(response.statusText);
    }

    const data = await response.json();

    return data;
  } catch (error) {
    return error;
  }
}

export async function getSubcategoriesOnCategory(categoryId: string) {
  try {
    const response = await fetch(
      `${BASE_URL}/categories/${categoryId}/subcategories`
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

export async function getSubCategories() {
  try {
    const response = await fetch(`${BASE_URL}/subcategories`);

    if (!response.ok) {
      throw new Error(response.statusText);
    }

    const data = await response.json();

    return data;
  } catch (error) {
    return error;
  }
}

export async function getSpecificSubCategory(subcategoryId: string) {
  try {
    const response = await fetch(
      `${BASE_URL}/subcategories/${subcategoryId}`
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