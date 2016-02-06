//  Location view
let directionNames = {
    'n' : 'north',
    'e' : 'east',
    'w' : 'west',
    's' : 'south'
};

let Location = React.createClass({
    classes : {
        main : "location col-xs-10 col-xs-push-1 col-sm-10 col-sm-push-1 col-md-10 col-md-push-1",
        surface : "col-xs-6 col-xs-push-3 col-sm-6 col-sm-push-3 col-md-6 col-md-push-3"
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
    hasExit : function(direction) {
        return this.state.exits.indexOf(direction) >= 0;
    },
    render : function() {
        let exits = this.state.exits.map(function(d) {
            return directionNames[d];
        });

        if(exits.length === 1) {
            exits = exits[0];
        } else if(exits.length === 2) {
            exits = exits.join(' and ')
        } else {
            exits = `${exits.slice(0, exits.length - 1).join(', ')}, and ${exits[exits.length - 1]}`;
        }

        return (
            <div>
                <div className="row">
                    <center className={this.classes.main}>
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
                        className={this.classes.surface} />
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
                <div className="staleMessages">{staleMessages}</div>
                <div className="freshMessages">{freshMessages}</div>
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
