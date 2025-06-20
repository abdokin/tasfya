/**
 * API client for interacting with the Rails backend
 */

export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL ? (process.env.NEXT_PUBLIC_API_URL + "/api") : 'http://localhost:3000/api';
export const API_TOKEN = process.env.API_TOKEN || '';

export type RequestOptions = {
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE';
  headers?: Record<string, string>;
  body?: any;
  cache?: RequestCache;
  requiresAuth?: boolean;
  params?: Record<string, string | number | boolean | undefined>;
  skipApiToken?: boolean;
};

type ApiErrorType = {
  message: string;
  status: number;
  data?: any;
  name: string;
};

export const createApiError = async (message: string, status: number, data?: any): Promise<ApiErrorType> => ({
  message,
  status,
  data,
  name: 'ApiError',
});

function buildUrlWithParams(endpoint: string, params?: Record<string, string | number | boolean | undefined>) {
  const url = new URL(`${API_BASE_URL}${endpoint.startsWith('/') ? endpoint : `/${endpoint}`}`);
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined) {
        url.searchParams.append(key, String(value));
      }
    });
  }
  return url.toString();
}

async function apiRequest<T>(endpoint: string, options: RequestOptions = {}): Promise<T> {
  const {
    method = 'GET',
    headers = {},
    body,
    cache = "default",
    params = {},
    skipApiToken = false,
  } = options;

  const requestHeaders: Record<string, string> = {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    ...headers,
  };

  // Add API token as query param if available and not explicitly skipped
  const fullParams = { ...params };
  if (API_TOKEN && !skipApiToken) {
    fullParams['api_token'] = API_TOKEN;
  }

  const requestOptions: RequestInit = {
    method,
    headers: requestHeaders,
    cache,
  };

  if (body) {
    requestOptions.body = JSON.stringify(body);
  }
  const url = buildUrlWithParams(endpoint, fullParams);

  try {
    const response = await fetch(url, requestOptions);

    const contentType = response.headers.get('content-type');
    if (contentType?.includes('application/json')) {
      const data = await response.json();

      if (!response.ok) {
        if (response.status === 429) {
          throw await createApiError(
            data.error || 'Rate limit exceeded',
            response.status,
            {
              resetAt: data.reset_at,
              limit: data.limit,
              retryAfter: new Date(data.reset_at).getTime() - Date.now(),
            }
          );
        }
        throw await createApiError(data.error || 'Request failed', response.status, data);
      }

      return data as T;
    } else {
      const text = await response.text();

      if (!response.ok) {
        throw await createApiError(text || 'Request failed', response.status);
      }

      return text as unknown as T;
    }
  } catch (error) {
    if (error && typeof error === 'object' && 'name' in error && error.name === 'ApiError') {
      throw error;
    }

    throw await createApiError(
      error instanceof Error ? error.message : 'An unknown error occurred',
      500
    );
  }
}


// Helper methods for common HTTP methods
export const api = {
  get: async <T>(endpoint: string, options?: Omit<RequestOptions, 'method' | 'body'>) =>
    await apiRequest<T>(endpoint, { ...options, method: 'GET' }),

  post: async <T>(endpoint: string, body: any, options?: Omit<RequestOptions, 'method'>) =>
    await apiRequest<T>(endpoint, { ...options, method: 'POST', body }),

  put: async <T>(endpoint: string, body: any, options?: Omit<RequestOptions, 'method'>) =>
    await apiRequest<T>(endpoint, { ...options, method: 'PUT', body }),

  delete: async <T>(endpoint: string, options?: Omit<RequestOptions, 'method'>) =>
    await apiRequest<T>(endpoint, { ...options, method: 'DELETE' }),
};
