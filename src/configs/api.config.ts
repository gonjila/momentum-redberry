"use server";

interface IParams {
  url: string;
  method?: RequestInit["method"];
  headers?: RequestInit["headers"];
  body?: object;
  revalidate?: NextFetchRequestConfig["revalidate"];
  tags?: NextFetchRequestConfig["tags"];
  cache?: RequestCache;
}

const apiConfig = async ({
  url,
  method = "GET",
  body = {},
  headers,
  revalidate = 3600,
  tags = [],
  cache,
}: IParams) => {
  try {
    const fetchOptions: RequestInit = {
      method,
      headers: {
        Accept: "aplication/json",
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_AUTH_TOKEN}`,
        ...headers,
      },
    };

    if (method !== "GET") {
      fetchOptions.body = body instanceof FormData ? body : JSON.stringify(body);
    }

    const res = await fetch(process.env.NEXT_PUBLIC_API_URL + url, {
      ...fetchOptions,
      cache: cache,
      next: { revalidate, tags },
    });

    if (!res.ok) {
      const errorResponse = await res.json();
      throw errorResponse?.message || errorResponse || "An error occurred while fetching data.";
    }

    return await res.json();
  } catch (err) {
    throw err;
  }
};

export default apiConfig;
