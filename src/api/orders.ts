import api from "../ky";

const URL = `/api/order`;

export type PayResponse = { order_id: string };
export type StatusResponse = { status: "complete" | "pending" | "canceled" };

export async function pay(obj: {
  id: string;
  myList: { product_id: string; paid_with: "cash" | "loyalty_points" }[];
}): Promise<PayResponse> {
  const { id, myList } = obj;
  return api.post(`${URL}/${id}/place-order`, { json: myList }).json();
}

export function getOrderStatus(
  _key: string,
  id?: string
): Promise<StatusResponse> {
  return api.get(`${URL}/${id}/get-status`).json();
}
