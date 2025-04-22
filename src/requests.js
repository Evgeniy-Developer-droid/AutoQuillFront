// requests.js

const API_BASE_URL = 'http://104.248.194.218';
const accessToken = () => localStorage.getItem('access_token');
const refreshToken = () => localStorage.getItem('refresh_token');

async function refreshAccessToken() {
  try {
    const response = await fetch(`${API_BASE_URL}/api/v1/auth/refresh`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ refresh_token: refreshToken() }),
    });

    if (!response.ok) {
      window.location.href = '/login';
    }

    const data = await response.json();

    localStorage.setItem('access_token', data.access_token);
    localStorage.setItem('refresh_token', data.refresh_token);

    return accessToken;
  } catch (error) {
    console.error('Token refresh error:', error);
    throw error;
  }
}

async function apiRequest({ url, method = 'GET', headers = {}, params = {}, body = null, retry = true }) {
  let fullUrl = url.startsWith('http') ? url : `${API_BASE_URL}${url}`;

    const queryString = new URLSearchParams(params).toString();
    fullUrl = queryString ? `${fullUrl}?${queryString}` : fullUrl;

  const finalHeaders = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${accessToken()}`,
    ...headers,
  };

  const options = {
    method,
    headers: finalHeaders,
    body: body ? JSON.stringify(body) : null,
  };

  let response = await fetch(fullUrl, options);

  if (response.status === 401 && retry) {
    // Try refreshing token and repeat request
    try {
      await refreshAccessToken();

      const retryHeaders = {
        ...finalHeaders,
        Authorization: `Bearer ${accessToken()}`,
      };

      response = await fetch(fullUrl, {
        ...options,
        headers: retryHeaders,
      });
    } catch (error) {
      console.error('Failed to retry with refreshed token');
      throw error;
    }
  }

  const responseData = await response.json();
  return {
    status: response.status,
    data: responseData,
  };
}

export default apiRequest;
