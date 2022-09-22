import React, {useEffect} from "react";

export const useOnClickOutside = (
    ref: React.MutableRefObject<any> | null,
    callback: (toggle: boolean) => void,
    stateToChange: boolean
) => {
    const outsideClickHandler = (e: MouseEvent): void => {
        const target = e.target as HTMLElement;
        const shouldClose = stateToChange && ref?.current && !ref?.current.contains(target)
        if (shouldClose) callback(false)
    }
    useEffect(() => {
        document.addEventListener('click', outsideClickHandler)
        return () => {
            document.removeEventListener('click', outsideClickHandler)
        }
    })

}
export default useOnClickOutside;