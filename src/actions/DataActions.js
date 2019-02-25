export const filterOpened = () => {
    return {
        type: 'OPENED_FILTER'
    }
}

export const filterClosed = () => {
    return {
        type: 'CLOSED_FILTER'
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

export const searchTerm = (searchTerm, filter) => {
    return {
        type: 'SEARCH_TERM',
        payload: {
            searchTerm: searchTerm,
            filter: filter
        }
    }
}