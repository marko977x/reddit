export function* apiFetch(method: string, url: string, data: any) {
  let params: RequestInit = {
    body: JSON.stringify(data),
    method: method,
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json, text/plain, */*'
    }
  }
  let result = yield fetch(url, params);
  if (result.ok) return result.json();
  else return result.status.toString();
}