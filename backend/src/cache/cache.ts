type CacheEntry<T> = {
  value: T;
  expiresAt: number;
};

class InMemoryCache<T> {
  private store = new Map<string, CacheEntry<T>>();
  private maxSize: number;

  constructor(maxSize = 500) {
    this.maxSize = maxSize;
  }

  get(key: string): T | null {
    const entry = this.store.get(key);

    if (!entry) return null;

    // expire
    if (Date.now() > entry.expiresAt) {
      this.store.delete(key);
      return null;
    }

    // LRU: refresh position
    this.store.delete(key);
    this.store.set(key, entry);

    return entry.value;
  }

  set(key: string, value: T, ttlMs: number) {
    // evict if needed
    if (this.store.size >= this.maxSize) {
      const oldestKey = this.store.keys().next().value;
      if(oldestKey!=undefined){
        this.store.delete(oldestKey);
      }
    }

    this.store.set(key, {
      value,
      expiresAt: Date.now() + ttlMs
    });
  }

  has(key: string): boolean {
    return this.get(key) !== null;
  }

  delete(key: string) {
    this.store.delete(key);
  }

  clear() {
    this.store.clear();
  }
}

export const aiCache = new InMemoryCache<any>(1000);
export const summaryCache = new InMemoryCache<any>(500);
