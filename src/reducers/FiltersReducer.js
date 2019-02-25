import { fromJS } from 'immutable';

const initialState = fromJS({
    projects: false,
    assignee: false,
    categories: false
    
})
export default function(state = initialState, action) {
    let stateJS = state.toJS()

    switch (action.type) {
        case 'PROJECTS_FILTER': {
            stateJS.assignee = false;
            stateJS.categories = false;
            stateJS.projects = true;

            return fromJS(stateJS);
        }

        case 'ASSIGNEE_FILTER': {
            stateJS.projects = false;
            stateJS.categories = false;
            stateJS.assignee = true;

            return fromJS(stateJS);
        }

        case 'CATEGORIES_FILTER': {
            stateJS.assignee = false;
            stateJS.projects = false;
            stateJS.categories = true;

            return fromJS(stateJS);
        }

        case 'CLOSE_FILTER': {
            stateJS.assignee = false;
            stateJS.projects = false;
            stateJS.categories = false;

            return fromJS(stateJS);
        }

        default: 
        return fromJS(stateJS);
    }
    
}