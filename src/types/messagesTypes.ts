
export interface IconversationHead {
    id: null | number;
    photo: null | string;
    userName: null | string;
}

export interface Imessage {
    id: string;
    body: string;
    translatedBody: null | string;
    addedAt: string;
    senderId: number;
    senderName: string;
    recipientId: number;
    recipientName: string;
    viewed: boolean;
    deletedBySender: boolean;
    deletedByRecipient: boolean;
    isSpam: boolean;
    distributionId: null | number;
    myId: number;
    profileImg: null | string;
    senderPhoto: null | string;
}

export interface Photos {
    small: null | string;
    large: null | string;
}

export interface Idialog {
    id: number;
    userName: string;
    hasNewMessages: boolean;
    lastDialogActivityDate: string;
    lastUserActivityDate: string;
    newMessagesCount: number;
    photos: Photos;
    lastMessage: {
        body: string
        addedAt: string
    };
}

export interface InitialState {
    messages: [] | Imessage[];
    dialogs: [] | Idialog[] ;
    conversationHead: IconversationHead
}

