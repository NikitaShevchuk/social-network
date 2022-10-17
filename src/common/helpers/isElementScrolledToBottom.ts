export const isElementScrolledToBottom = (target: HTMLDivElement | HTMLUListElement | null): boolean => {
    if (!target) return false
    return target.scrollHeight - target.offsetHeight === target.scrollTop
}