'use strict';

//  Generic form with one text box input

let OneLineForm = React.createClass({
    statics : {
        containingElement : document.getElementById('form'),
        classes : {
            entireRow : "col-xs-12 col-sm-12 col-md-12",
            inputBox : "col-xs-8 col-sm-8 col-md-8 col-xs-push-1 col-sm-push-1 col-md-push-1",
            button : "col-xs-2 col-sm-2 col-md-2 col-xs-push-1 col-sm-push-1 col-md-push-1"
        }
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
    render : function() {
        return (
            <form onSubmit={this.state.submitHandler}>
                <center className="row">
                    <h1 className={OneLineForm.classes.entireRow}>{this.state.title}</h1>
                </center>
                <center className="row">
                    <h3 className={OneLineForm.classes.entireRow}>{this.state.description}</h3>
                </center>
                <div className="row">
                    <input className={OneLineForm.classes.inputBox}
                        type="text"
                        placeholder={this.state.placeholder} />
                    <button className={OneLineForm.classes.button}
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
    statics : {
        classes : {
            main : "location col-xs-10 col-xs-push-1 col-sm-10 col-sm-push-1 col-md-10 col-md-push-1",
            surface : "col-xs-6 col-xs-push-3 col-sm-6 col-sm-push-3 col-md-6 col-md-push-3"
        }
    },
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
                    <center className={Location.classes.main}>
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
                        className={Location.classes.surface} />
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
    location : ReactDOM.render(
        <Location />,
        document.getElementById('location')
    ),
    // surface : ReactDOM.render(
    //     <Surface />,
    //     document.getElementById('surface')
    // ),
    infoLog : ReactDOM.render(
        <InfoLog />,
        document.getElementById('infoLog')
    ),
    chatLog : ReactDOM.render(
        <ChatLog />,
        document.getElementById('chatLog')
    )
};
