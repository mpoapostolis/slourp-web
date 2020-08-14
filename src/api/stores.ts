import ky from "ky";
import qs from "query-string";
const URL = `/api/stores/client-stores`;

export type StoreType = {
  id: string;
  name: string;
};

export type StoreReponse = { total: number; data: StoreType[] };

export async function getStores(
  _key: string,
  _params: Record<string, any>
): Promise<StoreReponse> {
  const params = qs.stringify({
    ..._params,
    offset: 0,
    limit: 5,
  });
  return ky.get(`${URL}?${params}`).json();
}
