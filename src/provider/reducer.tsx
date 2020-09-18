import {
  LOGIN,
  LOGOUT,
  SET_POS,
  ADD_TO_CART,
  CLEAR_CART,
  REMOVE_FROM_CART,
  UPDATE_LOYALTY_POINTS,
} from "./names";
import { Product } from "../api/products";
import JwtDecode from "jwt-decode";

export const setKey = (payload: Record<string, any>) =>
  localStorage.setItem("slourp_client", JSON.stringify(payload));

export const loadKey = () => {
  const k = localStorage.getItem("slourp_client");
  return k ? JSON.parse(k) : undefined;
};

const clearKey = (k: string) => {
  localStorage.removeItem(k);
};

export type Store = {
  id?: string;
  avatar?: string;
  user_name: string;
  store_id?: string;
  email?: string;
  first_name?: string;
  last_name?: string;
  age?: number;
  loyalty_points?: number;
  token?: string;
  refresh_token?: string;
  permissions?: string[];
  cart: Product[];
  expToken?: number;
  expRToken?: number;

  coords: {
    latitude: number;
    longitude: number;
  };
};

type Action = {
  type: string;
  payload?: any;
};

export const initState: Store = loadKey() || {};

function reducer(state: Store, action: Action) {
  switch (action.type) {
    case SET_POS:
      return { ...state, coords: action.payload };
    case ADD_TO_CART:
      const { cart = [] } = state;
      return { ...state, cart: [...cart, action.payload] };

    case REMOVE_FROM_CART:
      return {
        ...state,
        cart: state.cart.filter((o) => o.id !== action.payload),
      };

    case UPDATE_LOYALTY_POINTS:
      return { ...state, loyalty_points: action.payload.loyalty_points };

    case CLEAR_CART:
      return { ...state, cart: [] };

    case LOGIN:
      const { exp: expToken } = JwtDecode(action?.payload?.token);
      const { exp: expRToken } = JwtDecode(action?.payload.refresh_token);
      setKey({
        ...action.payload,
        expToken: expToken * 1000,
        expRToken: expRToken * 1000,
      });
      return {
        ...state,
        ...action.payload,
        expToken: expToken * 1000,
        expRToken: expRToken * 1000,
      };
    case LOGOUT:
      clearKey("slourp_client");
      return undefined;
    default:
      throw new Error();
  }
}
export default reducer;
