import {defaultInstance} from "./index";

interface CaptchaResponse { url: string }

export const securityService = {
    async requireCaptcha() {
        const response = await defaultInstance.get(`security/get-captcha-url`)
        return response.data as CaptchaResponse
    }
}