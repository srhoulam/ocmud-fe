'use strict';

//  all class attributes to reduce duplication

var classes = {
    entireRow: "col-xs-12 col-sm-12 col-md-12 col-lg-12",
    quarterRow: "col-xs-3 col-sm-3 col-md-3 col-lg-3",
    sixthRow: "col-xs-2 col-sm-2 col-md-2 col-lg-2",
    authLabel: "col-xs-2 col-sm-2 col-md-2 col-lg-2 col-xs-push-1 col-sm-push-1 col-md-push-1 col-lg-push-1",
    authInput: "col-xs-6 col-sm-6 col-md-6 col-lg-6 col-xs-push-1 col-sm-push-1 col-md-push-1 col-lg-push-1",
    authBtn1: "col-xs-3 col-sm-3 col-md-3 col-lg-3 col-xs-push-3 col-sm-push-3 col-md-push-3 col-lg-push-3",
    authBtn2: "col-xs-3 col-sm-3 col-md-3 col-lg-3 col-xs-push-3 col-sm-push-3 col-md-push-3 col-lg-push-3",
    olfInputBox: "col-xs-8 col-sm-8 col-md-8 col-lg-8 col-xs-push-1 col-sm-push-1 col-md-push-1 col-lg-push-1",
    olfButton: "col-xs-2 col-sm-2 col-md-2 col-lg-2 col-xs-push-1 col-sm-push-1 col-md-push-1 col-lg-push-1",
    location: "location col-xs-6 col-sm-6 col-md-6 col-lg-6",
    locOnly: "location col-xs-10 col-sm-10 col-md-10 col-lg-10 col-xs-push-1 col-sm-push-1 col-md-push-1 col-lg-push-1",
    surface: "col-xs-6 col-sm-6 col-md-6 col-lg-6"
};

//  Command display
var CommandDisplay = React.createClass({
    displayName: "CommandDisplay",

    render: function render() {
        return React.createElement(
            "center",
            null,
            React.createElement(
                "h3",
                null,
                "Command Reference"
            ),
            React.createElement(
                "dl",
                null,
                React.createElement(
                    "div",
                    { className: "row" },
                    React.createElement(
                        "span",
                        { className: classes.quarterRow },
                        React.createElement(
                            "dt",
                            null,
                            "←"
                        ),
                        React.createElement(
                            "dd",
                            null,
                            "Travel west"
                        )
                    ),
                    React.createElement(
                        "span",
                        { className: classes.quarterRow },
                        React.createElement(
                            "dt",
                            null,
                            "↑"
                        ),
                        React.createElement(
                            "dd",
                            null,
                            "Travel north"
                        )
                    ),
                    React.createElement(
                        "span",
                        { className: classes.quarterRow },
                        React.createElement(
                            "dt",
                            null,
                            "→"
                        ),
                        React.createElement(
                            "dd",
                            null,
                            "Travel east"
                        )
                    ),
                    React.createElement(
                        "span",
                        { className: classes.quarterRow },
                        React.createElement(
                            "dt",
                            null,
                            "↓"
                        ),
                        React.createElement(
                            "dd",
                            null,
                            "Travel south"
                        )
                    )
                ),
                React.createElement(
                    "div",
                    { className: "row" },
                    React.createElement(
                        "span",
                        { className: classes.quarterRow },
                        React.createElement(
                            "dt",
                            null,
                            "W"
                        ),
                        React.createElement(
                            "dd",
                            null,
                            "Write"
                        )
                    ),
                    React.createElement(
                        "span",
                        { className: classes.quarterRow },
                        React.createElement(
                            "dt",
                            null,
                            "S"
                        ),
                        React.createElement(
                            "dd",
                            null,
                            "Speak"
                        )
                    ),
                    React.createElement(
                        "span",
                        { className: classes.quarterRow },
                        React.createElement(
                            "dt",
                            null,
                            "J"
                        ),
                        React.createElement(
                            "dd",
                            null,
                            "Jump"
                        )
                    ),
                    React.createElement(
                        "span",
                        { className: classes.quarterRow },
                        React.createElement(
                            "dt",
                            null,
                            "L"
                        ),
                        React.createElement(
                            "dd",
                            null,
                            "Look around (refresh)"
                        )
                    )
                ),
                React.createElement(
                    "div",
                    { className: "row" },
                    React.createElement(
                        "span",
                        { className: classes.quarterRow },
                        React.createElement(
                            "dt",
                            null,
                            "Esc"
                        ),
                        React.createElement(
                            "dd",
                            null,
                            "Special command menu"
                        )
                    ),
                    React.createElement(
                        "span",
                        { className: classes.quarterRow },
                        React.createElement(
                            "dt",
                            null,
                            "M"
                        ),
                        React.createElement(
                            "dd",
                            null,
                            "Create new location"
                        )
                    ),
                    React.createElement(
                        "span",
                        { className: classes.quarterRow },
                        React.createElement(
                            "dt",
                            null,
                            "C"
                        ),
                        React.createElement(
                            "dd",
                            null,
                            "Connect location"
                        )
                    ),
                    React.createElement(
                        "span",
                        { className: classes.quarterRow },
                        React.createElement(
                            "dt",
                            null,
                            "Q"
                        ),
                        React.createElement(
                            "dd",
                            null,
                            "Quit"
                        )
                    )
                )
            )
        );
    }
});

