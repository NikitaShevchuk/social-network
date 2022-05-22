export const changeById = (state, id, propertyToChange) => {
    return state.map( user => {
        if (user.id === id) {
            return {...user, ...propertyToChange}
        }
        return user;
    })
}