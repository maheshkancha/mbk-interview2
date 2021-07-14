import React, { Component } from 'react';
import { Button } from '@material-ui/core';

class Home extends Component {
    state = {}
    showComments = () => {
        console.log('Show Comments Screen...');
    }

    render() {
        return (
            <div>
                <h3>Mahesh Bahadur</h3>
                <Button variant="contained" color="primary" onClick={this.showComments}>
                    Show Comments
                </Button>
            </div>
        );
    }
}

export default Home;