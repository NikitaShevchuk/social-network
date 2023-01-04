export const timeout = (ms: number) =>
    new Promise((resolve) => {
        setTimeout(resolve, ms);
    });
export const sleep = async (fn: (...args: any) => any, ms: number, ...args: any) => {
    await timeout(ms);
    return fn(...args);
};
