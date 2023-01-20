import React from 'react';
import ContentLoader from 'react-content-loader';

const ProfilePreloader = () => {
    return (
        <div className="central-meta">
            <div className="profile-preloader">
                <ContentLoader
                    speed={2}
                    width="100%"
                    height={461}
                    backgroundColor="#656565"
                    foregroundColor="#d6d6d6"
                >
                    <circle cx="91" cy="221" r="71" />
                    <rect x="20" y="304" rx="0" ry="0" width="130" height="30" />
                    <rect x="80%" y="210" rx="20" ry="20" width="130" height="35" />
                    <rect x="20" y="339" rx="0" ry="0" width="70" height="15" />
                    <rect x="20" y="436" rx="0" ry="0" width="250" height="16" />
                    <rect x="20" y="375" rx="0" ry="0" width="300" height="16" />
                    <rect x="20" y="404" rx="0" ry="0" width="400" height="18" />
                    <rect x="61%" y="210" rx="20" ry="20" width="130" height="35" />
                </ContentLoader>
                <div className="flex center">
                    <span className="loader small" />
                </div>
            </div>
        </div>
    );
};

export default ProfilePreloader;
