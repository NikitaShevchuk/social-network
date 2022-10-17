import {Photos} from "./Photos";

export interface ConversationHead {
    id: null | number
    photo: null | string
    userName: null | string
}

export interface Message {
    id: string
    body: string
    translatedBody: null | string
    addedAt: string
    senderId: number
    senderName: string
    recipientId: number
    recipientName: string
    viewed: boolean
    deletedBySender: boolean
    deletedByRecipient: boolean
    isSpam: boolean
    distributionId: null | number
    myId: number
    profileImg: null | string
    senderPhoto: null | string
}

export interface Dialog {
    id: number
    userName: string
    hasNewMessages: boolean
    lastDialogActivityDate: string
    lastUserActivityDate: string
    newMessagesCount: number
    photos: Photos
}

export interface DialogWithMessage extends Dialog {
    lastMessage: {
        body: string
        addedAt: string
    };
}

export interface MessagesInitialState {
    messages: Message[]
    dialogs: DialogWithMessage[]
    conversationHead: ConversationHead
    messagesError: string | null
    dialogsIsLoading: boolean
    messagesIsLoading: boolean
    dialogsError: string | null
}

