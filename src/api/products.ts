import ky from "ky";

const URL = `/api/products/client`;

export type Product = {
  id: string;
  product_name: string;
  price: number;
  description: string;
  images: string;
};

export async function getProducts(
  _key: string,
  params: Record<string, any>
): Promise<{ total: number; data: Product[] }> {
  return ky.get(URL).json();
}
