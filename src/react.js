import React from 'react';
import ReactDOM from 'react-dom';
import auth from './auth';
import api from './api';
import app from './app';

//  all class attributes to reduce duplication
let classes = {
    entireRow : "col-xs-12 col-sm-12 col-md-12 col-lg-12",
    quarterRow : "col-xs-3 col-sm-3 col-md-3 col-lg-3",
    sixthRow : "col-xs-2 col-sm-2 col-md-2 col-lg-2",
    authLabel : "col-xs-2 col-sm-2 col-md-2 col-lg-2 col-xs-push-1 col-sm-push-1 col-md-push-1 col-lg-push-1",
    authInput : "col-xs-6 col-sm-6 col-md-6 col-lg-6 col-xs-push-1 col-sm-push-1 col-md-push-1 col-lg-push-1",
    authBtn1 : "col-xs-3 col-sm-3 col-md-3 col-lg-3 col-xs-push-3 col-sm-push-3 col-md-push-3 col-lg-push-3",
    authBtn2 : "col-xs-3 col-sm-3 col-md-3 col-lg-3 col-xs-push-3 col-sm-push-3 col-md-push-3 col-lg-push-3",
    olfInputBox : "col-xs-8 col-sm-8 col-md-8 col-lg-8 col-xs-push-1 col-sm-push-1 col-md-push-1 col-lg-push-1",
    olfButton : "col-xs-2 col-sm-2 col-md-2 col-lg-2 col-xs-push-1 col-sm-push-1 col-md-push-1 col-lg-push-1",
    location : "location col-xs-6 col-sm-6 col-md-6 col-lg-6",
    locOnly : "location col-xs-10 col-sm-10 col-md-10 col-lg-10 col-xs-push-1 col-sm-push-1 col-md-push-1 col-lg-push-1",
    surface : "col-xs-6 col-sm-6 col-md-6 col-lg-6"
};

//  Command legend
let CommandLegend = React.createClass({
    render : function() {
        return (
            <center>
                <h3>Command Reference</h3>
                <dl>
                    <div className="row">
                        <span className={classes.quarterRow}>
                            <dt>←</dt>
                            <dd>Travel west</dd>
                        </span>
                        <span className={classes.quarterRow}>
                            <dt>↑</dt>
                            <dd>Travel north</dd>
                        </span>
                        <span className={classes.quarterRow}>
                            <dt>→</dt>
                            <dd>Travel east</dd>
                        </span>
                        <span className={classes.quarterRow}>
                            <dt>↓</dt>
                            <dd>Travel south</dd>
                        </span>
                    </div>
                    <div className="row">
                        <span className={classes.quarterRow}>
                            <dt>W</dt>
                            <dd>Write</dd>
                        </span>
                        <span className={classes.quarterRow}>
                            <dt>S</dt>
                            <dd>Speak</dd>
                        </span>
                        <span className={classes.quarterRow}>
                            <dt>J</dt>
                            <dd>Jump</dd>
                        </span>
                        <span className={classes.quarterRow}>
                            <dt>L</dt>
                            <dd>Look around (refresh)</dd>
                        </span>
                    </div>
                    <div className="row">
                        <span className={classes.quarterRow}>
                            <dt>Esc</dt>
                            <dd>Special command menu</dd>
                        </span>
                        <span className={classes.quarterRow}>
                            <dt>M</dt>
                            <dd>Make new location</dd>
                        </span>
                        <span className={classes.quarterRow}>
                            <dt>C</dt>
                            <dd>Connect location</dd>
                        </span>
                        <span className={classes.quarterRow}>
                            <dt>Q</dt>
                            <dd>Quit</dd>
                        </span>
                    </div>
                </dl>
            </center>
        );
    }
});

