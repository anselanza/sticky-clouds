import { getStore } from '@netlify/blobs';

export default async () => {
  const store = getStore('stickies-store');
  const { blobs } = await store.list();
  console.log('fetched store list:', blobs);

  const stickies = await Promise.all(
    blobs.map(async ({ key }) => JSON.parse(await store.get(key))),
  );

  return new Response(JSON.stringify(stickies));
};
