import { getStore } from '@netlify/blobs';

export default async (req: Request) => {
  const url = new URL(req.url);
  const key = url.searchParams.get('key');
  if (key) {
    console.log('request to delete with key', key);

    const store = getStore('stickies-store');
    await store.delete(key);

    return new Response('OK', { status: 201 });
  } else {
    return new Response('Not found', { status: 404 });
  }
};