//  Authentication form
let AuthForm = React.createClass({
    statics : {
        containingElement : document.getElementById('auth')
    },
    getInitialState : function() {
        return {
            disabled : false,
            error : null
        };
    },
    setDisabled : function(bool) {
        let state = this.state;
        state.disabled = bool;
        this.setState(state);
    },
    setError : function(err) {
        let state = this.state;
        state.error = err;
        this.setState(state);
    },
    show : function() {
        AuthForm.containingElement.classList.remove('hidden');
    },
    hide : function() {
        AuthForm.containingElement.classList.add('hidden');
    },
    explore : function exploreHandler() {
        console.log("Explore mode. Launching socket.");
        this.setDisabled(true);
        this.hide();
        return api.init();
    },
    submit : function authHandler(e) {
        e.preventDefault();

        this.setDisabled(true);

        let username = e.target.username.value;

        auth.enticate({
            'username' : username,
            password : e.target.password.value,
            email : e.target.email.value,
            success : this.authSuccess(username),
            fail : this.authFailure,
            error : this.authError
        });
    },
    authSuccess : function(username) {
        let self = this;
        return function() {
            console.log("Auth successful. Launching socket.");
            self.hide();
            app.loggedInAs = username;
            return api.init();
        };
    },
    authFailure : function() {
        this.setDisabled(false);
        this.setError({
            type : "auth-fail",
            title : "Authentication Failure",
            message : "Your account credentials are incorrect or there is already an account with that username or email."
        });
    },
    authError : function() {
        this.setDisabled(false);
        this.setError({
            type : "auth-error",
            title : "Server Error",
            message : "We're sorry. Please check your account credentials and try again after a few minutes."
        });
    },
    render : function() {
        return (
            <form onSubmit={this.submit}>
                <center className="row">
                    <h1 className={classes.entireRow}>Register or Log In</h1>
                </center>
                <div className="row directions">
                    <div className={classes.entireRow}>
                        <h3>
                            To <strong>log in</strong>, supply your username and password and
                            click the "log in" button.
                        </h3>
                        <h3>
                            To <strong>register an account</strong>, simply provide an email
                            with your desired username and password.
                        </h3>
                        <h3>
                            If the username does not exist, and account by that name will be
                            created for you. If the username is already claimed, you will be
                            asked to choose another one.
                        </h3>
                        <h3>
                            You also have the option to <strong>explore ocmud</strong>. Explorers
                            aren't allowed to do all the things that creators (registered users)
                            are, but are able to travel and see the world others have made.
                        </h3>
                    </div>
                </div>
                {this.state.error &&
                    <center className={this.state.error.type}>
                        <h2>{this.state.error.title}</h2>
                        <p>{this.state.error.message}</p>
                    </center>}
                <FormElement labelClass={classes.authLabel}
                    labelText="Username"
                    inputClass={classes.authInput}
                    type="text"
                    name="username"
                    placeholder="Username"
                    disabled={this.state.disabled}
                    required={true} />
                <FormElement labelClass={classes.authLabel}
                    labelText="Password"
                    inputClass={classes.authInput}
                    type="password"
                    name="password"
                    placeholder="Password123!"
                    disabled={this.state.disabled}
                    required={true} />
                <FormElement labelClass={classes.authLabel}
                    labelText="Email*"
                    inputClass={classes.authInput}
                    type="email"
                    name="email"
                    placeholder="your@email.address"
                    disabled={this.state.disabled} />
                <center className="row">
                    <button className={classes.authBtn1}
                        disabled={this.state.disabled}
                        type="submit">Log in / Register</button>
                    <button className={classes.authBtn2}
                        disabled={this.state.disabled}
                        type="button"
                        onClick={this.explore}>Explore as a guest</button>
                </center>
                <center className="row">
                    <span className={classes.entireRow}>
                        * Required for registration, not required when logging in.
                    </span>
                </center>
            </form>
        );
    }
});
//'
let FormElement = React.createClass({
    render : function() {
        return (
            <center className="row">
                <label>
                    <span className={this.props.labelClass}>
                        {this.props.labelText}
                    </span>
                    <input className={this.props.inputClass}
                        disabled={this.props.disabled}
                        type={this.props.type} name={this.props.name}
                        placeholder={this.props.placeholder}
                        required={this.props.required || false} />
                </label>
            </center>
        );
    }
});

//  Option form
let OptionForm = React.createClass({
    statics : {
        containingElement : document.getElementById('option-form')
    },
    getInitialState : function() {
        let self = this;
        let stalin = {
            name : "Josef Stalin",
            value : "stalin"
        };

        return {
            title : "Election",
            description : "Vote for your next president.",
            name : "president",
            buttonTitle : "Vote",
            options : [stalin, stalin, stalin, stalin],
            submitHandler : function(e) {
                e.preventDefault();
                self.hide();
            }
        };
    },
    show : function() {
        OptionForm.containingElement.classList.remove('hidden');
    },
    hide : function() {
        OptionForm.containingElement.classList.add('hidden');
    },
    render : function() {
        let total = this.state.options.length;
        let perRow = 4;
        let numRows = 1;
        let rows = [];

        if(total > 4) {
            perRow = 6;
            numRows = Math.ceil(total / perRow);
        }

        for(let row = 0; row < numRows; row++) {
            let currRow = [];
            for(let option = 0; option < perRow && row*perRow + option < total; option++) {
                let index = row*perRow + option;
                let currOption = this.state.options[index];

                currRow.push(
                    <OptionElement key={index}
                        labelText={currOption.name}
                        labelClass={perRow === 6 ? classes.sixthRow : classes.quarterRow}
                        name={this.state.name || "choice"}
                        value={currOption.value} />
                );
            }

            rows.push(
                <center key={row} className="row">
                    {currRow}
                </center>
            );
        }

        return (
            <form onSubmit={this.state.submitHandler}>
                <center className="row">
                    <h1 className={classes.entireRow}>{this.state.title}</h1>
                </center>
                <center className="row">
                    <h3 className={classes.entireRow}>{this.state.description}</h3>
                </center>
                {rows}
                <center className="row">
                    <button className={classes.optButton}
                        type="submit">{this.state.buttonTitle}</button>
                </center>
            </form>
        );
    }
});
let OptionElement = React.createClass({
    statics : {
        changeHandler : function(e) {
            Array.prototype.forEach.call(
                e.target.parentNode.parentNode.children,
                function(sibling) {
                    sibling.classList.remove('chosen');
                }
            );
            e.target.parentNode.classList.add('chosen');
        }
    },
    render : function() {
        return (
            <label className={`${this.props.labelClass} option`}>
                <span>
                    {this.props.labelText}
                </span>
                <input className='hidden'
                    type='radio' name={this.props.name}
                    required='true'
                    onChange={OptionElement.changeHandler}
                    value={this.props.value} />
            </label>
        );
    }
});

