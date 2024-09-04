interface ApiResponse<T> {
  data: T;
  status: number;
}

interface ApiError extends Error {
  status?: number;
}

type Endpoint = `/${string}`;

export interface ApiServiceType {
  get<T>(endpoint: Endpoint, options?: RequestInit): Promise<ApiResponse<T>>;
  post<T, D>(endpoint: Endpoint, data: D, options?: RequestInit): Promise<ApiResponse<T>>;
  put<T, D>(endpoint: Endpoint, data: D, options?: RequestInit): Promise<ApiResponse<T>>;
  delete<T>(endpoint: Endpoint, options?: RequestInit): Promise<ApiResponse<T>>;
}

class ApiService implements ApiServiceType {
  constructor(private readonly rootEndpoint: string) {}

  async handleRequest <T>(url: string, options: RequestInit = {}): Promise<ApiResponse<T>> {
    const response = await fetch(url, options);

    if (!response.ok) {
      const error: ApiError = new Error("HTTP error");
      error.status = response.status;
      throw error;
    }
    const data: T = await response.json();
    return { data, status: response.status };
  };

  get<T>(endpoint: Endpoint, options?: RequestInit) {
    return this.handleRequest<T>(`${this.rootEndpoint}${endpoint}`, { ...options, method: "GET" })
  }

  post<T, D>(endpoint: Endpoint, data: D, options: RequestInit = {}) {
    return this.handleRequest<T>(`${this.rootEndpoint}${endpoint}`, {
      ...options,
      method: "POST",
      headers: { "Content-Type": "application/json", ...options.headers },
      body: JSON.stringify(data),
    })
  }

  put<T, D>(endpoint: Endpoint, data: D, options: RequestInit = {}) {
    return this.handleRequest<T>(`${this.rootEndpoint}${endpoint}`, {
      ...options,
      method: "PUT",
      headers: { "Content-Type": "application/json", ...options.headers },
      body: JSON.stringify(data),
    })
  }

  delete<T>(endpoint: Endpoint, options: RequestInit = {}) {
    return this.handleRequest<T>(`${this.rootEndpoint}${endpoint}`, { ...options, method: "DELETE" })
  }
}

export default ApiService;
