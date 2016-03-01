'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _auth = require('./auth');

var _auth2 = _interopRequireDefault(_auth);

var _api = require('./api');

var _api2 = _interopRequireDefault(_api);

var _app = require('./app');

var _app2 = _interopRequireDefault(_app);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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

//  Command legend
var CommandLegend = _react2.default.createClass({
    displayName: 'CommandLegend',

    render: function render() {
        return _react2.default.createElement(
            'center',
            null,
            _react2.default.createElement(
                'h3',
                null,
                'Command Reference'
            ),
            _react2.default.createElement(
                'dl',
                null,
                _react2.default.createElement(
                    'div',
                    { className: 'row' },
                    _react2.default.createElement(
                        'span',
                        { className: classes.quarterRow },
                        _react2.default.createElement(
                            'dt',
                            null,
                            '←'
                        ),
                        _react2.default.createElement(
                            'dd',
                            null,
                            'Travel west'
                        )
                    ),
                    _react2.default.createElement(
                        'span',
                        { className: classes.quarterRow },
                        _react2.default.createElement(
                            'dt',
                            null,
                            '↑'
                        ),
                        _react2.default.createElement(
                            'dd',
                            null,
                            'Travel north'
                        )
                    ),
                    _react2.default.createElement(
                        'span',
                        { className: classes.quarterRow },
                        _react2.default.createElement(
                            'dt',
                            null,
                            '→'
                        ),
                        _react2.default.createElement(
                            'dd',
                            null,
                            'Travel east'
                        )
                    ),
                    _react2.default.createElement(
                        'span',
                        { className: classes.quarterRow },
                        _react2.default.createElement(
                            'dt',
                            null,
                            '↓'
                        ),
                        _react2.default.createElement(
                            'dd',
                            null,
                            'Travel south'
                        )
                    )
                ),
                _react2.default.createElement(
                    'div',
                    { className: 'row' },
                    _react2.default.createElement(
                        'span',
                        { className: classes.quarterRow },
                        _react2.default.createElement(
                            'dt',
                            null,
                            'W'
                        ),
                        _react2.default.createElement(
                            'dd',
                            null,
                            'Write'
                        )
                    ),
                    _react2.default.createElement(
                        'span',
                        { className: classes.quarterRow },
                        _react2.default.createElement(
                            'dt',
                            null,
                            'S'
                        ),
                        _react2.default.createElement(
                            'dd',
                            null,
                            'Speak'
                        )
                    ),
                    _react2.default.createElement(
                        'span',
                        { className: classes.quarterRow },
                        _react2.default.createElement(
                            'dt',
                            null,
                            'J'
                        ),
                        _react2.default.createElement(
                            'dd',
                            null,
                            'Jump'
                        )
                    ),
                    _react2.default.createElement(
                        'span',
                        { className: classes.quarterRow },
                        _react2.default.createElement(
                            'dt',
                            null,
                            'L'
                        ),
                        _react2.default.createElement(
                            'dd',
                            null,
                            'Look around (refresh)'
                        )
                    )
                ),
                _react2.default.createElement(
                    'div',
                    { className: 'row' },
                    _react2.default.createElement(
                        'span',
                        { className: classes.quarterRow },
                        _react2.default.createElement(
                            'dt',
                            null,
                            'Esc'
                        ),
                        _react2.default.createElement(
                            'dd',
                            null,
                            'Special command menu'
                        )
                    ),
                    _react2.default.createElement(
                        'span',
                        { className: classes.quarterRow },
                        _react2.default.createElement(
                            'dt',
                            null,
                            'M'
                        ),
                        _react2.default.createElement(
                            'dd',
                            null,
                            'Make new location'
                        )
                    ),
                    _react2.default.createElement(
                        'span',
                        { className: classes.quarterRow },
                        _react2.default.createElement(
                            'dt',
                            null,
                            'C'
                        ),
                        _react2.default.createElement(
                            'dd',
                            null,
                            'Connect location'
                        )
                    ),
                    _react2.default.createElement(
                        'span',
                        { className: classes.quarterRow },
                        _react2.default.createElement(
                            'dt',
                            null,
                            'Q'
                        ),
                        _react2.default.createElement(
                            'dd',
                            null,
                            'Quit'
                        )
                    )
                )
            )
        );
    }
});

