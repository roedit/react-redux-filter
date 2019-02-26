export const filterOpened = () => {
    return {
        type: 'OPENED_TICKETS'
    }
}

export const filterClosed = () => {
    return {
        type: 'CLOSED_TICKETS'
    }
}

export const applyFilter = (item, filter) => {
    return {
        type: 'APPLY_FILTER',
        payload: {
            filter: filter,
            item: item
        }
    }
}

export const checkFilter = (item, filter) => {
    return {
        type: 'CHECK_FILTER',
        payload: {
            item: item,
            filter: filter
        }
    }
}