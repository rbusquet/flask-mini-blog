const init: RequestInit = {
  mode: "cors",
  cache: "no-cache",
  credentials: "same-origin",
  redirect: "follow",
  referrer: "no-referrer",
};

export async function postData<Response, T>(url = "", data: T): Promise<Response> {
  const method = "POST";
  const body = JSON.stringify(data);
  const headers = {
    "Content-Type": "application/json",
  };
  const response = await fetch(url, {
    ...init,
    method,
    body,
    headers,
  });
  if (response.ok) {
    return response.json();
  }
  throw await response.json();
}

export async function getData<T>(url = ""): Promise<T> {
  const method = "GET";
  const response = await fetch(url, {
    ...init,
    method,
  });
  if (response.ok) {
    return response.json();
  }
  throw await response.json();
}
