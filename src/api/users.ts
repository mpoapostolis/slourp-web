import ky from "ky";

const URL = `/api/users`;

export async function login(data: Record<string, any>) {
  return ky
    .post(`${URL}/login`, {
      json: data,
    })
    .json();
}

export async function loginWithFacebook(data: Record<string, any>) {
  return ky
    .post(`${URL}/facebook`, {
      json: data,
    })
    .json();
}

export async function register(data: Record<string, any>) {
  return ky
    .post(`${URL}/register`, {
      json: data,
    })
    .json();
}
