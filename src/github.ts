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

  const starMinimumList = [
    2, 5, 10, 50, 100, 250, 500, 1000, 5000, 10000, 20000, 30000, 40000, 50000,
    60000, 70000, 80000, 100000, 150000, 200000,
  ];
  for (const stars of starMinimumList) {
    const result = await getGithubCount(stars);
    data.push([stars, result]);
  }
  return data;
};