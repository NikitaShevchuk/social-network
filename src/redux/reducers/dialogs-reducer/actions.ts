import { DialogWithMessage } from '../../../types/MessagesTypes';
import { InferActionsTypes } from '../../redux-store';

export const dialogsActions = {
    setDialogs: (dialogs: DialogWithMessage[]) =>
        ({ type: 'messages-reducer/SET_DIALOG', dialogs } as const),
    setConversationHead: (id: number) =>
        ({ type: 'messages-reducer/SET_CONVERSATION_HEAD', id } as const),
    setFilteredDialogs: (userName: string) =>
        ({ type: 'messages-reducer/SET_FILTERED_DIALOGS', userName } as const),
    setDialogsError: (errorText: string) =>
        ({ type: 'messages-reducer/SET_DIALOGS_ERROR', errorText } as const),
    clearDialogsError: () => ({ type: 'messages-reducer/CLEAR_DIALOGS_ERROR' } as const),
    setIsDialogsLoading: (isLoading: boolean) =>
        ({ type: 'messages-reducer/SET_IS_DIALOGS_LOADING', isLoading } as const)
};

export type DialogsActionsType = InferActionsTypes<typeof dialogsActions>;
