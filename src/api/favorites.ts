import api from "../ky";
const URL = `/api/users/favorites`;

export type Favorite = {
  description: string;
  images: string;
  price: number;
  product_id: string;
  product_name: string;
  coords: { x: number; y: string; name: string };
  id: string;
  address: string;
  store_id: string;
  store_name: string;
};

export async function getFavorites(_key: string): Promise<Favorite[]> {
  return api.get(URL).json();
}

export async function addFavorite(product_id: string): Promise<Favorite[]> {
  return api.post(`${URL}/${product_id}`).json();
}

export async function deleteFavorite(product_id: string): Promise<Favorite[]> {
  return api.delete(`${URL}/${product_id}`).json();
}
