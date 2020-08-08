import ky from "ky";
import qs from "query-string";
const URL = `/api/products/client`;

export type Product = {
  id: string;
  product_name: string;
  price: number;
  description: string;
  images: string;
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
