import React, {FC} from 'react';
import ProfileStatusContainer from "../../../../common/ProfileStatus/ProfileStatusContainer";

interface Props {
    isAuthorized: boolean
}

const Status: FC<Props> = ({isAuthorized}) => {
    return (
        <div className="status">
            {isAuthorized ?
                <ProfileStatusContainer
                    isMyProfile={true}
                />
                :
                'Login to add status'
            }
        </div>
    );
};

export default Status;