//  Authentication form
var AuthForm = React.createClass({
    displayName: "AuthForm",

    statics: {
        containingElement: document.getElementById('auth')
    },
    getInitialState: function getInitialState() {
        return {
            disabled: false
        };
    },
    setDisabled: function setDisabled(bool) {
        this.state.disabled = bool;
    },
    show: function show() {
        AuthForm.containingElement.classList.remove('hidden');
    },
    hide: function hide() {
        AuthForm.containingElement.classList.add('hidden');
    },
    explore: function exploreHandler() {
        console.log("Explore mode. Launching socket.");
        this.setDisabled(true);
        this.hide();
        return initApi();
    },
    submit: function authHandler(e) {
        e.preventDefault();

        this.setDisabled(true);

        var username = e.target.username.value;

        auth.enticate({
            'username': username,
            password: e.target.password.value,
            email: e.target.email.value,
            success: this.authSuccess(username),
            fail: this.authFailure,
            error: this.authError
        });
    },
    authSuccess: function authSuccess(username) {
        var self = this;
        return function () {
            console.log("Auth successful. Launching socket.");
            self.hide();
            app.loggedInAs = username;
            return initApi();
        };
    },
    authFailure: function authFailure() {
        this.setDisabled(false);
        console.log("Incorrect credentials or occupied username and/or email.");
    },
    authError: function authError() {
        this.setDisabled(false);
        console.log("Server error. Please try again after a few minutes.");
    },
    render: function render() {
        return React.createElement(
            "form",
            { onSubmit: this.submit },
            React.createElement(
                "center",
                { className: "row" },
                React.createElement(
                    "h1",
                    { className: classes.entireRow },
                    "Register or Log In"
                )
            ),
            React.createElement(
                "div",
                { className: "row directions" },
                React.createElement(
                    "div",
                    { className: classes.entireRow },
                    React.createElement(
                        "h3",
                        null,
                        "To ",
                        React.createElement(
                            "strong",
                            null,
                            "log in"
                        ),
                        ", supply your username and password and click the \"log in\" button."
                    ),
                    React.createElement(
                        "h3",
                        null,
                        "To ",
                        React.createElement(
                            "strong",
                            null,
                            "register an account"
                        ),
                        ", simply provide an email with your desired username and password."
                    ),
                    React.createElement(
                        "h3",
                        null,
                        "If the username does not exist, and account by that name will be created for you. If the username is already claimed, you will be asked to choose another one."
                    ),
                    React.createElement(
                        "h3",
                        null,
                        "You also have the option to ",
                        React.createElement(
                            "strong",
                            null,
                            "explore ocmud"
                        ),
                        ". Explorers aren't allowed to do all the things that creators (registered users) are, but are able to travel and see the world others have made."
                    )
                )
            ),
            React.createElement(FormElement, { labelClass: classes.authLabel,
                labelText: "Username",
                inputClass: classes.authInput,
                type: "text",
                name: "username",
                placeholder: "Username",
                disabled: this.state.disabled,
                required: "true" }),
            React.createElement(FormElement, { labelClass: classes.authLabel,
                labelText: "Password",
                inputClass: classes.authInput,
                type: "password",
                name: "password",
                placeholder: "Password123!",
                disabled: this.state.disabled,
                required: "true" }),
            React.createElement(FormElement, { labelClass: classes.authLabel,
                labelText: "Email*",
                inputClass: classes.authInput,
                type: "email",
                name: "email",
                placeholder: "your@email.address",
                disabled: this.state.disabled }),
            React.createElement(
                "center",
                { className: "row" },
                React.createElement(
                    "button",
                    { className: classes.authBtn1,
                        disabled: this.state.disabled,
                        type: "submit" },
                    "Log in / Register"
                ),
                React.createElement(
                    "button",
                    { className: classes.authBtn2,
                        disabled: this.state.disabled,
                        type: "button",
                        onClick: this.explore },
                    "Explore as a guest"
                )
            ),
            React.createElement(
                "center",
                { className: "row" },
                React.createElement(
                    "span",
                    { className: classes.entireRow },
                    "* Required for registration, not required when logging in."
                )
            )
        );
    }
});
//'
var FormElement = React.createClass({
    displayName: "FormElement",

    render: function render() {
        return React.createElement(
            "center",
            { className: "row" },
            React.createElement(
                "label",
                null,
                React.createElement(
                    "span",
                    { className: this.props.labelClass },
                    this.props.labelText
                ),
                React.createElement("input", { className: this.props.inputClass,
                    disabled: this.props.disabled,
                    type: this.props.type, name: this.props.name,
                    placeholder: this.props.placeholder,
                    required: this.props.required || 'false' })
            )
        );
    }
});