//  Generic form with one text box input
let OneLineForm = React.createClass({
    statics : {
        containingElement : document.getElementById('line-form')
    },
    getInitialState : function() {
        let self = this;

        return {
            title : "Confession",
            name : "confession",
            description : "What crimes have you committed, comrade?",
            placeholder : "Espionage, grand capitalism, smoking in a non-smoking area.",
            buttonTitle : "Confess",
            submitHandler : function(e) {
                e.preventDefault();
                self.hide();
            }
        };
    },
    show : function() {
        OneLineForm.containingElement.classList.remove('hidden');
        return document.querySelector('#line-form input').focus();
    },
    hide : function() {
        return OneLineForm.containingElement.classList.add('hidden');
    },
    componentDidUpdate : function() {
        return OneLineForm.containingElement.querySelector('form').reset();
    },
    render : function() {
        return (
            <form onSubmit={this.state.submitHandler}>
                <center className="row">
                    <h1 className={classes.entireRow}>{this.state.title}</h1>
                </center>
                <center className="row">
                    <h3 className={classes.entireRow}>{this.state.description}</h3>
                </center>
                <div className="row">
                    <input className={classes.olfInputBox}
                        type="text"
                        name={this.state.name || "line"}
                        placeholder={this.state.placeholder} />
                    <button className={classes.olfButton}
                        type="submit">{this.state.buttonTitle}</button>
                </div>
            </form>
        );
    }
});

//  Location view
const directionNames = {
    'n' : 'north',
    'e' : 'east',
    'w' : 'west',
    's' : 'south'
};
let Location = React.createClass({
    getInitialState : function() {
        return {
            name : "Limbo",
            description : "Almost there, but not quite.",
            exits : ['n', 'e', 'w', 's'],
            surface : null,
            writings : null
        };
    },
    reset : function() {
        this.state = this.getInitialState();
        this.forceUpdate();
    },
    renderExits : function() {
        let exits = this.state.exits.map(function(d) {
            return directionNames[d];
        });
        let result;

        if(exits.length === 0) {
            result = '';
        } else if(exits.length === 1) {
            result = exits[0];
        } else if(exits.length === 2) {
            result = exits.join(' and ');
        } else {
            result = `${exits.slice(0, exits.length - 1).join(', ')}, and ${exits[exits.length - 1]}`;
        }

        return {
            num : exits.length,
            directions : result
        };
    },
    render : function() {
        let exits = this.renderExits();
        let surfaceExists = this.state.surface !== null;

        return (
            <div>
                <div className="row">
                    <center className={classes[surfaceExists ? 'location' : 'locOnly']}>
                        <h1>{this.state.name}</h1>
                        <h3>{this.state.description}</h3>
                        <h3>There are {exits.num  > 0 ? '' : 'no '}exits{exits.num > 0 ? ' to the ' : ''}<strong>{exits.directions}</strong> here.</h3>
                        {this.state.surface && <h4>There is a {this.state.surface} here.</h4>}
                    </center>
                {surfaceExists &&
                    <Surface
                        name={this.state.surface}
                        writings={this.state.writings || []}
                        className={classes.surface} />}
                </div>
            </div>
        );
    }
});

//  Surface view
let Surface = React.createClass({
    render : function() {
        return (
            <center className={`surface ${this.props.className}`} id="surfaceView">
                <h2>{this.props.name ? `A ${this.props.name}` : 'Nothing'}</h2>
                <WritingList writings={this.props.writings} />
            </center>
        );
    }
});
let WritingList = React.createClass({
    render : function() {
        let writings = this.props.writings.map(function(writing, index) {
            return (
                <Writing key={index} author={writing.author} text={writing.message} />
            );
        });
        return (
            <ul className="writingList">
                {writings}
            </ul>
        );
    }
});

