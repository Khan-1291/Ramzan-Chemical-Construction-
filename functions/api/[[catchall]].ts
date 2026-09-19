import worker from '../../worker/index';

// Cloudflare Pages Functions adapter
export async function onRequest(context: any): Promise<Response> {
  const { request, env, waitUntil } = context;
  const ctx = {
    waitUntil(promise: Promise<any>) {
      if (waitUntil) waitUntil(promise);
    },
    passThroughOnException() {}
  };

  return worker.fetch(request, env, ctx as any);
}