//  Option form
var OptionForm = React.createClass({
    displayName: "OptionForm",

    statics: {
        containingElement: document.getElementById('option-form')
    },
    getInitialState: function getInitialState() {
        var self = this;

        return {
            title: "Election",
            description: "Vote for your next president.",
            name: 'president',
            buttonTitle: "Vote",
            options: [{
                name: "Josef Stalin",
                value: "stalin"
            }],
            submitHandler: function submitHandler(e) {
                e.preventDefault();
                self.hide();
            }
        };
    },
    show: function show() {
        OptionForm.containingElement.classList.remove('hidden');
    },
    hide: function hide() {
        OptionForm.containingElement.classList.add('hidden');
    },
    render: function render() {
        var total = this.state.options.length;
        var perRow = 4;
        var numRows = 1;
        var rows = [];

        if (total > 4) {
            perRow = 6;
            numRows = Math.ceil(total / perRow);
        }

        for (var row = 0; row < numRows; row++) {
            var currRow = [];
            for (var option = 0; option < perRow && row * perRow + option < total; option++) {
                var index = row * perRow + option;
                var currOption = this.state.options[index];

                currRow.push(React.createElement(OptionElement, { key: index,
                    labelText: currOption.name,
                    labelClass: perRow === 6 ? classes.sixthRow : classes.quarterRow,
                    name: this.state.name,
                    value: currOption.value }));
            }

            rows.push(React.createElement(
                "center",
                { key: row, className: "row" },
                currRow
            ));
        }

        return React.createElement(
            "form",
            { onSubmit: this.state.submitHandler },
            React.createElement(
                "center",
                { className: "row" },
                React.createElement(
                    "h1",
                    { className: classes.entireRow },
                    this.state.title
                )
            ),
            React.createElement(
                "center",
                { className: "row" },
                React.createElement(
                    "h3",
                    { className: classes.entireRow },
                    this.state.description
                )
            ),
            rows,
            React.createElement(
                "center",
                { className: "row" },
                React.createElement(
                    "button",
                    { className: classes.optButton,
                        type: "submit" },
                    this.state.buttonTitle
                )
            )
        );
    }
});
var OptionElement = React.createClass({
    displayName: "OptionElement",

    statics: {
        changeHandler: function changeHandler(e) {
            Array.prototype.forEach.call(e.target.parentNode.parentNode.children, function (sibling) {
                sibling.classList.remove('chosen');
            });
            e.target.parentNode.classList.add('chosen');
        }
    },
    render: function render() {
        return React.createElement(
            "label",
            { className: this.props.labelClass + " option" },
            React.createElement(
                "span",
                null,
                this.props.labelText
            ),
            React.createElement("input", { className: "hidden",
                type: "radio", name: this.props.name,
                required: "true",
                onChange: OptionElement.changeHandler,
                value: this.props.value })
        );
    }
});

