import throttle from "lodash/throttle";

export const createThrottledFunction = (fn) => {
  return throttle(fn, 1000, { leading: true, trailing: false });
};
