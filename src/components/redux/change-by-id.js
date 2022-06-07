export const changeById = (state, id, propertyToChange) => {
    return state.map( item => {
        if (item.id === id) {
            return {...item, ...propertyToChange}
        }
        return item;
    })
}