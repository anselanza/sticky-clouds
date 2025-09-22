import { getStore } from '@netlify/blobs';

export default async (request: Request) => {
  const newSticky = await request.json();
  const key = newSticky['id'];

  const store = getStore('stickies-store');
  console.log(`Saving to key ${key}: `, JSON.stringify(newSticky), '...');
  await store.setJSON(key, newSticky);

  return new Response(JSON.stringify(newSticky), { status: 201 });
};
