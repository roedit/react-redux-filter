import { fromJS } from 'immutable';
import createFilters from '../CreateFilters';
import _ from 'lodash';

const data = require('../data.json');
const { projects, assignee, categories } = createFilters(data);
const initialState = fromJS({
    data: JSON.parse(JSON.stringify(data)),
    tickets: data,
    projects: projects,
    assignee: assignee,
    categories: categories,
    opened: false,
    closed: false,
    projectsFilterTerms: [],
    assigneeFilterTerms: [],
    categoriesFilterTerms: []
})

function filterData(state, type) {
    let dataToFilter = JSON.parse(JSON.stringify(data));
    let projectsFiltered = [];
    let assigneeFiltered = [];
    let categoriesFiltered = [];
    let hasProjectsFilter = false;
    let hasAssigneeFilter = false;
    let hasCategoriesFilter = false;

    if(state.projectsFilterTerms.length > 0) {
        hasProjectsFilter = true;
        projectsFiltered = dataToFilter.filter(ticket => state.projectsFilterTerms.indexOf(ticket.project) !== -1)
    }

    if(state.assigneeFilterTerms.length > 0) {
        hasAssigneeFilter = true;
        assigneeFiltered = dataToFilter.filter(ticket => state.assigneeFilterTerms.indexOf(ticket.assignee) !== -1)
    }

    if(state.categoriesFilterTerms.length > 0) {
        hasCategoriesFilter = true;
        categoriesFiltered = dataToFilter.filter(ticket => state.categoriesFilterTerms.indexOf(ticket.category) !== -1)
    }

    if(hasProjectsFilter && hasAssigneeFilter && hasCategoriesFilter) {
        return _.intersection(_.intersection(projectsFiltered, assigneeFiltered), categoriesFiltered);
    }

    if(hasProjectsFilter && hasAssigneeFilter) {
        return _.intersection(projectsFiltered, assigneeFiltered);
    }

    if(hasProjectsFilter && hasCategoriesFilter) {
        return _.intersection(projectsFiltered, categoriesFiltered);
    }

    if(hasCategoriesFilter && hasAssigneeFilter) {
        return _.intersection(categoriesFiltered, assigneeFiltered);
    }

    if(hasProjectsFilter) {
        return projectsFiltered;
    }
    
    if(hasAssigneeFilter) {
        return assigneeFiltered;
    }
    
    if(hasCategoriesFilter) {
        return categoriesFiltered;
    }

    return dataToFilter
}

export default function(state = initialState, action) {
    let stateJS = state.toJS()
    let filteredData = JSON.parse(JSON.stringify(data));

    switch (action.type) {
        case 'OPENED_FILTER': {
            stateJS.opened ? stateJS.tickets = filteredData : 
            stateJS.tickets = filteredData.filter(ticket => ticket.status === 'opened')
            stateJS.opened = !stateJS.opened;

            return fromJS(stateJS);
        }

        case 'CLOSED_FILTER': {
            stateJS.closed ? stateJS.tickets = filteredData : 
            stateJS.tickets = filteredData.filter(ticket => ticket.status === 'closed')
            stateJS.closed = !stateJS.closed;

            return fromJS(stateJS);
        }

        case 'APPLY_FILTER': {
            let filters = stateJS.projectsFilterTerms
            if(action.payload.filter === 'assignee') filters = stateJS.assigneeFilterTerms;
            if(action.payload.filter === 'categories') filters = stateJS.categoriesFilterTerms;

            let itemIndex = filters.indexOf(action.payload.item.label)
            itemIndex === -1 ? filters.push(action.payload.item.label) : filters.splice(itemIndex, 1)
            
            stateJS.tickets = filterData(stateJS);

            return fromJS(stateJS);
        }

        case 'CHECK_FILTER': {
            let listFilter = stateJS.projects;
            if(action.payload.filter === 'assignee') listFilter = stateJS.assignee;
            if(action.payload.filter === 'categories') listFilter = stateJS.categories;

            listFilter.forEach(item => {
                if(item.label === action.payload.item.label) {
                    item.checked = !item.checked
                }
            })

            return fromJS(stateJS);
        }

        default: 
        return fromJS(stateJS);
    }
}

