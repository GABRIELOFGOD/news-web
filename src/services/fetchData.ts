import { getData, postData } from "@/models/fetchTypes";
import { BASE_URL } from "@/utils/constants";

class FetchData {
  private static instance: FetchData;

  private constructor() {}

  public static getInstance(): FetchData {
    if (!FetchData.instance) {
      FetchData.instance = new FetchData();
    }
    return FetchData.instance;
  }

  private async request(path: string, options: RequestInit) {
    const response = await fetch(`${BASE_URL}/${path}`, options);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const result = await response.json();
    if (result.success !== true) {
      throw new Error(result.message);
    }
    return result;
  }

  public async post(prop: postData) {
    const headers: HeadersInit = {
      "Content-Type": "application/json",
    };
    if (prop.withHeaders) {
      headers["Authorization"] = `Bearer ${localStorage.getItem("token")}`;
    }
    return this.request(prop.path, {
      method: "POST",
      headers,
      body: JSON.stringify(prop.data),
    });
  }

  public async get(prop: getData) {
    const headers: HeadersInit = {
      "Content-Type": "application/json",
    };
    if (prop.withHeaders) {
      headers["Authorization"] = `Bearer ${localStorage.getItem("token")}`;
    }
    return this.request(prop.path, {
      method: "GET",
      headers,
    });
  }
}

export default FetchData.getInstance();