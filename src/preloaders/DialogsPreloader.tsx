import React from 'react';
import ContentLoader from 'react-content-loader';

const DialogsPreloader = () => {
    return (
        <ContentLoader
            speed={2}
            width="100%"
            height={92}
            backgroundColor="#656565"
            foregroundColor="#d6d6d6"
        >
            <circle cx="41" cy="41" r="23" />
            <rect x="78" y="18" rx="0" ry="0" width="80" height="15" />
            <rect x="88%" y="18" rx="0" ry="0" width="25" height="15" />
            <rect x="78" y="43" rx="0" ry="0" width="120" height="18" />
        </ContentLoader>
    );
};

export default DialogsPreloader;
