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
