var React = require('react');
var classNames = require('classnames');
var cookie = require('cookie');
var xhr = require('xhr');

var Avatar = require('../avatar/avatar.jsx');
var Dropdown = require('./dropdown.jsx');
var Input = require('../forms/input.jsx');
var Login = require('../login/login.jsx');
var Session = require('../../mixins/session.jsx');

require('./navigation.scss');

module.exports = React.createClass({
    mixins: [
        Session
    ],
    getInitialState: function () {
        return {
            'loginOpen': false,
            'accountNavOpen': false
        };
    },
    handleLoginClick: function (e) {
        e.preventDefault();
        this.setState({'loginOpen': true});
    },
    closeLogin: function () {
        this.setState({'loginOpen': false});
    },
    handleLogIn: function (formData) {
        var csrftoken = cookie.parse(document.cookie)['scratchcsrftoken'];
        formData['csrftoken'] = csrftoken;
        xhr({
            method: 'post',
            uri: '/accounts/login/',
            json: formData,
            headers: {
                'X-CSRFToken': csrftoken,
                'X-Requested-With': 'XMLHttpRequest'
            }
        }, function () {
            window.refreshSession();
        });
    },
    handleLogOut: function () {
        xhr({
            uri: '/accounts/logout/'
        }, function () {
            window.refreshSession();
        });
    },
    handleClickAccountNav: function () {
        this.setState({'accountNavOpen': true});
    },
    closeAccountNav: function () {
        this.setState({'accountNavOpen': false});
    },
    render: function () {
        var loggedIn = !!this.state.session.user;
        var classes = classNames({
            'inner': true,
            'logged-in': this.state.loggedIn
        });
        return (
            <div className={classes}>
                <ul>
                    <li className="logo"><a href="/"></a></li>
                    
                    <li className="link"><a href="/projects/editor">Create</a></li>
                    <li className="link"><a href="/explore">Explore</a></li>
                    <li className="link"><a href="/discuss">Discuss</a></li>
                    <li className="link"><a href="/about">About</a></li>
                    <li className="link"><a href="/help">Help</a></li>

                    <li className="search">
                        <form action="/search/google_results" method="get">
                            <Input type="submit" value="" />
                            <Input type="text" placeholder="Search" name="q" />
                            <Input type="hidden" name="date" value="anytime" />
                            <Input type="hidden" name="sort_by" value="datetime_shared" />
                        </form>
                    </li>
                    {loggedIn ? [
                        <li className="link right messages" key="messages">
                            <a href="/messages/" title="Messages">Messages</a>
                        </li>,
                        <li className="link right mystuff" key="mystuff">
                            <a href="/mystuff/" title="My Stuff">My Stuff</a>
                        </li>,
                        <li className="link right account-nav" key="account-nav">
                            <a className="userInfo" href="#" onClick={this.handleClickAccountNav}>
                                <Avatar
                                    userId={this.state.session.user.id}
                                    version={this.state.session.user.avatarVersion}
                                    size={24} />
                                {this.state.session.user.username}
                            </a>
                            <Dropdown
                                    as="ul"
                                    isOpen={this.state.accountNavOpen}
                                    onRequestClose={this.closeAccountNav}>
                                <li><a href="/users/raimondious/">Profile</a></li>
                                <li><a href="/mystuff/">My Stuff</a></li>
                                <li><a href="/accounts/settings/">Account settings</a></li>
                                <li className="divider">
                                    <a href="#" onClick={this.handleLogOut}>Sign out</a>
                                </li>
                            </Dropdown>
                        </li>
                    ] : [
                        <li className="link right join" key="join"><a href="/join">Join Scratch</a></li>,
                        <li className="link right" key="login">
                            <a href="#" onClick={this.handleLoginClick}>Sign In</a>
                            <Dropdown
                                    className="login-dropdown with-arrow"
                                    isOpen={this.state.loginOpen}
                                    onRequestClose={this.closeLogin}>
                                <Login onLogIn={this.handleLogIn} />
                            </Dropdown>
                        </li>
                    ]}
                </ul>
            </div>
        );
    }
});
