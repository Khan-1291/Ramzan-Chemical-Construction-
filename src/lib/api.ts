export async function readApiJson(response: Response): Promise<any> {
  const contentType = response.headers.get('content-type') || '';
  if (!contentType.toLowerCase().includes('application/json')) {
    const detail = await response.text().catch(() => '');
    throw new Error(`The server returned an invalid API response${detail ? ` (${response.status})` : ''}.`);
  }
  return response.json();
}
