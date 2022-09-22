import React, {FC} from 'react';
import ProfileStatusContainer from "../../../../common/commonComponents/ProfileStatus/ProfileStatusContainer";

interface Props {
    isAuthorized: boolean
}

const Status: FC<Props> = ({isAuthorized}) => {
    return (
        <div className="status">
            {isAuthorized ?
                <ProfileStatusContainer
                    isMyProfile={false}
                />
                :
                'Login to add status'
            }
        </div>
    );
};

export default Status;