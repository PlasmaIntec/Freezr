import React, { Component } from 'react';
import crypto from 'crypto';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import Redirect from './Redirect.jsx';

export default class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fullLink: '',
            miniLink: '',
            links: []
        }
    }

    componentDidMount() {
        this.updateLinks();
    }

    updateLinks = () => {
        fetch('/links')
        .then(res => res.json())
        .then(links => {
            console.log('updateLinks:', links); 
            this.setState({ links })
        })
    }

    onChangeHandler = (e) => {
        let fullLink = e.currentTarget.value;
        this.setState({ fullLink });
    }

    onClickHandler = (e) => {
        e.preventDefault();
        let hash = crypto.createHash('sha1');
        let fullLink = this.state.fullLink;
        if (fullLink.match(/^https?:\/\/.+\./i)) {
            hash.update(fullLink);
        } else {
            fullLink = 'http://' + fullLink;
            hash.update(fullLink);
            this.setState({ fullLink });
        }        
        let miniLink = hash.digest('hex').slice(0, 5);
        this.setState({ miniLink });
        fetch('/links', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                full: fullLink,
                short: miniLink
            })
        })
        .then(() => this.updateLinks())
        .catch(err => console.log('error:', err))
    }

    render() {
        return (
            <Router>
                <div>
                    <input onChange={this.onChangeHandler} type='text' value={this.state.fullLink}></input>
                    <button onClick={this.onClickHandler}>GENERATE MINIURL</button>
                    {
                        this.state.miniLink && 
                        <div>
                            SHORT LINK: { this.state.miniLink }
                        </div>
                    }
                </div>
                <Link to='/privacy-policy'>PRIVACY POLICY</Link>
                <Route path='/:url' component={Redirect} /> 
                {
                    this.state.links.length && 
                    <table>
                        <tr>
                            <th>Full Link</th>
                            <th>Short Link</th>
                        </tr>
                        {
                            this.state.links.map(link => (
                                <tr>
                                    <td>{link.full}</td>
                                    <td><a href={`/${link.short}`}>{link.short}</a></td>
                                </tr>
                            ))
                        }
                    </table>
                }             
                {
                    !this.state.links.length &&
                    <div>NO LINKS</div>
                }
            </Router>
        )
    }
}