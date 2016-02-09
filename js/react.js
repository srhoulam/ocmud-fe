'use strict';

//  all class attributes to reduce duplication
let classes = {
    entireRow : "col-xs-12 col-sm-12 col-md-12",
    authLabel : "col-xs-2 col-sm-2 col-md-2 col-xs-push-1 col-sm-push-1 col-md-push-1",
    authInput : "col-xs-6 col-sm-6 col-md-6 col-xs-push-1 col-sm-push-1 col-md-push-1",
    authBtn1 : "col-xs-3 col-sm-3 col-md-3 col-xs-push-3 col-sm-push-3 col-md-push-3",
    authBtn2 : "col-xs-3 col-sm-3 col-md-3 col-xs-push-3 col-sm-push-3 col-md-push-3",
    olfInputBox : "col-xs-8 col-sm-8 col-md-8 col-xs-push-1 col-sm-push-1 col-md-push-1",
    olfButton : "col-xs-2 col-sm-2 col-md-2 col-xs-push-1 col-sm-push-1 col-md-push-1",
    location : "location col-xs-10 col-xs-push-1 col-sm-10 col-sm-push-1 col-md-10 col-md-push-1",
    surface : "col-xs-6 col-xs-push-3 col-sm-6 col-sm-push-3 col-md-6 col-md-push-3"
};

//  Authentication form
let AuthForm = React.createClass({
    statics : {
        containingElement : document.getElementById('auth')
    },
    getInitialState : function() {
        return {
            disabled : false
        };
    },
    setDisabled : function(bool) {
        this.state.disabled = bool;
    },
    show : function() {
        AuthForm.containingElement.classList.remove('hidden');
    },
    hide : function() {
        AuthForm.containingElement.classList.add('hidden');
    },
    explore : function exploreHandler() {
        console.log("Explore mode. Launching socket.");

        return initApi();
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
            return initApi();
        };
    },
    authFailure : function() {
        this.setDisabled(false);
        console.log("Auth failed. Try again.");
    },
    authError : function() {},
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
                <FormElement labelClass={classes.authLabel}
                    labelText="Username"
                    inputClass={classes.authInput}
                    type="text"
                    name="username"
                    placeholder="Username"
                    disabled={this.state.disabled} />
                <FormElement labelClass={classes.authLabel}
                    labelText="Password"
                    inputClass={classes.authInput}
                    type="password"
                    name="password"
                    placeholder="Password123!"
                    disabled={this.state.disabled} />
                <FormElement labelClass={classes.authLabel}
                    labelText="Email"
                    inputClass={classes.authInput}
                    type="email"
                    name="email"
                    placeholder="your@email.address"
                    disabled={this.state.disabled} />
                <center className="row">
                    <button className={classes.authBtn1}
                        disabled={this.state.disabled}
                        type="submit">Log in</button>
                    <button className={classes.authBtn2}
                        disabled={this.state.disabled}
                        type="button"
                        onClick={this.explore}>Explore</button>
                </center>
            </form>
        );
    }
});
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
                        placeholder={this.props.placeholder} />
                </label>
            </center>
        );
    }
});

//  Generic form with one text box input
let OneLineForm = React.createClass({
    statics : {
        containingElement : document.getElementById('form')
    },
    getInitialState : function() {
        return {
            title : "Untitled",
            description : "This form has not been properly prepared.",
            placeholder : "What you write here will be completely ignored",
            buttonTitle : "Close",
            submitHandler : function(e) {
                e.preventDefault();
                OneLineForm.containingElement.classList.add('hidden');
            }
        };
    },
    show : function() {
        OneLineForm.containingElement.classList.remove('hidden');
    },
    hide : function() {
        OneLineForm.containingElement.classList.add('hidden');
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

        if(exits.length === 1) {
            result = exits[0];
        } else if(exits.length === 2) {
            result = exits.join(' and ');
        } else {
            result = `${exits.slice(0, exits.length - 1).join(', ')}, and ${exits[exits.length - 1]}`;
        }

        return result;
    },
    render : function() {
        let exits = this.renderExits();

        return (
            <div>
                <div className="row">
                    <center className={classes.location}>
                        <h1>{this.state.name}</h1>
                        <h3>{this.state.description}</h3>
                        <h3>There are exits to the <strong>{exits}</strong> here.</h3>
                        {this.state.surface && <h4>There is a {this.state.surface} here.</h4>}
                    </center>
                </div>
                {this.state.writings && this.state.writings.length > 0 &&
                <div className="row">
                    <Surface
                        name={this.state.surface}
                        writings={this.state.writings}
                        className={classes.surface} />
                </div>}
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
            for(var count = 0; count < length; count++) {
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
            for(var count = 0; count < length; count++) {
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

window.reactViews = {
    form : ReactDOM.render(
        <OneLineForm />,
        OneLineForm.containingElement
    ),
    authForm : ReactDOM.render(
        <AuthForm />,
        AuthForm.containingElement
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
    )
};
