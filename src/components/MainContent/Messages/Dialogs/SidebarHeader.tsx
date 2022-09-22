import React, {FC} from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSquarePlus, faXmark} from "@fortawesome/free-solid-svg-icons";

interface Props {
    searchMode: boolean
    setSearchMode: (isSearchMode: boolean) => void
}

const SidebarHeader: FC<Props> = ({searchMode, setSearchMode}) => {
    const closeSearch = () => setSearchMode(false)
    const openSearch = () => setSearchMode(true)
    return (
        <div className="sidebarHeader">
            {searchMode && <>
                <span className="text opacity-animation">Find people</span>
                <FontAwesomeIcon
                    className='opacity-animation'
                    onClick={closeSearch}
                    icon={faXmark}
                />
            </>}
            {!searchMode && <>
                <span className="text opacity-animation">Messages</span>
                <FontAwesomeIcon
                    className='opacity-animation'
                    onClick={openSearch}
                    icon={faSquarePlus}
                />
            </>}
        </div>
    )
};

export default SidebarHeader;