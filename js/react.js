// Info & chat view
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
            <div className={this.props.type.toLowerCase() + 'Box'}>
                <h3>{this.props.type}</h3>
                <div className="staleMessages">{staleMessages}</div>
                <div className="freshMessages">{freshMessages}</div>
            </div>
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

// Surface view
let Surface = React.createClass({
    getInitialState : function() {
        return {
            name : 'Surface',
            writings : []
        };
    },
    render : function() {
        return (
            <div className="surface" id="surfaceView">
                <h3>{this.state.name}</h3>
                <WritingList writings={this.state.writings} />
            </div>
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
            <dl className="writingList">
                {writings}
            </dl>
        );
    }
});
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
            <span>
                <dt className="writing">
                    {this.props.author} wrote
                </dt>
                <dd>
                    <em>"{this.props.text}"</em>
                </dd>
            </span>
        );
    }
});

// window.surfaceView = ReactDOM.render(
//     <Surface submitHandler={function(e) { e.preventDefault(); }}/>,
//     document.getElementById('content')
// );

window.reactViews = {
    surface : ReactDOM.render(
        <Surface />,
        document.getElementById('surface')
    ),
    infoLog : ReactDOM.render(
        <InfoLog />,
        document.getElementById('infolog')
    )
};
