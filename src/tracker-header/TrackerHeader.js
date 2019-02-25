import React, { Component } from 'react';
import { connect } from 'react-redux';
import TrackerFilter from './tracker-filter/TrackerFilter';
import TrackerStatus from './tracker-status/TrackerStatus';
import styles from './TrackerHeader.module.css';

class TrackerHeader extends Component {
    render() {
        return(
            <div className={styles.trackerHeader}>
                <TrackerStatus type="opened" count={this.props.data.filter(issue => issue.status === 'opened').length}/>
                <TrackerStatus type="closed" count={this.props.data.filter(issue => issue.status === 'closed').length}/>
                <TrackerFilter title="projects" data={this.props.projects}/>
                <TrackerFilter title="categories" data={this.props.categories}/>
                <TrackerFilter title="assignee" data={this.props.assignee}/>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
      data: state.data.toJS().data,
      tickets: state.data.toJS().tickets,
      projects: state.data.toJS().projects,
      categories: state.data.toJS().categories,
      assignee: state.data.toJS().assignee,
    }
  }
  export default connect(mapStateToProps)(TrackerHeader);