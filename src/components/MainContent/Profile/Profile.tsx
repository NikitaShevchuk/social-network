import React, { memo } from 'react';
import ProfileInfo from './ProfileInfo';
import ErrorComponent from '../../../common/ErrorComponent';
import FeedContainer from '../../Feed/FeedContainer';
import { ProfileProps } from './ProfileContainer';
import ProfileHeader from './ProfileHeader';
import EditProfile from './EditProfile';
import ProfileLinks from './ProfileLinks';
import FetchError from '../../../common/FetchError';
import ProfilePreloader from '../../../preloaders/ProfilePreloader';

const Profile = memo<ProfileProps>(
    ({
        profile,
        loadProfile,
        isMyProfile,
        localError,
        profileIsLoading,
        profileEditMode,
        userId,
        profileFetchError
    }) => {
        const refetchProfile = () => loadProfile(userId);
        if (profileIsLoading && !localError) return <ProfilePreloader />;
        return (
            <div className="central-meta">
                {localError && <ErrorComponent errorText={localError} />}
                {profileFetchError && (
                    <FetchError refetch={refetchProfile} errorText={profileFetchError} />
                )}
                {!profileFetchError && (
                    <>
                        <div className="bg">
                            <div className="timeline-info">
                                <ProfileHeader profileLargePhoto={profile.photos?.large} />
                                <EditProfile
                                    profile={profile}
                                    profileEditMode={profileEditMode}
                                    isMyProfile={isMyProfile}
                                />
                                <ProfileInfo
                                    profileEditMode={profileEditMode}
                                    isMyProfile={isMyProfile}
                                    profile={profile}
                                />
                            </div>
                            <ProfileLinks
                                contacts={profile.contacts}
                                profileEditMode={profileEditMode}
                            />
                        </div>
                        <FeedContainer />
                    </>
                )}
            </div>
        );
    }
);

export default Profile;
