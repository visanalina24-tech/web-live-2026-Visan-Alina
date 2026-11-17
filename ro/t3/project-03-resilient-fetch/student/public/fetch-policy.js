export async function singleAttempt(fetchImpl, url, signal) {
  let response;

  try {
    response = await fetchImpl(url, { signal });
  } catch (cause) {
    const error = new Error(cause.message, { cause });
    error.retryable = true;
    throw error;
  }

  if (!response.ok) {
    const error = new Error(`request failed: ${response.status}`);
    error.retryable = response.status >= 500;
    throw error;
  }

  return response.json();
}

export async function fetchWithPolicy(url, options = {}) {
  const {
    fetchImpl = fetch,
    timeoutMs = 1000,
    retries = 2,
    sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms)),
    createController = () => new AbortController(),
    setTimer = (fn, ms) => setTimeout(fn, ms),
    clearTimer = (id) => clearTimeout(id),
  } = options;

  const maxAttempts = retries + 1;
  let lastError;

  for (let attempt = 1; attempt <= maxAttempts; attempt += 1) {
    if (attempt > 1) {
      // inainte de reincercarea N: 50 * 2 ** (N - 1)
      await sleep(50 * 2 ** (attempt - 2));
    }

    
    const controller = createController();
    const timer = setTimer(() => controller.abort(), timeoutMs);

    try {
      return await singleAttempt(fetchImpl, url, controller.signal);
    } catch (error) {
      if (error.retryable === false) throw error; 
      if (error.retryable !== true) throw error;  
      lastError = error;
    } finally {
      clearTimer(timer); 
    }
  }

  throw new Error(
    `request failed after ${maxAttempts} attempts: ${lastError.message}`,
    { cause: lastError }
  );
}