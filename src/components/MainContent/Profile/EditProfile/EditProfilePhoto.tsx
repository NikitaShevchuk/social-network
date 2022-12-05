import React, {FC, memo} from 'react';
import style from '../Profile.module.scss'

interface Props {
    onPhotoUpload: (e: React.ChangeEvent<HTMLInputElement>) => void
}

const EditProfilePhoto: FC<Props> = memo(({onPhotoUpload}) => {
    return (
        <form className={style.editPhoto}>
            <label className={style.fileContainer}>
                Edit profile photo
                <input
                    onChange={onPhotoUpload}
                    className={style.fileInput}
                    type="file"
                    accept=".jpg, .jpeg, .png"
                />
            </label>
        </form>
    );
});

export default EditProfilePhoto;