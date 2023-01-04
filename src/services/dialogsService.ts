import { Dialog, Message, NewMessageFormData } from '../types/MessagesTypes';
import { defaultInstance, Response } from './index';

export interface StartDialogResponse extends Response {
    data: {};
}

export interface MessagesResponse {
    items: Message[];
    error: string | null;
    totalCount: number;
}

interface SendMessageResponse extends Response {
    data: { message: Message };
}

export const dialogsService = {
    async startDialog(id: number) {
        const response = await defaultInstance.put<StartDialogResponse>(`dialogs/${id}`);
        return response.data;
    },
    async sendMessage(id: number, formData: NewMessageFormData) {
        const response = await defaultInstance.post<SendMessageResponse>(
            `dialogs/${id}/messages`,
            formData
        );
        return response.data;
    },
    async requireMessagesByDate(id: number, date: string = '2022-05-19') {
        const response = await defaultInstance.get<MessagesResponse>(
            `dialogs/${id}/messages/new?newerThen=${date}`
        );
        return response.data;
    },
    async requireMessages(id: number, count: number, pageNumber: number) {
        const response = await defaultInstance.get<MessagesResponse>(
            `dialogs/${id}/messages/?page=${pageNumber}&count=${count}`
        );
        return response.data;
    },
    async requireDialogs() {
        const response = await defaultInstance.get<Dialog[]>(`dialogs`);
        return response.data;
    },
    async requireLastMessage(id: number) {
        const response = await defaultInstance.get<MessagesResponse>(
            `dialogs/${id}/messages?page=1&count=1`
        );
        return response.data;
    },
    async requireNewMessagesCount() {
        const response = await defaultInstance.get<number>(`dialogs/messages/new/count`);
        return response.data;
    }
};

// const ws = new WebSocket('wss://social-network.samuraijs.com/handlers/ChatHandler.ashx')
// ws.addEventListener('message', (e) => {
//     console.log(e)
// })
