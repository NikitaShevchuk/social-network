import * as axios from "axios";

const usersInstance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    withCredentials: true,
    headers: {
        "API-KEY": "b843ce8c-834e-410f-a28e-165a22d3eaab" // nikitashev
        // "API-KEY": "b843ce8c-834e-410f-a28e-165a22d3eaab"  //test account
        // "API-KEY": "78e8b5ca-1d57-4f99-b0ed-b0e4c9972089" //nikitashev1112
    }
})

export const profileApi = {
    getProfile(id) {
        return usersInstance.get(`profile/${id}`).then(response => response.data)
    },
    getStatus(id) {
        return usersInstance.get(`profile/status/${id}`).then(response => response.data)
    },
    updStatus(status) {
        return usersInstance.put(`profile/status`, {status}).then(response => response.data)
    },
    auth() {
        return usersInstance.get(`auth/me`).then(response => response.data)
    },
    login(formData) {
        return usersInstance.post('auth/login', formData).then(response => response.data)
    },
    logout() {
        return usersInstance.delete('auth/login').then(response => response.data)
    },
    uploadPhoto(photo) {
        let formData = new FormData();
        formData.append("image", photo);
        return usersInstance.put(`profile/photo`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }).then(response => response.data)
    },
    updateProfile(formData) {
        return usersInstance.put(`profile`, formData).then(response => response.data)
    }
}

export const usersApi = {
    getUsers(currentPage = 1, pageSize = 10) {
        return usersInstance.get(`users?page=${currentPage}&count=${pageSize}`)
            .then(response => response.data)
    },
    follow(id) {
        return usersInstance.post(`follow/${id}`).then(response => response.data)
    },
    unfollow(id) {
        return usersInstance.delete(`follow/${id}`).then(response => response.data)
    },
    auth() {
        console.warn('Use profileApi object')
        return profileApi.auth();
    },
    isFollowing(id) {
        return usersInstance.get(`follow/${id}`).then(response => response.data)
    }
}

export const dialogsApi = {
    startDialog(id) {
        return usersInstance.put(`dialogs/${id}`).then(response => response.data)
    },
    sendMessage(id = 1, body = {body: 'message text'}) {
        return usersInstance.post(`dialogs/${id}/messages`, body).then(response => response.data)
    },
    //requireMessages(id, page = 1, count = 10) {
    //    return usersInstance.get(`dialogs/${id}/messages?page=${page}&count=${count}`).then(response => response.data)
    //},
    requireMessages(id, date = '2022-05-19') {
        return usersInstance.get(`dialogs/${id}/messages/new?newerThen=${date}`).then(response => response.data)
    },
    requireDialogs() {
        return usersInstance.get(`dialogs`).then(response => response.data)
    },
    requireLastMessage(id) {
        return usersInstance.get(`dialogs/${id}/messages?page=1&count=1`).then(response => response.data)
    }
}
export const securityApi = {
    requireCaptcha() {
        return usersInstance.get(`security/get-captcha-url`).then(response => response.data)
    }
}
