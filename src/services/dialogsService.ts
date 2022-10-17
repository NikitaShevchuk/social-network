import {DialogWithMessage, Message} from "../types/MessagesTypes";
import {defaultInstance, DefaultResponse, Response, ResultCodes} from "./index";

interface StartDialogResponse extends Response { data: {} }
interface lastMessageResponse extends Response { items: Message []}

export const dialogsService = {
    async startDialog(id: number) {
        const response = await defaultInstance.put(`dialogs/${id}`)
        return response.data as StartDialogResponse
    },
    async sendMessage(id: number, body: string) {
        const response = await defaultInstance.post(`dialogs/${id}/messages`, body)
        return response.data as DefaultResponse
    },
    async requireMessages(id: number, date: string = '2022-05-19') {
        const response = await defaultInstance.get(`dialogs/${id}/messages/new?newerThen=${date}`)
        return response.data as Message[]
    },
    async requireDialogs() {
        const response = await defaultInstance.get(`dialogs`)
        return response.data as DialogWithMessage[]
    },
    async requireLastMessage(id: number) {
        const response = await defaultInstance.get(`dialogs/${id}/messages?page=1&count=1`)
        return response.data as lastMessageResponse
    }
}

//const ws = new WebSocket('wss://social-network.samuraijs.com/handlers/ChatHandler.ashx')
// ws.addEventListener('message', (e) => {
//     console.log(e)
// })