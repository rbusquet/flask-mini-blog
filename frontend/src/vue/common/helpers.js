import { stringify } from "querystring";

const INIT = {
  mode: "cors",
  cache: "no-cache",
  credentials: "same-origin",
  redirect: "follow",
  referrer: "no-referrer"
};

export async function postData<T>(
  url: string = "",
  data: Object = {}
): Promise<T> {
  const method = "POST";
  const body = JSON.stringify(data);
  const headers = {
    "Content-Type": "application/json"
  };
  const response = await fetch(url, {
    ...INIT,
    method,
    body,
    headers
  });
  if (response.ok) {
    return response.json();
  }
  throw await response.json();
}

export async function getData<T>(
  url: string = "",
  params: Object = {}
): Promise<T> {
  const method = "GET";
  const response = await fetch(`${url}?${stringify(params)}`, {
    ...INIT,
    method
  });
  if (response.ok) {
    return response.json();
  }
  throw await response.json();
}
