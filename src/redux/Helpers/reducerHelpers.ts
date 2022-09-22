import { Idialog } from "../../types/messagesTypes";
import { Iuser } from "../../types/usersTypes";

export const changeById = (users: Iuser[] | [], id: number, propertyToChange: {followed: boolean}) => {
    return users.map( (item: Iuser) => {
        if (item.id === id) {
            return {...item, ...propertyToChange}
        }
        return item;
    })
}
export const filterDialogsByName = (dialogs: Idialog[], userName: string) => {
    return dialogs.filter( d => d.userName.includes(userName))
}