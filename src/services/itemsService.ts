import type { ApiResponse, Product } from '../types/product';

const BASE_URL = 'https://dummyjson.com';

async function handleResponse<T>(response: Response): Promise<T> {
    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Something went wrong');
    }
    return response.json();
}

export async function getItems(query = ''): Promise<ApiResponse> {
    const url = query
        ? `${BASE_URL}/products/search?q=${query}`
        : `${BASE_URL}/products`;

    const response = await fetch(url);
    return handleResponse<ApiResponse>(response);
}

export async function getItemById(id: string): Promise<Product> {
    const response = await fetch(`${BASE_URL}/products/${id}`);
    return handleResponse<Product>(response);
}