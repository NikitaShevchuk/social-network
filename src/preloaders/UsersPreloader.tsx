import React from 'react';
import ContentLoader from 'react-content-loader';

const UsersPreloader = () => {
    return (
        <ContentLoader
            speed={2}
            width="100%"
            height={100}
            backgroundColor="#656565"
            foregroundColor="#d6d6d6"
        >
            <circle cx="50" cy="50" r="30" />
            <rect x="95" y="32" rx="0" ry="0" width="100" height="20" />
            <rect x="62%" y="32" rx="20" ry="20" width="115" height="35" />
            <rect x="95" y="57" rx="0" ry="0" width="70" height="13" />
            <rect x="82%" y="32" rx="20" ry="20" width="100" height="35" />
        </ContentLoader>
    );
};

export default UsersPreloader;
