import React, { FC, memo } from 'react';
import style from '../Profile.module.scss';

interface Props {
    onPhotoUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const EditProfilePhoto: FC<Props> = memo(({ onPhotoUpload }) => (
    <form className={style.editPhoto}>
        <span className={style.fileContainer}>
            Edit profile photo
            <input
                onChange={onPhotoUpload}
                className={style.fileInput}
                type="file"
                accept=".jpg, .jpeg, .png"
            />
        </span>
    </form>
));

export default EditProfilePhoto;
