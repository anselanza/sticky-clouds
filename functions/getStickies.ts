import { getStore } from '@netlify/blobs';
import type { Context } from '@netlify/edge-functions';

export default async (request: Request, context: Context) => {
  console.log('Netlify context:', JSON.stringify(context));
  const store = getStore('stickies-store');
  const list = await store.list();
  console.log('fetched store list:', list);
  const { blobs } = list;

  const stickies = await Promise.all(
    blobs.map(async ({ key }) => JSON.parse(await store.get(key))),
  );

  return new Response(JSON.stringify(stickies));
};
