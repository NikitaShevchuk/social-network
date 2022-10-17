import { DialogWithMessage } from "../../types/MessagesTypes";
import { User } from "../../types/UsersTypes";

export const changeById = (users: User[] | [], id: number, propertyToChange: {followed: boolean}) => {
    return users.map( (item: User) => {
        if (item.id === id) {
            return {...item, ...propertyToChange}
        }
        return item;
    })
}
export const filterDialogsByName = (dialogs: DialogWithMessage[], userName: string) => {
    return dialogs.filter( d => d.userName.includes(userName))
}