import ky from "ky";

const URL = `/api/tags`;

export async function getTags(
  _key: string
): Promise<
  {
    tag_name: string;
  }[]
> {
  return ky.get(URL).json();
}
