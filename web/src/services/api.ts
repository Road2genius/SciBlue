const API_URL = "http://localhost:5000/api";

export const api = {
  get: async <T>(url: string, options?: RequestInit): Promise<T> => {
    const response = await fetch(`${API_URL}${url}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        ...(options?.headers || {}),
      },
      ...options,
    });
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || "Something went wrong");
    }
    return data;
  },
  post: async <T, U>(url: string, data: U): Promise<T> => {
    const response = await fetch(`${API_URL}${url}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const responseData = await response.json();
    if (!response.ok) {
      throw (
        responseData.details || responseData.message || "Something went wrong"
      );
    }
    return responseData.data;
  },
  patch: async <T, U>(url: string, data: U): Promise<T> => {
    const response = await fetch(`${API_URL}${url}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const responseData = await response.json();
    if (!response.ok) {
      throw new Error(responseData.message || "Something went wrong");
    }
    return responseData;
  },
  delete: async <T>(url: string): Promise<T> => {
    const response = await fetch(`${API_URL}${url}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      const data = await response.json();
      throw new Error(data.message || "Something went wrong");
    }
    return { message: "Deleted successfully" } as T;
  },
};
