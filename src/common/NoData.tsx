import React, {FC} from 'react';
import {NavLink} from "react-router-dom";

interface Props {
    text: string
    linkText: string
    href: string
}

const NoData: FC<Props> = ({href, linkText, text}) => {
    return (
        <div className='fetch-error'>
            <div className="wrapper">
                <div className='text'>{text}</div>
                <br/>
                <div className='link'>
                    <NavLink to={href}>
                        {linkText}
                    </NavLink>
                </div>
            </div>
        </div>
    );
};

export default NoData;
