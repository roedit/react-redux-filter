import { fromJS } from 'immutable';
import createFilters from '../CreateFilters';

const data = require('../data.json');
const { projects, assignee, categories } = createFilters(data);
const initialState = fromJS({
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
    let filteredData = JSON.parse(JSON.stringify(data));

    if(type === 'add') {
        filteredData = JSON.parse(JSON.stringify(state.tickets));
    }

    let iooi = filteredData.filter(ticket => {
        let inProjects = false;
        let inAssignee = false;
        let inCategories = false;        

        if(state.projectsFilterTerms.length === 0 && 
           state.assigneeFilterTerms.length === 0 && 
           state.categoriesFilterTerms.length === 0) {
            return true;
        }

        if(state.projectsFilterTerms.length > 0) {
            inProjects = state.projectsFilterTerms.indexOf(ticket.project) !== -1
        }
        
        if(state.assigneeFilterTerms.length > 0) {
            inAssignee = state.assigneeFilterTerms.indexOf(ticket.assignee) !== -1
        }
        
        if(state.categoriesFilterTerms.length > 0) {
            inCategories = state.categoriesFilterTerms.indexOf(ticket.category) !== -1
        }

        return inProjects || inAssignee || inCategories;
    })

    console.log(iooi);
    return iooi;
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

        case 'PROJECTS_TERM_FILTER': {
            stateJS.projectsFilterTerms = action.payload.searchTerms
            stateJS.tickets = filterData(stateJS, action.payload.type);

            return fromJS(stateJS);
        }

        case 'ASSIGNEE_TERM_FILTER': {
            stateJS.assigneeFilterTerms = action.payload.searchTerms
            stateJS.tickets = filterData(stateJS, action.payload.type);

            return fromJS(stateJS);
        }

        case 'CATEGORIES_TERM_FILTER': {
            stateJS.categoriesFilterTerms = action.payload.searchTerms
            stateJS.tickets = filterData(stateJS, action.payload.type);

            return fromJS(stateJS);
        }

        default: 
        return fromJS(stateJS);
    }
}

