import React, { Component } from 'react';
import { connect } from 'react-redux';
import Icon from '../../icons/Icon';
import styles from './TrackerFilter.module.css';
import {openProjectsFilter, openAssigneeFilter, openCategoriesFilter, closeFilter} from '../../actions/FilterActions';
import {filterProjects, filterAssignee, filterCategories} from '../../actions/DataActions';

class TrackerFilter extends Component {
    constructor(props) {
        super(props);

        this.state= {
            list: JSON.parse(JSON.stringify(props.data))
        }
    }

    toggleFilter() {
        console.log(this.props);
        switch (this.props.title) {
            case "projects": 
            this.props.filters.projects ? this.props.closeFilter() : this.props.openProjects();
            break;
            
            case "assignee": 
            this.props.filters.assignee ? this.props.closeFilter() : this.props.openAssignee();
            break;
            
            case "categories": 
            this.props.filters.categories ? this.props.closeFilter() : this.props.openCategories();
            break;

            default:
            this.props.closeFilter();
            break;
        }
    }

    applyFilter(item) {
        switch (this.props.title) {
            case "projects": 
            let filtersProject = JSON.parse(JSON.stringify(this.props.projectFilters))
            let itemIndexProject = filtersProject.indexOf(item.label)
            itemIndexProject === -1 ? filtersProject.push(item.label) : filtersProject.splice(itemIndexProject, 1)
            
            this.props.filterProjects(filtersProject);
            break;
            
            case "assignee": 
            let filtersAssignee = JSON.parse(JSON.stringify(this.props.assigneeFilters))
            let itemIndexAssignee = filtersAssignee.indexOf(item.label)
            itemIndexAssignee === -1 ? filtersAssignee.push(item.label) : filtersAssignee.splice(itemIndexAssignee, 1)
            
            this.props.filterAssignee(filtersAssignee);
            break;
            
            case "categories": 
            let filtersCategories = JSON.parse(JSON.stringify(this.props.categoriesFilters))
            let itemIndexCategories = filtersCategories.indexOf(item.label)
            itemIndexCategories === -1 ? filtersCategories.push(item.label) : filtersCategories.splice(itemIndexCategories, 1)
            
            this.props.filterCategories(filtersCategories);
            break;

            default:
            break;
        }
    }

    filterData(searchTerm) {
        this.setState({
            list: this.props.data.filter(item => {
                let hasTerm = item.label.indexOf(searchTerm) !== -1;
                let hasUpperCase = item.label.toUpperCase().indexOf(searchTerm) !== -1;
                let hasLowerCase = item.label.toLowerCase().indexOf(searchTerm) !== -1;

                return hasTerm || hasUpperCase || hasLowerCase;
            })
        })
    }

    resetSelection() {
        switch (this.props.title) {
            case "projects": 
            this.props.filterProjects([]);
            break;
            
            case "assignee": 
            this.props.filterAssignee([]);
            break;
            
            case "categories": 
            this.props.filterCategories([]);
            break;

            default:
            break;
        }

        this.setState(prevState => ({
            active: !prevState.active,
            list: this.props.data
        }))
    }

    renderOptions() {
        if(!this.props.filters[this.props.title]) {
            return null;
        }

        return (
            <ul className={styles.dropdown}>
                <h4 className={styles.dropdownTitle}
                    onClick={() => this.resetSelection}>
                    Filter by {this.props.title.toLowerCase()}
                </h4>
                <div className={styles.dropdownInputHolder}
                     onClick={e => e.stopPropagation()}>
                    <input type="text"
                           className={styles.dropdownInput}
                           onChange={e => {this.filterData(e.target.value)}}
                           placeholder={`Filter ${this.props.title.toLowerCase()}`}
                           aria-label={`Filter ${this.props.title.toLowerCase()}`}
                           autoComplete="off"
                           autoFocus=""/>
                </div>
                <div className={styles.dropdownOptions}>
                    {this.renderProps()}
                </div>
            </ul>
        )
    }

    renderProps() {
        let options = [];

        if(this.state.list.length > 0) {
            options.push(
                <li key={`${this.props.title.toLowerCase()}-reset`}
                    className={styles.resetSelection}
                    onClick={() => this.resetSelection()}>
                    Reset selection
                </li>
            )

            this.state.list.forEach((item, i) => options.push(
                <li key={`${this.props.title.toLowerCase()}-${i}`}
                    className={styles.dropdownOption}
                    onClick={() => {
                        item.checked = !item.checked;
                        this.applyFilter(item);
                    }}>
                    {item.color ? this.renderColor(item.color) : null}
                    {item.label}
                    {item.checked ? this.renderSelected() : null}
                </li>
            ))
        } else {
            options.push(
                <p key={`${this.props.title.toLowerCase()}-sorry`}
                   className={styles.sorry}>
                   No labels found. Sorry about that.
                </p>
            )
        }

        return options;
    }

    renderSelected() {
        return (
            <Icon className={styles.selected}
                  name="checked"
                  color="black"
                  size="small"/>
        )
    }

    renderColor(color) {
        const badgeStyle = {
            backgroundColor: color
        }

        return(
            <span className={styles.badge}
                  style={badgeStyle}>
                &nbsp;
            </span>
        )
    }

    render() {
        return (
            <div className={styles.trackerFilter}
                 onClick={() => this.toggleFilter()}>
                <div className={styles.filterLabel}>
                    {this.props.title}
                    <Icon name="arrowDown"
                          color="#586069"
                          size="standard"/>
                </div>
                {this.renderOptions()}
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    
    return {
        filters: state.filters.toJS(),
        projectFilters: state.data.toJS().projectsFilterTerms,
        assigneeFilters: state.data.toJS().assigneeFilterTerms,
        categoriesFilters: state.data.toJS().categoriesFilterTerms
    }
}

const mapDispatchToProps = {
    openProjects: openProjectsFilter,
    openAssignee: openAssigneeFilter,
    openCategories: openCategoriesFilter,
    closeFilter: closeFilter,
    filterProjects: filterProjects,
    filterAssignee: filterAssignee,
    filterCategories: filterCategories
}
export default connect(mapStateToProps, mapDispatchToProps)(TrackerFilter);