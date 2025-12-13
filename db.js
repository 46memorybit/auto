const DB_NAME = 'RandomQueryPWA';
const STORE_NAME = 'settings';
const DB_VERSION = 1;

let db;

async function openDB() {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onupgradeneeded = (event) => {
      db = event.target.result;
      db.createObjectStore(STORE_NAME);
    };

    request.onsuccess = (event) => {
      db = event.target.result;
      resolve(db);
    };

    request.onerror = (event) => reject(event.target.error);
  });
}

async function getStore(mode = 'readonly') {
  if (!db) await openDB();
  return db.transaction(STORE_NAME, mode).objectStore(STORE_NAME);
}

const db = {
  async get(key) {
    const store = await getStore();
    return new Promise((resolve) => {
      const req = store.get(key);
      req.onsuccess = () => resolve(req.result);
      req.onerror = () => resolve(undefined);
    });
  },

  async set(key, value) {
    const store = await getStore('readwrite');
    store.put(value, key);
  },

  async getAll() {
    const memo = await db.get('memo');
    const baseUrl = await db.get('baseUrl');
    const autoRedirect = await db.get('autoRedirect');
    return { memo, baseUrl, autoRedirect };
  }
};
