import { fromJS } from 'immutable';

const initialState = fromJS({
    projects: false,
    assignee: false,
    categories: false
})

function closeFilter(state) {
    state.projects = false;
    state.assignee = false;
    state.categories = false;

    return state;
}

export default function(state = initialState, action) {
    let stateJS = state.toJS()

    switch (action.type) {
        case 'OPEN_FILTER': {
            switch (action.payload.filter) {
                case "projects": 
                if(stateJS.projects) {
                    return fromJS(closeFilter(stateJS));
                }

                stateJS.assignee = false;
                stateJS.categories = false;
                stateJS.projects = true;
                break;
                
                case "assignee": 
                if(stateJS.assignee) {
                    return fromJS(closeFilter(stateJS));
                }

                stateJS.assignee = true;
                stateJS.categories = false;
                stateJS.projects = false;
                break;
                
                case "categories": 
                if(stateJS.assignee) {
                    return fromJS(closeFilter(stateJS));
                }

                stateJS.assignee = false;
                stateJS.categories = true;
                stateJS.projects = false;
                break;
    
                default:
                this.props.closeFilter();
                break;
            }
            
            return fromJS(stateJS);
        }

        case 'CLOSE_FILTER': {
            return fromJS(closeFilter(stateJS));
        }

        default: 
        return fromJS(stateJS);
    }
    
}