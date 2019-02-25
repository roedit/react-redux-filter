import React, { Component } from 'react';
import { connect } from 'react-redux';
import Icon from '../../icons/Icon';
import {filterOpened, filterClosed} from '../../actions/DataActions';
import styles from './TrackerStatus.module.css';

class TrackerStatus extends Component {
    filterList() {
        switch (this.props.type) {
            case 'opened':
            this.props.filterOpened()
            break;

            case 'closed':
            this.props.filterClosed()
            break;

            default:
            break;
        }
    }

    render() {
        return (
            <div className={styles.trackerStatus}
                 onClick={() => this.filterList()}>
                <Icon className={styles.icon}
                      name={this.props.type === 'opened' ? 'opened' : 'closed'}
                      color="#586069"
                      size="standard"/>
                {this.props.count} {this.props.type === 'opened' ? 'Opened' : 'Closed'}
            </div>
        )
    }
}


const mapDispatchToProps = {
    filterOpened: filterOpened,
    filterClosed: filterClosed
}
export default connect(null, mapDispatchToProps)(TrackerStatus);