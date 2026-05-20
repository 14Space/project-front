export const API_BASE_URL = 'https://localhost:7157/api';

interface RequestOptions extends RequestInit {
  data?: any;
}

export const api = {
  async request(endpoint: string, options: RequestOptions = {}) {
    const url = `${API_BASE_URL}${endpoint}`;
    
    const headers = new Headers(options.headers || {});
    
    // Auto-add JSON content type if sending data
    if (options.data && !headers.has('Content-Type')) {
      headers.set('Content-Type', 'application/json');
    }
    
    // Auto-add Authorization header if token exists
    const token = localStorage.getItem('token');
    if (token) {
      headers.set('Authorization', `Bearer ${token}`);
    }

    const config: RequestInit = {
      ...options,
      headers,
    };

    if (options.data) {
      config.body = JSON.stringify(options.data);
    }

    const response = await fetch(url, config);

    if (!response.ok) {
      if (response.status === 401) {
        console.warn('Unauthorized request');
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        window.location.href = '/';
      }
      let errorMessage = `HTTP error! status: ${response.status}`;
      try {
        const contentType = response.headers.get('content-type');
        if (contentType && contentType.includes('application/json')) {
          const errObj = await response.json();
          errorMessage = errObj.message || errObj.title || JSON.stringify(errObj);
        } else {
          const errText = await response.text();
          if (errText) errorMessage = errText;
        }
      } catch (e) {
        // Ignore parsing errors
      }
      throw new Error(errorMessage);
    }

    // Check if there is content to parse
    const contentType = response.headers.get('content-type');
    if (contentType && contentType.includes('application/json')) {
      return response.json();
    }
    
    return response.text();
  },

  get(endpoint: string, options?: RequestOptions) {
    return this.request(endpoint, { ...options, method: 'GET' });
  },

  post(endpoint: string, data?: any, options?: RequestOptions) {
    return this.request(endpoint, { ...options, method: 'POST', data });
  },

  put(endpoint: string, data?: any, options?: RequestOptions) {
    return this.request(endpoint, { ...options, method: 'PUT', data });
  },

  delete(endpoint: string, options?: RequestOptions) {
    return this.request(endpoint, { ...options, method: 'DELETE' });
  },

  async upload(endpoint: string, formData: FormData, options?: RequestOptions) {
    const url = `${API_BASE_URL}${endpoint}`;
    
    const headers = new Headers(options?.headers || {});
    
    const token = localStorage.getItem('token');
    if (token) {
      headers.set('Authorization', `Bearer ${token}`);
    }

    const config: RequestInit = {
      ...options,
      method: 'POST',
      headers,
      body: formData, // fetch will automatically set multipart/form-data with boundary
    };

    const response = await fetch(url, config);

    if (!response.ok) {
      if (response.status === 401) {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        window.location.href = '/';
      }
      let errorMessage = `HTTP error! status: ${response.status}`;
      try {
        const contentType = response.headers.get('content-type');
        if (contentType && contentType.includes('application/json')) {
          const errObj = await response.json();
          errorMessage = errObj.message || errObj.title || JSON.stringify(errObj);
        } else {
          const errText = await response.text();
          if (errText) errorMessage = errText;
        }
      } catch (e) {
        // Ignore parsing errors
      }
      throw new Error(errorMessage);
    }

    const contentType = response.headers.get('content-type');
    if (contentType && contentType.includes('application/json')) {
      return response.json();
    }
    
    return response.text();
  }
};
