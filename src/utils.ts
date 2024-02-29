export const querySelector = (cssSelector: string): HTMLElement => {
  const result = document.querySelector(cssSelector);
  if (result === null) {
    throw new Error(`Cannot find selector ${cssSelector}`);
  }
  return result as HTMLElement;
};

export const sleep = (delay: number) => {
  return new Promise((resolve) => setTimeout(resolve, delay));
};

export const retry = async <T>(callback: () => Promise<T>): Promise<T> => {
  let duration = 1000;
  let redo = true;
  while (redo) {
    redo = false;
    try {
      return await callback();
    } catch (err) {
      console.log("err: ", err);
      redo = true;
      duration *= 1.5;
      console.log(`retry in ${duration}ms...`);
      await sleep(duration);
    }
  }
  throw new Error("unexpected");
};