//  Generic form with one text box input
var OneLineForm = React.createClass({
    displayName: "OneLineForm",

    statics: {
        containingElement: document.getElementById('line-form')
    },
    getInitialState: function getInitialState() {
        var self = this;

        return {
            title: "Untitled",
            description: "This form has not been properly prepared.",
            placeholder: "What you write here will be completely ignored",
            buttonTitle: "Close",
            submitHandler: function submitHandler(e) {
                e.preventDefault();
                self.hide();
            }
        };
    },
    show: function show() {
        OneLineForm.containingElement.classList.remove('hidden');
    },
    hide: function hide() {
        OneLineForm.containingElement.classList.add('hidden');
    },
    render: function render() {
        return React.createElement(
            "form",
            { onSubmit: this.state.submitHandler },
            React.createElement(
                "center",
                { className: "row" },
                React.createElement(
                    "h1",
                    { className: classes.entireRow },
                    this.state.title
                )
            ),
            React.createElement(
                "center",
                { className: "row" },
                React.createElement(
                    "h3",
                    { className: classes.entireRow },
                    this.state.description
                )
            ),
            React.createElement(
                "div",
                { className: "row" },
                React.createElement("input", { className: classes.olfInputBox,
                    type: "text",
                    placeholder: this.state.placeholder }),
                React.createElement(
                    "button",
                    { className: classes.olfButton,
                        type: "submit" },
                    this.state.buttonTitle
                )
            )
        );
    }
});

//  Location view
var directionNames = {
    'n': 'north',
    'e': 'east',
    'w': 'west',
    's': 'south'
};
var Location = React.createClass({
    displayName: "Location",

    getInitialState: function getInitialState() {
        return {
            name: "Limbo",
            description: "Almost there, but not quite.",
            exits: ['n', 'e', 'w', 's'],
            surface: null,
            writings: null
        };
    },
    reset: function reset() {
        this.state = this.getInitialState();
        this.forceUpdate();
    },
    renderExits: function renderExits() {
        var exits = this.state.exits.map(function (d) {
            return directionNames[d];
        });
        var result = undefined;

        if (exits.length === 1) {
            result = exits[0];
        } else if (exits.length === 2) {
            result = exits.join(' and ');
        } else {
            result = exits.slice(0, exits.length - 1).join(', ') + ", and " + exits[exits.length - 1];
        }

        return result;
    },
    render: function render() {
        var exits = this.renderExits();
        var surfaceExists = this.state.writings && this.state.writings.length > 0;

        return React.createElement(
            "div",
            null,
            React.createElement(
                "div",
                { className: "row" },
                React.createElement(
                    "center",
                    { className: classes[surfaceExists ? 'location' : 'locOnly'] },
                    React.createElement(
                        "h1",
                        null,
                        this.state.name
                    ),
                    React.createElement(
                        "h3",
                        null,
                        this.state.description
                    ),
                    React.createElement(
                        "h3",
                        null,
                        "There are exits to the ",
                        React.createElement(
                            "strong",
                            null,
                            exits
                        ),
                        " here."
                    ),
                    this.state.surface && React.createElement(
                        "h4",
                        null,
                        "There is a ",
                        this.state.surface,
                        " here."
                    )
                ),
                surfaceExists && React.createElement(Surface, {
                    name: this.state.surface,
                    writings: this.state.writings,
                    className: classes.surface })
            )
        );
    }
});

//  Surface view
var Surface = React.createClass({
    displayName: "Surface",

    render: function render() {
        return React.createElement(
            "center",
            { className: "surface " + this.props.className, id: "surfaceView" },
            React.createElement(
                "h2",
                null,
                this.props.name ? "A " + this.props.name : 'Nothing'
            ),
            React.createElement(WritingList, { writings: this.props.writings })
        );
    }
});
var WritingList = React.createClass({
    displayName: "WritingList",

    render: function render() {
        var writings = this.props.writings.map(function (writing, index) {
            return React.createElement(Writing, { key: index, author: writing.author, text: writing.message });
        });
        return React.createElement(
            "ul",
            { className: "writingList" },
            writings
        );
    }
});

//  convert this into a generic form that is customizable by setting its state
var WriteForm = React.createClass({
    displayName: "WriteForm",

    render: function render() {
        return React.createElement(
            "form",
            { className: "writeForm", onSubmit: this.props.onSubmit },
            React.createElement(
                "label",
                null,
                "Message: ",
                React.createElement("input", { name: "message", placeholder: "A message for passerby." })
            ),
            React.createElement("input", { type: "submit", value: "Write" })
        );
    }
});
var Writing = React.createClass({
    displayName: "Writing",

    render: function render() {
        return React.createElement(
            "li",
            { className: "writing" },
            "\"",
            React.createElement(
                "em",
                null,
                this.props.text
            ),
            "\", written by ",
            React.createElement(
                "strong",
                null,
                this.props.author
            ),
            "."
        );
    }
});

