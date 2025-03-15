"use server";

interface IParams {
  url: string;
  method?: RequestInit["method"];
  headers?: RequestInit["headers"];
  body?: object;
  revalidate?: NextFetchRequestConfig["revalidate"];
  tags?: NextFetchRequestConfig["tags"];
}

const apiConfig = async ({
  url,
  method = "GET",
  body = {},
  headers,
  revalidate = 3600,
  tags = [],
}: IParams) => {
  try {
    const fetchOptions: RequestInit = {
      method,
      headers: {
        "Content-Type": "application/json",
        Accept: "aplication/json",
        ...headers,
      },
    };

    if (method !== "GET") {
      fetchOptions.body = JSON.stringify(body);
    }

    const res = await fetch(process.env.NEXT_PUBLIC_API_URL + url, {
      ...fetchOptions,
      next: { revalidate, tags },
    });

    if (!res.ok) {
      const errorResponse = await res.json();
      throw new Error(errorResponse?.message || errorResponse || "An error occurred");
    }

    return await res.json();
  } catch (err) {
    if (err instanceof Error) {
      throw new Error(err.message || String(err));
    } else {
      throw new Error(String(err));
    }
  }
};

export default apiConfig;
