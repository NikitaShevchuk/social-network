import {Dialog, DialogWithMessage, Message,} from "../../../types/MessagesTypes";
import {timeout} from "../../../common/helpers/sleep";
import {dialogsService} from "../../../services/dialogsService";

export const addLastMessageToDialog = async (singleDialog: Dialog, index: number) => {
    await timeout(index * 200)
    const lastMessage = await dialogsService.requireLastMessage(singleDialog.id)
    return ({...singleDialog, lastMessage: lastMessage.items[0]}) as DialogWithMessage
}


type UniqueMessages = Array<[string, Message]>
export const getUniqueMessages = (messages: Message[], newMessages: Message[]): Message[] => {
    const updatedMessages: Message[] = [...messages, ...newMessages]
    const messagesWithUniqueIdAsKey: UniqueMessages = updatedMessages.map( item => [item['id'], item] )
    return [...new Map(messagesWithUniqueIdAsKey).values()] as unknown as Message[]
}
