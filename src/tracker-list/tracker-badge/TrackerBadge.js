import React, { Component } from 'react';
import styles from './TrackerBadge.module.css';

class TrackerBadge extends Component {
    render() {
        const badgeStyle = {
            backgroundColor: this.props.color
        }

        return (
            <span className={styles.trackerBadge}
                  style={badgeStyle}>
                {this.props.text}
            </span>
        )
    }
}

export default TrackerBadge;