import {LoginResponse} from "../../../../services/profileService";
import {Profile} from "../../../../types/ProfileTypes";

export const authResponseTest: LoginResponse = {
    data: {
        id: 23112,
        login: "testLogin",
        email: "testmail@mail.com"
    },
    messages:[],
    resultCode: 0
}

export const getProfileResponseTest: Profile = {
    aboutMe: "Front-end developer test",
    contacts:{
        facebook: null,
        website: null,
        vk: null,
        twitter: null,
        youtube: null,
        mainLink: null,
        instagram: null,
        github: null
    },
    fullName:"Nikita Shevchuk test",
    lookingForAJob:true,
    lookingForAJobDescription:"Looking for a job test",
    photos: {
        small: "https://social-network.samuraijs.com/activecontent/images/users/23790/user-small.jpg?v=47",
        large: "https://social-network.samuraijs.com/activecontent/images/users/23790/user-small.jpg?v=47"
    },
    userId:23790
}