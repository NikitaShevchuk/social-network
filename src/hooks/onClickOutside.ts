import React, {useCallback, useEffect} from "react";

const checkExceptions = (e: MouseEvent, exceptions: string[] | undefined): boolean => {
    const target = e.target as HTMLElement;
    if (!target.className?.includes || !exceptions) return false
    return exceptions.reduce( ( _, currentException) => {
        return target.className.includes(currentException)
    }, false)
}

const outsideClickHandler = (
    { callback, ref, closeOnElementsClick, exceptions }: Arguments
) => (e: MouseEvent): void => {
    const shouldClose = (
        !ref?.current?.contains(e.target) ||
        !checkExceptions(e, exceptions) ||
        checkExceptions(e, closeOnElementsClick)
    )
    if (shouldClose) callback(false)
}


interface Arguments {
    ref: React.MutableRefObject<any> | null,
    callback: (toggle: boolean) => void,
    // elements classNames that should trigger a listener callback
    closeOnElementsClick?: string[], 
    // elements classNames that should NOT trigger a listener callback
    exceptions?: string[] 
}
export const useOnClickOutside = (args: Arguments) => {
    const listener = useCallback( outsideClickHandler(args), [] )
    useEffect(() => {
        document.addEventListener('click', listener)
        return () => {
            document.removeEventListener('click', listener)
        }
    }, [])
}


export default useOnClickOutside;