//  convert this into a generic form that is customizable by setting its state
let WriteForm = React.createClass({
    render : function() {
        return (
            <form className="writeForm" onSubmit={this.props.onSubmit}>
                <label>
                    Message: <input name="message" placeholder="A message for passerby." />
                </label>
                <input type="submit" value="Write" />
            </form>
        );
    }
});
let Writing = React.createClass({
    render : function() {
        return (
            <li className="writing">
                "<em>{this.props.text}</em>", written by <strong>{this.props.author}</strong>.
            </li>
        );
    }
});

//  Info & chat view
let Log = React.createClass({
    componentWillUpdate : function() {
        let domNode = ReactDOM.findDOMNode(this);
        this.shouldScroll = Array.prototype.map.call(domNode.children, function(n, i) {
            return Math.abs(n.scrollTop + n.offsetHeight - n.scrollHeight) <= 1;
        });
    },
    componentDidUpdate : function() {
        let domNode = ReactDOM.findDOMNode(this);
        this.shouldScroll.forEach(function(shouldUpdate, index) {
            if(shouldUpdate) {
                let currNode = domNode.children[index];
                currNode.scrollTop = currNode.scrollHeight;
            }
        });
    },
    render : function() {
        let self = this;
        let staleMessages = this.props.messages.stale.map(function(m, i) {
            return self.props.formatMessage('stale', m, i);
        });
        let freshMessages = this.props.messages.fresh.map(function(m, i) {
            return self.props.formatMessage('fresh', m, i);
        });

        return (
            <center className={this.props.type.toLowerCase() + 'Box'}>
                <h3>{this.props.type}</h3>
                <div className="staleMessages">
                    <h4>Older messages</h4>
                    {staleMessages}
                </div>
                <div className="freshMessages">
                    <h4>New messages</h4>
                    {freshMessages}
                </div>
            </center>
        );
    }
});
let InfoLog = React.createClass({
    statics : {
        formatMessage : function(type, msg, index) {
            return (
                <div key={index} className={type + 'Message'}>
                    {`[${msg.type}] ${msg.message}`}
                </div>
            );
        }
    },
    getInitialState : function() {
        return {
            messages : {
                stale : [],
                fresh : [
                    {
                        type : 'info',
                        message : "This is your info log. There are many others like it, but this one's yours."
                    }
                ]
            }
        };
    },
    tick : function() {
        let length = this.state.messages.fresh.length;

        if(length > 0) {
            for(let count = 0; count < length; count++) {
                let currMsg = this.state.messages.fresh.shift();
                this.state.messages.stale.push(currMsg);
            }
        }

        this.forceUpdate();
    },
    add : function(msg) {
        this.state.messages.fresh.push(msg);
        this.forceUpdate();
    },
    render : function() {
        return (
            <Log type="Info" messages={this.state.messages} formatMessage={InfoLog.formatMessage} />
        );
    }
});
let ChatLog = React.createClass({
    statics : {
        formatMessage : function(type, msg, index) {
            return (
                <div key={index} className={type + 'Message'}>
                    {`<${msg.from}> ${msg.message}`}
                </div>
            );
        }
    },
    getInitialState : function() {
        return {
            messages : {
                stale : [],
                fresh : [
                    {
                        from : 'ocmud',
                        message : "Speak freely and don't complain if others do the same."
                    }
                ]
            }
        };
    },
    tick : function() {
        let length = this.state.messages.fresh.length;

        if(length > 0) {
            for(let count = 0; count < length; count++) {
                let currMsg = this.state.messages.fresh.shift();
                this.state.messages.stale.push(currMsg);
            }
        }

        this.forceUpdate();
    },
    add : function(msg) {
        this.state.messages.fresh.push(msg);
        this.forceUpdate();
    },
    render : function() {
        return (
            <Log type="Chat" messages={this.state.messages} formatMessage={ChatLog.formatMessage} />
        );
    }
});

export default {
    form : ReactDOM.render(
        <OneLineForm />,
        OneLineForm.containingElement
    ),
    authForm : ReactDOM.render(
        <AuthForm />,
        AuthForm.containingElement
    ),
    optionForm : ReactDOM.render(
        <OptionForm />,
        OptionForm.containingElement
    ),
    location : ReactDOM.render(
        <Location />,
        document.getElementById('location')
    ),
    infoLog : ReactDOM.render(
        <InfoLog />,
        document.getElementById('infoLog')
    ),
    chatLog : ReactDOM.render(
        <ChatLog />,
        document.getElementById('chatLog')
    ),
    commandLegend : ReactDOM.render(
        <CommandLegend />,
        document.getElementById('commands')
    )
};
