import React, { Component } from 'react';
import crypto from 'crypto';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import Redirect from './Redirect.jsx';

export default class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            link: null
        }
    }

    onChangeHandler = (e) => {
        let hash = crypto.createHash('sha1');
        hash.update(e.currentTarget.value);
        let miniLink = hash.digest('hex');
        this.setState({ link: miniLink });
    }

    render() {
        return (
            <Router>
                <div>
                    <input onChange={this.onChangeHandler} type='text'></input>
                    {
                        this.state.link && 
                        <div>
                            SHORT LINK: { this.state.link }
                        </div>
                    }
                </div>
                <Link to='/privacy-policy'>PRIVACY POLICY</Link>
                <Route path='/:url' component={Redirect} />              
            </Router>
        )
    }
}