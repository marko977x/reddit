export function* apiFetch(method: string, url: string, data: any) {
  let postParams: RequestInit = {
    body: JSON.stringify(data),
    method: method,
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json, text/plain, */*'
    }
  }
  let getParams: RequestInit = {
    method: method,
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json, text/plain, */*'
    }
  }
  let result;
  if (data) result = yield fetch(url, postParams);
  else result = yield fetch(url, getParams);
  
  if (result.ok) return yield result.json();
  else return result.status.toString();
}