//  Info & chat view
var Log = React.createClass({
    displayName: "Log",

    componentWillUpdate: function componentWillUpdate() {
        var domNode = ReactDOM.findDOMNode(this);
        this.shouldScroll = Array.prototype.map.call(domNode.children, function (n, i) {
            return n.scrollTop + n.offsetHeight === n.scrollHeight;
        });
    },
    componentDidUpdate: function componentDidUpdate() {
        var domNode = ReactDOM.findDOMNode(this);
        this.shouldScroll.forEach(function (shouldUpdate, index) {
            if (shouldUpdate) {
                var currNode = domNode.children[index];
                currNode.scrollTop = currNode.scrollHeight;
            }
        });
    },
    render: function render() {
        var self = this;
        var staleMessages = this.props.messages.stale.map(function (m, i) {
            return self.props.formatMessage('stale', m, i);
        });
        var freshMessages = this.props.messages.fresh.map(function (m, i) {
            return self.props.formatMessage('fresh', m, i);
        });

        return React.createElement(
            "center",
            { className: this.props.type.toLowerCase() + 'Box' },
            React.createElement(
                "h3",
                null,
                this.props.type
            ),
            React.createElement(
                "div",
                { className: "staleMessages" },
                React.createElement(
                    "h4",
                    null,
                    "Older messages"
                ),
                staleMessages
            ),
            React.createElement(
                "div",
                { className: "freshMessages" },
                React.createElement(
                    "h4",
                    null,
                    "New messages"
                ),
                freshMessages
            )
        );
    }
});
var InfoLog = React.createClass({
    displayName: "InfoLog",

    statics: {
        formatMessage: function formatMessage(type, msg, index) {
            return React.createElement(
                "div",
                { key: index, className: type + 'Message' },
                "[" + msg.type + "] " + msg.message
            );
        }
    },
    getInitialState: function getInitialState() {
        return {
            messages: {
                stale: [],
                fresh: [{
                    type: 'info',
                    message: "This is your info log. There are many others like it, but this one's yours."
                }]
            }
        };
    },
    tick: function tick() {
        var length = this.state.messages.fresh.length;

        if (length > 0) {
            for (var count = 0; count < length; count++) {
                var currMsg = this.state.messages.fresh.shift();
                this.state.messages.stale.push(currMsg);
            }
        }

        this.forceUpdate();
    },
    add: function add(msg) {
        this.state.messages.fresh.push(msg);
        this.forceUpdate();
    },
    render: function render() {
        return React.createElement(Log, { type: "Info", messages: this.state.messages, formatMessage: InfoLog.formatMessage });
    }
});
var ChatLog = React.createClass({
    displayName: "ChatLog",

    statics: {
        formatMessage: function formatMessage(type, msg, index) {
            return React.createElement(
                "div",
                { key: index, className: type + 'Message' },
                "<" + msg.from + "> " + msg.message
            );
        }
    },
    getInitialState: function getInitialState() {
        return {
            messages: {
                stale: [],
                fresh: [{
                    from: 'ocmud',
                    message: "Speak freely and don't complain if others do the same."
                }]
            }
        };
    },
    tick: function tick() {
        var length = this.state.messages.fresh.length;

        if (length > 0) {
            for (var count = 0; count < length; count++) {
                var currMsg = this.state.messages.fresh.shift();
                this.state.messages.stale.push(currMsg);
            }
        }

        this.forceUpdate();
    },
    add: function add(msg) {
        this.state.messages.fresh.push(msg);
        this.forceUpdate();
    },
    render: function render() {
        return React.createElement(Log, { type: "Chat", messages: this.state.messages, formatMessage: ChatLog.formatMessage });
    }
});

window.reactViews = {
    form: ReactDOM.render(React.createElement(OneLineForm, null), OneLineForm.containingElement),
    authForm: ReactDOM.render(React.createElement(AuthForm, null), AuthForm.containingElement),
    optionForm: ReactDOM.render(React.createElement(OptionForm, null), OptionForm.containingElement),
    location: ReactDOM.render(React.createElement(Location, null), document.getElementById('location')),
    infoLog: ReactDOM.render(React.createElement(InfoLog, null), document.getElementById('infoLog')),
    chatLog: ReactDOM.render(React.createElement(ChatLog, null), document.getElementById('chatLog')),
    commandDisplay: ReactDOM.render(React.createElement(CommandDisplay, null), document.getElementById('commands'))
};
//# sourceMappingURL=react.js.map
