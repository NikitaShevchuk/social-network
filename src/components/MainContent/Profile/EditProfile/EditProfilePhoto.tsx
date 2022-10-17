import React, {FC, memo} from 'react';

interface Props {
    onPhotoUpload: (e: React.ChangeEvent<HTMLInputElement>) => void
}

const EditProfilePhoto: FC<Props> = memo(({onPhotoUpload}) => {
    return (
        <form className="edit-phto">
            <i className="fa fa-edit"/>
            <label className="fileContainer">
                Edit profile photo
                <input
                    onChange={onPhotoUpload}
                    type="file"
                    accept=".jpg, .jpeg, .png"
                />
            </label>
        </form>
    );
});

export default EditProfilePhoto;