//  Authentication form
var AuthForm = _react2.default.createClass({
    displayName: 'AuthForm',

    statics: {
        containingElement: document.getElementById('auth')
    },
    getInitialState: function getInitialState() {
        return {
            disabled: false,
            error: null
        };
    },
    setDisabled: function setDisabled(bool) {
        var state = this.state;
        state.disabled = bool;
        this.setState(state);
    },
    setError: function setError(err) {
        var state = this.state;
        state.error = err;
        this.setState(state);
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
        return _api2.default.init();
    },
    submit: function authHandler(e) {
        e.preventDefault();

        this.setDisabled(true);

        var username = e.target.username.value;

        _auth2.default.enticate({
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
            _app2.default.loggedInAs = username;
            return _api2.default.init();
        };
    },
    authFailure: function authFailure() {
        this.setDisabled(false);
        this.setError({
            type: "auth-fail",
            title: "Authentication Failure",
            message: "Your account credentials are incorrect or there is already an account with that username or email."
        });
    },
    authError: function authError() {
        this.setDisabled(false);
        this.setError({
            type: "auth-error",
            title: "Server Error",
            message: "We're sorry. Please check your account credentials and try again after a few minutes."
        });
    },
    render: function render() {
        return _react2.default.createElement(
            'form',
            { onSubmit: this.submit },
            _react2.default.createElement(
                'center',
                { className: 'row' },
                _react2.default.createElement(
                    'h1',
                    { className: classes.entireRow },
                    'Register or Log In'
                )
            ),
            _react2.default.createElement(
                'div',
                { className: 'row directions' },
                _react2.default.createElement(
                    'div',
                    { className: classes.entireRow },
                    _react2.default.createElement(
                        'h3',
                        null,
                        'To ',
                        _react2.default.createElement(
                            'strong',
                            null,
                            'log in'
                        ),
                        ', supply your username and password and click the "log in" button.'
                    ),
                    _react2.default.createElement(
                        'h3',
                        null,
                        'To ',
                        _react2.default.createElement(
                            'strong',
                            null,
                            'register an account'
                        ),
                        ', simply provide an email with your desired username and password.'
                    ),
                    _react2.default.createElement(
                        'h3',
                        null,
                        'If the username does not exist, and account by that name will be created for you. If the username is already claimed, you will be asked to choose another one.'
                    ),
                    _react2.default.createElement(
                        'h3',
                        null,
                        'You also have the option to ',
                        _react2.default.createElement(
                            'strong',
                            null,
                            'explore ocmud'
                        ),
                        '. Explorers aren\'t allowed to do all the things that creators (registered users) are, but are able to travel and see the world others have made.'
                    )
                )
            ),
            this.state.error && _react2.default.createElement(
                'center',
                { className: this.state.error.type },
                _react2.default.createElement(
                    'h2',
                    null,
                    this.state.error.title
                ),
                _react2.default.createElement(
                    'p',
                    null,
                    this.state.error.message
                )
            ),
            _react2.default.createElement(FormElement, { labelClass: classes.authLabel,
                labelText: 'Username',
                inputClass: classes.authInput,
                type: 'text',
                name: 'username',
                placeholder: 'Username',
                disabled: this.state.disabled,
                required: true }),
            _react2.default.createElement(FormElement, { labelClass: classes.authLabel,
                labelText: 'Password',
                inputClass: classes.authInput,
                type: 'password',
                name: 'password',
                placeholder: 'Password123!',
                disabled: this.state.disabled,
                required: true }),
            _react2.default.createElement(FormElement, { labelClass: classes.authLabel,
                labelText: 'Email*',
                inputClass: classes.authInput,
                type: 'email',
                name: 'email',
                placeholder: 'your@email.address',
                disabled: this.state.disabled }),
            _react2.default.createElement(
                'center',
                { className: 'row' },
                _react2.default.createElement(
                    'button',
                    { className: classes.authBtn1,
                        disabled: this.state.disabled,
                        type: 'submit' },
                    'Log in / Register'
                ),
                _react2.default.createElement(
                    'button',
                    { className: classes.authBtn2,
                        disabled: this.state.disabled,
                        type: 'button',
                        onClick: this.explore },
                    'Explore as a guest'
                )
            ),
            _react2.default.createElement(
                'center',
                { className: 'row' },
                _react2.default.createElement(
                    'span',
                    { className: classes.entireRow },
                    '* Required for registration, not required when logging in.'
                )
            )
        );
    }
});
//'
var FormElement = _react2.default.createClass({
    displayName: 'FormElement',

    render: function render() {
        return _react2.default.createElement(
            'center',
            { className: 'row' },
            _react2.default.createElement(
                'label',
                null,
                _react2.default.createElement(
                    'span',
                    { className: this.props.labelClass },
                    this.props.labelText
                ),
                _react2.default.createElement('input', { className: this.props.inputClass,
                    disabled: this.props.disabled,
                    type: this.props.type, name: this.props.name,
                    placeholder: this.props.placeholder,
                    required: this.props.required || false })
            )
        );
    }
});

//  Option form
var OptionForm = _react2.default.createClass({
    displayName: 'OptionForm',

    statics: {
        containingElement: document.getElementById('option-form')
    },
    getInitialState: function getInitialState() {
        var self = this;
        var stalin = {
            name: "Josef Stalin",
            value: "stalin"
        };

        return {
            title: "Election",
            description: "Vote for your next president.",
            name: "president",
            buttonTitle: "Vote",
            options: [stalin, stalin, stalin, stalin],
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

        var index = 0;
        for (var row = 0; row < numRows; row++) {
            var currRow = [];

            for (var option = 0; option < perRow && index < total; option++, index++) {
                var currOption = this.state.options[index];

                currRow.push(_react2.default.createElement(OptionElement, { key: index,
                    labelText: currOption.name,
                    labelClass: perRow === 6 ? classes.sixthRow : classes.quarterRow,
                    name: this.state.name || "choice",
                    value: index }));
            }

            rows.push(_react2.default.createElement(
                'center',
                { key: row, className: 'row' },
                currRow
            ));
        }

        return _react2.default.createElement(
            'form',
            { onSubmit: this.state.submitHandler },
            _react2.default.createElement(
                'center',
                { className: 'row' },
                _react2.default.createElement(
                    'h1',
                    { className: classes.entireRow },
                    this.state.title
                )
            ),
            _react2.default.createElement(
                'center',
                { className: 'row' },
                _react2.default.createElement(
                    'h3',
                    { className: classes.entireRow },
                    this.state.description
                )
            ),
            rows,
            _react2.default.createElement(
                'center',
                { className: 'row' },
                _react2.default.createElement(
                    'button',
                    { className: classes.optButton,
                        type: 'submit' },
                    this.state.buttonTitle
                )
            )
        );
    }
});
var OptionElement = _react2.default.createClass({
    displayName: 'OptionElement',

    statics: {
        changeHandler: function changeHandler(e) {
            Array.prototype.forEach.call(e.target.parentNode.parentNode.children, function (sibling) {
                sibling.classList.remove('chosen');
            });
            e.target.parentNode.classList.add('chosen');
        }
    },
    render: function render() {
        return _react2.default.createElement(
            'label',
            { className: this.props.labelClass + ' option' },
            _react2.default.createElement(
                'span',
                null,
                this.props.labelText
            ),
            _react2.default.createElement('input', { className: 'hidden',
                type: 'radio', name: this.props.name,
                required: 'true',
                onChange: OptionElement.changeHandler,
                value: this.props.value })
        );
    }
});

//  Generic form with one text box input
var OneLineForm = _react2.default.createClass({
    displayName: 'OneLineForm',

    statics: {
        containingElement: document.getElementById('line-form')
    },
    getInitialState: function getInitialState() {
        var self = this;

        return {
            title: "Confession",
            name: "confession",
            description: "What crimes have you committed, comrade?",
            placeholder: "Espionage, grand capitalism, smoking in a non-smoking area.",
            buttonTitle: "Confess",
            submitHandler: function submitHandler(e) {
                e.preventDefault();
                self.hide();
            }
        };
    },
    show: function show() {
        OneLineForm.containingElement.classList.remove('hidden');
        return document.querySelector('#line-form input').focus();
    },
    hide: function hide() {
        return OneLineForm.containingElement.classList.add('hidden');
    },
    componentDidUpdate: function componentDidUpdate() {
        return OneLineForm.containingElement.querySelector('form').reset();
    },
    render: function render() {
        return _react2.default.createElement(
            'form',
            { onSubmit: this.state.submitHandler },
            _react2.default.createElement(
                'center',
                { className: 'row' },
                _react2.default.createElement(
                    'h1',
                    { className: classes.entireRow },
                    this.state.title
                )
            ),
            _react2.default.createElement(
                'center',
                { className: 'row' },
                _react2.default.createElement(
                    'h3',
                    { className: classes.entireRow },
                    this.state.description
                )
            ),
            _react2.default.createElement(
                'div',
                { className: 'row' },
                _react2.default.createElement('input', { className: classes.olfInputBox,
                    type: 'text',
                    name: this.state.name || "line",
                    placeholder: this.state.placeholder }),
                _react2.default.createElement(
                    'button',
                    { className: classes.olfButton,
                        type: 'submit' },
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
var Location = _react2.default.createClass({
    displayName: 'Location',

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

        if (exits.length === 0) {
            result = '';
        } else if (exits.length === 1) {
            result = exits[0];
        } else if (exits.length === 2) {
            result = exits.join(' and ');
        } else {
            result = exits.slice(0, exits.length - 1).join(', ') + ', and ' + exits[exits.length - 1];
        }

        return {
            num: exits.length,
            directions: result
        };
    },
    render: function render() {
        var exits = this.renderExits();
        var surfaceExists = this.state.surface !== null;

        return _react2.default.createElement(
            'div',
            null,
            _react2.default.createElement(
                'div',
                { className: 'row' },
                _react2.default.createElement(
                    'center',
                    { className: classes[surfaceExists ? 'location' : 'locOnly'] },
                    _react2.default.createElement(
                        'h1',
                        null,
                        this.state.name
                    ),
                    _react2.default.createElement(
                        'h3',
                        null,
                        this.state.description
                    ),
                    _react2.default.createElement(
                        'h3',
                        null,
                        'There are ',
                        exits.num > 0 ? '' : 'no ',
                        'exits',
                        exits.num > 0 ? ' to the ' : '',
                        _react2.default.createElement(
                            'strong',
                            null,
                            exits.directions
                        ),
                        ' here.'
                    ),
                    this.state.surface && _react2.default.createElement(
                        'h4',
                        null,
                        'There is a ',
                        this.state.surface,
                        ' here.'
                    )
                ),
                surfaceExists && _react2.default.createElement(Surface, {
                    name: this.state.surface,
                    writings: this.state.writings || [],
                    className: classes.surface })
            )
        );
    }
});

//  Surface view
var Surface = _react2.default.createClass({
    displayName: 'Surface',

    render: function render() {
        return _react2.default.createElement(
            'center',
            { className: 'surface ' + this.props.className, id: 'surfaceView' },
            _react2.default.createElement(
                'h2',
                null,
                this.props.name ? 'A ' + this.props.name : 'Nothing'
            ),
            _react2.default.createElement(WritingList, { writings: this.props.writings })
        );
    }
});
var WritingList = _react2.default.createClass({
    displayName: 'WritingList',

    render: function render() {
        var writings = this.props.writings.map(function (writing, index) {
            return _react2.default.createElement(Writing, { key: index, author: writing.author, text: writing.message });
        });
        return _react2.default.createElement(
            'ul',
            { className: 'writingList' },
            writings
        );
    }
});

//  convert this into a generic form that is customizable by setting its state
var WriteForm = _react2.default.createClass({
    displayName: 'WriteForm',

    render: function render() {
        return _react2.default.createElement(
            'form',
            { className: 'writeForm', onSubmit: this.props.onSubmit },
            _react2.default.createElement(
                'label',
                null,
                'Message: ',
                _react2.default.createElement('input', { name: 'message', placeholder: 'A message for passerby.' })
            ),
            _react2.default.createElement('input', { type: 'submit', value: 'Write' })
        );
    }
});
var Writing = _react2.default.createClass({
    displayName: 'Writing',

    render: function render() {
        return _react2.default.createElement(
            'li',
            { className: 'writing' },
            '"',
            _react2.default.createElement(
                'em',
                null,
                this.props.text
            ),
            '", written by ',
            _react2.default.createElement(
                'strong',
                null,
                this.props.author
            ),
            '.'
        );
    }
});

//  Info & chat view
var Log = _react2.default.createClass({
    displayName: 'Log',

    componentWillUpdate: function componentWillUpdate() {
        var domNode = _reactDom2.default.findDOMNode(this);
        this.shouldScroll = Array.prototype.map.call(domNode.children, function (n, i) {
            return Math.abs(n.scrollTop + n.offsetHeight - n.scrollHeight) <= 1;
        });
    },
    componentDidUpdate: function componentDidUpdate() {
        var domNode = _reactDom2.default.findDOMNode(this);
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

        return _react2.default.createElement(
            'center',
            { className: this.props.type.toLowerCase() + 'Box' },
            _react2.default.createElement(
                'h3',
                null,
                this.props.type
            ),
            _react2.default.createElement(
                'div',
                { className: 'staleMessages' },
                _react2.default.createElement(
                    'h4',
                    null,
                    'Older messages'
                ),
                staleMessages
            ),
            _react2.default.createElement(
                'div',
                { className: 'freshMessages' },
                _react2.default.createElement(
                    'h4',
                    null,
                    'New messages'
                ),
                freshMessages
            )
        );
    }
});
var InfoLog = _react2.default.createClass({
    displayName: 'InfoLog',

    statics: {
        formatMessage: function formatMessage(type, msg, index) {
            return _react2.default.createElement(
                'div',
                { key: index, className: type + 'Message' },
                '[' + msg.type + '] ' + msg.message
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
        return _react2.default.createElement(Log, { type: 'Info', messages: this.state.messages, formatMessage: InfoLog.formatMessage });
    }
});
var ChatLog = _react2.default.createClass({
    displayName: 'ChatLog',

    statics: {
        formatMessage: function formatMessage(type, msg, index) {
            return _react2.default.createElement(
                'div',
                { key: index, className: type + 'Message' },
                '<' + msg.from + '> ' + msg.message
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
        return _react2.default.createElement(Log, { type: 'Chat', messages: this.state.messages, formatMessage: ChatLog.formatMessage });
    }
});

exports.default = {
    form: _reactDom2.default.render(_react2.default.createElement(OneLineForm, null), OneLineForm.containingElement),
    authForm: _reactDom2.default.render(_react2.default.createElement(AuthForm, null), AuthForm.containingElement),
    optionForm: _reactDom2.default.render(_react2.default.createElement(OptionForm, null), OptionForm.containingElement),
    location: _reactDom2.default.render(_react2.default.createElement(Location, null), document.getElementById('location')),
    infoLog: _reactDom2.default.render(_react2.default.createElement(InfoLog, null), document.getElementById('infoLog')),
    chatLog: _reactDom2.default.render(_react2.default.createElement(ChatLog, null), document.getElementById('chatLog')),
    commandLegend: _reactDom2.default.render(_react2.default.createElement(CommandLegend, null), document.getElementById('commands'))
};
//# sourceMappingURL=react.js.map
