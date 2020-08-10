import ky from "ky";
import qs from "query-string";
const URL = `/api/stores/client`;

export type Product = {
  id: string;
  product_name: string;
  price: number;
  description: string;
  images: string;
};

export type ProductResponse = { total: number; data: Product[] };

export async function getStores(
  _key: string,
  _params: Record<string, any>
): Promise<ProductResponse> {
  const params = qs.stringify({
    ..._params,
    offset: 0,
    limit: 5,
  });
  return ky.get(`${URL}?${params}`).json();
}
