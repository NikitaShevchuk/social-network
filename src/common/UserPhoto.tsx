import React, {FC} from "react";
import userIcon from "./assets/img/userIcon.jpg";

const UserPhoto: FC<{profileImg: string | null }> = ({profileImg}) => {
    return <img src={profileImg ? profileImg : userIcon} alt=""/>
}

export default UserPhoto