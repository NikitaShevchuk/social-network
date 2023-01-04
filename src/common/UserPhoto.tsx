import React, { FC } from 'react';
import userIcon from './assets/img/userIcon.jpg';

const UserPhoto: FC<{ profileImg: string | null }> = ({ profileImg }) => (
    <img src={profileImg || userIcon} alt="" />
);

export default UserPhoto;
