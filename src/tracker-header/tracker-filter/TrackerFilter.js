import React, { Component } from 'react';
import { connect } from 'react-redux';
import Icon from '../../icons/Icon';
import styles from './TrackerFilter.module.css';
import {openFilter, closeFilter} from '../../actions/FilterActions';
import {checkFilter, applyFilter, searchTerm} from '../../actions/DataActions';

class TrackerFilter extends Component {
    filterData(searchTerm) {
        this.props.searchTerm(searchTerm, this.props.title);
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
    }

    renderOptions() {
        if(!this.props.filters[this.props.title]) {
            return null;
        }

        return (
            <ul className={styles.dropdown}>
                <div className={styles.dropdownTitleHolder}>
                    <h4 className={styles.dropdownTitle}
                        onClick={() => this.resetSelection}>
                        Filter by {this.props.title.toLowerCase()}
                    </h4>
                    <Icon className={styles.close} 
                          onClick={e => {
                            this.props.closeFilter();
                            e.stopPropagation()
                          }}
                          name="close"
                          color="black"
                          size="small"/>
                </div>
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

        if(this.props[this.props.title].length > 0) {
            options.push(
                <li key={`${this.props.title.toLowerCase()}-reset`}
                    className={styles.resetSelection}
                    onClick={() => this.resetSelection()}>
                    Reset selection
                </li>
            )

            this.props[this.props.title].forEach((item, i) => options.push(
                <li key={`${this.props.title.toLowerCase()}-${i}`}
                    className={styles.dropdownOption}
                    onClick={() => {
                        this.props.checkFilter(item, this.props.title);
                        this.props.applyFilter(item, this.props.title);
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
                 onClick={() => this.props.openFilter(this.props.title)}>
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
        categoriesFilters: state.data.toJS().categoriesFilterTerms,
        projects: state.data.toJS().projects,
        categories: state.data.toJS().categories,
        assignee: state.data.toJS().assignee,
    }
}

const mapDispatchToProps = {
    openFilter: openFilter,
    closeFilter: closeFilter,
    applyFilter: applyFilter,
    checkFilter: checkFilter, 
    searchTerm: searchTerm
}
export default connect(mapStateToProps, mapDispatchToProps)(TrackerFilter);