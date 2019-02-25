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

export const filterProjects = (payload) => {
    return {
        type: 'PROJECTS_TERM_FILTER',
        payload: payload
    }
}

export const filterAssignee = (payload) => {
    return {
        type: 'ASSIGNEE_TERM_FILTER',
        payload: payload
    }
}

export const filterCategories = (payload) => {
    return {
        type: 'CATEGORIES_TERM_FILTER',
        payload: payload
    }
}