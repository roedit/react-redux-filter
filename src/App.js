import React, { Component } from 'react';
import TrackerHeader from './tracker-header/TrackerHeader';
import TrackerList from './tracker-list/TrackerList';
import styles from './App.modules.css'

class App extends Component {
  render() {
    return (
      <div className={styles.app}>
        <TrackerHeader/>
        <TrackerList/>
      </div>
    );
  }
}

export default App;
