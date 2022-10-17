import {Dialog, DialogWithMessage} from "../../../types/MessagesTypes";
import {timeout} from "../../../common/helpers/sleep";
import {dialogsService} from "../../../services/dialogsService";

export const addLastMessageToDialog = async (singleDialog: Dialog, index: number) => {
    await timeout(index * 200) // setting request timeout
    const lastMessage = await dialogsService.requireLastMessage(singleDialog.id)
    return ({...singleDialog, lastMessage: lastMessage.items[0]}) as DialogWithMessage
}