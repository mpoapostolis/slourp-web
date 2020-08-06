import { LOGIN, LOGOUT, SET_POS } from "./names";

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
  _id?: string;
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

    case LOGIN:
      setKey(action.payload);
      return { ...state, ...action.payload };
    case LOGOUT:
      clearKey("slourp_client");
      return undefined;
    default:
      throw new Error();
  }
}
export default reducer;
