export const openFilter = (filter) => {
    return {
        type: 'OPEN_FILTER',
        payload: {
            filter: filter
        }
    }
}

export const closeFilter = () => {
    return {
        type: 'CLOSE_FILTER'
    }
}