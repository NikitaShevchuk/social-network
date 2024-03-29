import React, { useCallback, useEffect } from 'react';

const checkExceptions = (e: MouseEvent, exceptions: string[] | undefined): boolean => {
    const target = e.target as HTMLElement;
    if (!target.className?.includes || !exceptions) return false;
    return exceptions.reduce(
        (_, currentException) => target.className.includes(currentException),
        false
    );
};

const outsideClickHandler =
    ({ callback, ref, closeOnElementsClick, exceptions }: Arguments) =>
    (e: MouseEvent): void => {
        const shouldClose = !checkExceptions(e, exceptions) && !ref?.current?.contains(e.target);
        const exception = checkExceptions(e, closeOnElementsClick);
        if (shouldClose || exception) callback(false);
    };

interface Arguments {
    ref: React.MutableRefObject<any> | null;
    callback: (toggle: boolean) => void;
    // elements classNames that should trigger a listener callback
    closeOnElementsClick?: string[];
    // elements classNames that should NOT trigger a listener callback
    exceptions?: string[];
}
export const useOnClickOutside = (args: Arguments) => {
    const listener = useCallback(outsideClickHandler(args), []);
    useEffect(() => {
        document.addEventListener('click', listener);
        return () => {
            document.removeEventListener('click', listener);
        };
    }, []);
};

export default useOnClickOutside;
