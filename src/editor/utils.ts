import { AutoCompletion } from "./type";

export const findCompletions = (
  keyword: string,
  path: string[],
  completions: AutoCompletion[]
) => {
  if (!path.length) {
    if (!keyword.trim()) {
      return completions;
    } else {
      return completions.filter(({ label }) => label.startsWith(keyword));
    }
  } else {
    const childCompletions = findTargetLevel(path, completions);
    if (!keyword.trim()) {
      return childCompletions;
    } else {
      return childCompletions.filter(({ label }) => label.startsWith(keyword));
    }
  }
};

const findTargetLevel = (path: string[], completions: AutoCompletion[]) => {
  const keyword = path.shift();
  const currentLevelCompletion = completions.find(
    ({ label }) => label === keyword
  );
  if (!!path.length && currentLevelCompletion) {
    return findTargetLevel(path, currentLevelCompletion.properties);
  }
  return currentLevelCompletion?.properties || [];
};

export function debounce<T>(fn: (params: T) => void, delay: number) {
  let timer = null;
  return function () {
    let context = this;
    let arg = arguments;
    timer && clearTimeout(timer);
    timer = setTimeout(function () {
      fn.apply(context, arg);
    }, delay);
  };
}
