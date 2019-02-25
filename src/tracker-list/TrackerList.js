import React, { Component } from 'react';
import { connect } from 'react-redux';
import Icon from '../icons/Icon';
import TrackerBadge from './tracker-badge/TrackerBadge';
import styles from './TrackerList.module.css';

class TrackerList extends Component {

  getCategoryColor(ticketCategory) {
    let color = 'pink';

    this.props.categories.forEach(category => {
      if(category.color && category.label === ticketCategory) {
        color = category.color;
      }
    })    

    return color;
  }

  renderTickets() {
    let tickets = [];

    this.props.tickets.forEach((item, i) => {
      tickets.push(
        <li key={`ticket-${i}`} 
            className={styles.ticket}>
          {this.renderStatus(item.status)}
          <div className={styles.titleDetails}>
            <h4 className={styles.title}>
              {item.description}
            </h4>
            <TrackerBadge text={item.category}
                          color={this.getCategoryColor(item.category)}/>
          </div>
          <p className={styles.subtitle}>
            #{item.id} Assigned to {item.assignee} {item.project ? `| Project ${item.project}` : null}
          </p>
        </li>
      )
    })

    return tickets;
  }

  renderStatus(status) {
    let name = 'opened';
    let color = 'green';

    if(status === 'closed') {
      name = 'closed';
      color = 'red';
    }

    return (
      <Icon className={styles.status}
            name={name}
            color={color}
            size='standard'/>
    )
  }

  render() {
    return (
      <ul className={styles.trackerList}>
        {this.renderTickets()}
      </ul>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    tickets: state.data.toJS().tickets,
    categories: state.data.toJS().categories
  }
}
export default connect(mapStateToProps)(TrackerList);
