import ky from "ky";
import { loadKey } from "../provider/reducer";

const api = ky.extend({
  hooks: {
    beforeRequest: [
      async (request) => {
        const auth = loadKey();
        if (!auth) return;
        return request.headers.set("Authorization", `Bearer ${auth.token}`);
      },
    ],
  },
});

export default api;
