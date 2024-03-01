import { Loader } from "./Loader";
import { retry, sleep } from "./utils";

const url = (starMinimum: number) =>
  `https://api.github.com/search/repositories?q=stars:%3E${starMinimum}&per_page=1`;

export const CACHE = "cache";

export const getGithubCount = async (stars: number): Promise<number> => {
  const cacheStr = localStorage.getItem(CACHE);
  const cache = cacheStr === null ? {} : JSON.parse(cacheStr);

  if (cache[stars] !== undefined) {
    return cache[stars];
  }

  const response = await fetch(url(stars));

  if (response.status === 403) {
    const headers = response.headers.keys();
    console.log("headers: ", [...headers]);
    if (response.headers.get("x-ratelimit-remaining") === "0") {
      const timestampStr = response.headers.get("x-ratelimit-reset");
      if (timestampStr !== null) {
        const timestamp = 1000 * +timestampStr;
        const duration = timestamp - Date.now();
        console.log("waiting the reset for duration: ", duration);
        await sleep(duration + 1000);
        return await getGithubCount(stars);
      }
    }
  }
  if (response.status >= 400) {
    throw new Error(`Status error: ${response.status}`);
  }
  const json = await response.json();
  const result = json.total_count;
  cache[stars] = result;
  localStorage.setItem(CACHE, JSON.stringify(cache));

  return result;
};

export const getData = async () => {
  Loader.init();
  const data: [number, number][] = [];

  const starMinimumList = [
    2, 5, 10, 50, 100, 250, 500, 1000, 5000, 10000, 20000, 30000, 40000, 50000,
    60000, 70000, 80000, 100000, 150000, 200000,
  ];
  for (let i = 0; i < starMinimumList.length; i++) {
    Loader.progress((i + 1) / starMinimumList.length);
    const stars = starMinimumList[i];
    const result = await retry(async () => {
      return await getGithubCount(stars);
    });
    data.push([stars, result]);
  }
  Loader.finalize();
  return data;
};

export const removeCache = () => {
  localStorage.removeItem(CACHE);
};
