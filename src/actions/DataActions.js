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

export const filterProjects = (searchTerms, type) => {
    return {
        type: 'PROJECTS_TERM_FILTER',
        payload: {
            searchTerms: searchTerms,
            type: type
        }
    }
}

export const filterAssignee = (searchTerms, type) => {
    return {
        type: 'ASSIGNEE_TERM_FILTER',
        payload: {
            searchTerms: searchTerms,
            type: type
        }
    }
}

export const filterCategories = (searchTerms, type) => {
    return {
        type: 'CATEGORIES_TERM_FILTER',
        payload: {
            searchTerms: searchTerms,
            type: type
        }
    }
}