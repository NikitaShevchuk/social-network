import { DialogsInitialState, DialogWithMessage } from '../../../types/MessagesTypes';

export const setSingleConversationHead = (
    state: DialogsInitialState,
    action: { id: number }
): DialogsInitialState => {
    const dialogIndex: number = state.dialogs.findIndex(
        (dialog: DialogWithMessage) => dialog.id === action.id
    );
    if (dialogIndex !== -1) {
        return {
            ...state,
            conversationHead: {
                photo: state.dialogs[dialogIndex]?.photos.small,
                id: state.dialogs[dialogIndex]?.id,
                userName: state.dialogs[dialogIndex]?.userName
            }
        };
    }
    return state;
};
