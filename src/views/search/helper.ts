import { reactive } from 'vue';

const KEY = 'RECENT-SEARCH';
export const recentSearch: string[] = reactive([]);

const localStorageSearch = JSON.parse(localStorage.getItem(KEY) || '[]') as string[];
localStorageSearch.forEach((k) => recentSearch.push(k));

export const recentSearchFn = {
  size: 20,
  add(keyword: string) {
    if (keyword.length === 0) { return }
    const index = recentSearch.findIndex((ele) => ele === keyword);
    if (index > -1) {
      recentSearch.splice(index, 1);
    }
    recentSearch.unshift(keyword);
    if (recentSearch.length > this.size) {
      recentSearch.pop();
    }
    localStorage.setItem(KEY, JSON.stringify(recentSearch));
  },
  clear() {
    recentSearch.splice(0, recentSearch.length);
    localStorage.setItem(KEY, '[]');
  },
}
