import React, {useEffect} from "react";


const outsideClickHandler = (
    ref: React.MutableRefObject<any> | null,
    callback: (toggle: boolean) => void,
) => (e: MouseEvent): void => {

    const target = e.target as HTMLElement;
    const shouldClose = ref?.current && !ref?.current.contains(target)
    const modalException = target.className?.includes && target.className.includes('modalWindow__wrapper')
    if (shouldClose || modalException) callback(false)

}

export const useOnClickOutside = (
    ref: React.MutableRefObject<any> | null,
    callback: (toggle: boolean) => void,
) => {
    useEffect(() => {
        document.addEventListener('click', outsideClickHandler(ref, callback))
        return () => {
            // @ts-ignore
            document.removeEventListener('click', outsideClickHandler)
        }
    }, [])
}


export default useOnClickOutside;