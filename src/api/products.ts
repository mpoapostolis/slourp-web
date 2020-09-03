import ky from "ky";
import qs from "query-string";
const URL = `/api/products/client-products`;

export type Product = {
  id: string;
  product_name: string;
  price: number;
  description: string;
  images: string;
  address: string;
  tags?: string[];
  store_id: string;
  store_name: string;
  coords: { x: number; y: string; name: string };
};

export type ProductResponse = { total: number; data: Product[] };

export async function getProducts(
  _key: string,
  _params: Record<string, any>
): Promise<ProductResponse> {
  const { cursor, ...res } = _params;
  const params = qs.stringify({
    ...res,
    offset: 0,
    limit: cursor * 5,
  });
  return ky.get(`${URL}?${params}`).json();
}
