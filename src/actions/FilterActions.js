export const openProjectsFilter = () => {
    return {
        type: 'PROJECTS_FILTER'
    }
}

export const openAssigneeFilter = () => {
    return {
        type: 'ASSIGNEE_FILTER'
    }
}

export const openCategoriesFilter = () => {
    return {
        type: 'CATEGORIES_FILTER'
    }
}

export const closeFilter = () => {
    return {
        type: 'CLOSE_FILTER'
    }
}