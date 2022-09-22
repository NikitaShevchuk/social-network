export interface UserData {
    id: number
    login: string | null
    email: string | null
}

export interface AuthInitialState {
    userData: UserData
    profileImg: string | null
    clientStatus: string | null
    isAuthorized: boolean
    successLogin: boolean
    loginFailed: string | null
    captcha: {
        url: string | null
    }
}
