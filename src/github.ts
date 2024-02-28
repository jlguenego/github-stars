const url = (starMinimum: number) =>
  `https://api.github.com/search/repositories?q=stars:%3E${starMinimum}&per_page=1`;

export const sleep = (delay: number) => {
  return new Promise((resolve) => setTimeout(resolve, delay));
};

const CACHE = "cache";

export const getGithubCount = async (stars: number) => {
  const cacheStr = localStorage.getItem(CACHE);
  const cache = cacheStr === null ? {} : JSON.parse(cacheStr);

  if (cache[stars] !== undefined) {
    return cache[stars];
  }

  await sleep(1000);
  const response = await fetch(url(stars));
  const json = await response.json();
  const result = json.total_count;
  cache[stars] = result;
  localStorage.setItem(CACHE, JSON.stringify(cache));

  return result;
};

export const getData = async () => {
  const data = [];
  const starMinimumList = new Array(30)
    .fill(0)
    .map((n, i) => Math.floor(100000 / (i + 1) ** 2));
  for (const stars of starMinimumList) {
    const result = await getGithubCount(stars);
    data.push([stars, result]);
  }
  return data;
};
