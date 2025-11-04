async function fetchWithTimeout(resource, options = {}) {
  const { timeout = 10000 } = options;
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeout);
  try {
    const response = await fetch(resource, {
      ...options,
      signal: controller.signal,
    });
    return response;
  } finally {
    clearTimeout(id);
  }
}

export class VisuoLinkClient {
  constructor(baseUrl = "https://visuolinkapi.onrender.com", timeout = 10000) {
    this.baseUrl = baseUrl.replace(/\/+$/, "");
    this.timeout = timeout;
  }

  async _request(method, endpoint, body = null) {
    const url = `${this.baseUrl}${endpoint}`;
    const options = {
      method,
      headers: { "Content-Type": "application/json" },
    };
    if (body) options.body = JSON.stringify(body);
    
    try {
      const response = await fetchWithTimeout(url, { ...options, timeout: this.timeout });
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      return await response.json();
    } catch (error) {
      console.error(`[Error] Request to ${url} failed:`, error);
      return null;
    }
  }

  async getUsernames() {
    return await this._request("GET", "/users");
  }

  async doLogin(username, password) {
    return await this._request("POST", "/users/auth/login", { username, password });
  }

  async createUser(username, name, email, phone, password) {
    return await this._request("POST", "/users/create", {
      username,
      name,
      email,
      phone,
      password,
    });
  }
}

export function startApiMonitor(url, interval = 8000, maxRetries = 8) {
  let retries = 0;
  let apiUp = false;

  const checkApi = async () => {
    try {
      const controller = new AbortController();
      const id = setTimeout(() => controller.abort(), 8000);
      const response = await fetch(url, { signal: controller.signal });
      clearTimeout(id);

      if (response.ok) {
        apiUp = true;
        console.log("✅ API is up");
        clearInterval(intervalId);
      } else {
        console.warn(`⚠️ API responded with ${response.status}`);
      }
    } catch (error) {
      retries++;
      console.error(`❌ API Error (${retries}/${maxRetries}):`, error);
    }

    if (retries >= maxRetries) {
      clearInterval(intervalId);
      if (!apiUp) console.error(`❌ Could not connect to API after ${maxRetries} attempts.`);
    }
  };

  const intervalId = setInterval(checkApi, interval);
  checkApi();
  return () => clearInterval(intervalId);
}
