type FetchOptions = RequestInit & {
  params?: Record<string, string | number>;
};

const BASE_URL = "http://localhost:3000/api/v1";
export async function fetcher<T>(
  urlPart: string,
  options: FetchOptions = {}
): Promise<T> {
  const { params, headers, ...rest } = options;

  const url = `${BASE_URL}/${urlPart}`
  const queryString = params
    ? "?" +
      new URLSearchParams(
        Object.entries(params).reduce((acc, [k, v]) => {
          acc[k] = String(v);
          return acc;
        }, {} as Record<string, string>)
      ).toString()
    : "";

  const res = await fetch(url + queryString, {
    headers: {
      "Content-Type": "application/json",
      ...headers,
    },
    ...rest,
  });

  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(errorText || "Request failed");
  }

  return res.json();
}
