const React = require('react');
const Reactions = require('./Reactions');

export class Messages extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      messages: this.retrieveMessages(),
      sendPressed: false,
      sending: false,
      composerValue: ''
    }
  }

  handleMessageReceive(msg_formatted) {
    let text = msg_formatted.msg;
    let name = msg_formatted.name;

    let messagesList = this.state.messages;
    messagesList.push({
      body: text,
      sender: {
        name: name,
        reaction: msg_formatted.reaction
      },
      self: false
    });
    this.setState({
      messages: messagesList,
      sending: false,
      composerValue: msg_formatted.myself == false ? this.state.composerValue : ''
    }, () => {
      document.getElementById("composer").disabled = false;
      const container = document.getElementById('messages-container');
      container.scrollTop = container.scrollHeight;
    });
  }

  componentDidMount() {
    const container = document.getElementById('messages-container');
    container.scrollTop = container.scrollHeight;
  }

  getChatId() {
    return this.state.chatId;
  }

  retrieveMessages() {
    return [];
  }

  handleMessageChange(event) {
    this.setState({
      composerValue: event.target.value
    });
  }

  renderMessages() {
    let messageElements = [];
    this.state.messages.forEach((message, index) => {
      let messageElement = (
        <div key={index + "-message"} className="message-item">
          <div className="message-sender-info unselectable">
            <div className="message-sender">
              <div className="message-sender-initials">
                {message.sender.name.charAt(0)}
              </div>
            </div>
            <div className="message-sender-reaction">
              <img
                src={
                  "assets/" + Reactions.reactionIcons[message.sender.reaction.toLowerCase()] + '_emoji.png'
                }
                className="message-sender-reaction-icon"/>
            </div>
          </div>
          <div className={
            message.self ? "message-body self" : "message-body other"
          }>
            {message.body}
          </div>
        </div>
      );
      messageElements.push(messageElement);
    });
    return messageElements;
  }

  sendPressed() {
    if (this.state.composerValue.length == 0) {
      return;
    }
    this.setState({
      sendPressed: true
    });
  }

  sendReleased(send) {
    if (!send && this.state.sending || this.state.composerValue.length == 0) {
      return;
    }
    if (send) {
      console.log("sending message:", this.state.composerValue);
      document.getElementById("composer").disabled = true;
      let msgRequest = {
        chatId: 0,
        text: this.state.composerValue
      }
      let socket = this.props.socket;
      if (socket == null) {
        console.log('error2');
        return;
      }
      socket.emit('chat msg', JSON.stringify(msgRequest));

      // setTimeout(() => {
      //   let messagesList = this.state.messages;
      //   messagesList.push({
      //     body: this.state.composerValue,
      //     sender: {
      //       name: "Kevin",
      //       reaction: "Approve"
      //     },
      //     self: true
      //   });
      //   this.setState({
      //     messages: messagesList,
      //     sending: false,
      //     composerValue: ''
      //   }, () => {
      //     document.getElementById("composer").disabled = false;
      //     const container = document.getElementById('messages-container');
      //     container.scrollTop = container.scrollHeight;
      //   });
      // }, 1000);
    }
    this.setState({
      sendPressed: false,
      sending: send
    });
  }

  render() {
    let sendButtonClass = "message-composer-send unselectable";
    if (this.state.composerValue.length == 0) {
      sendButtonClass += " disabled";
    } else if (this.state.sendPressed) {
      sendButtonClass += " pressed";
    } else if (this.state.sending) {
      sendButtonClass += " sending";
    }
    return (
      <div className="messages">
        <div id="messages-container" className="messages-container">
          {this.renderMessages()}
        </div>
        <div className="message-composer unselectable">
          <form onSubmit={(e) => {
            e.preventDefault();
            this.sendReleased(e, true);
          }}>
            <input
              type="text"
              id="composer"
              className="message-composer-input"
              placeholder="Send a message..."
              value={this.state.composerValue}
              onChange={this.handleMessageChange.bind(this)}/>
            <input type="submit" style={{display: 'none'}}/>
          </form>
          <div
            className={sendButtonClass}
            onMouseDown={this.sendPressed.bind(this)}
            onMouseUp={this.sendReleased.bind(this, true)}
            onMouseLeave={this.sendReleased.bind(this, false)}>
            <div className="message-composer-send-label">
              {
                this.state.sending
                ? (
                  <div>
                    <img className="sending-loading-spinner" src="assets/spinner.gif"/>
                  </div>
                )
                : "Send"
              }
            </div>
          </div>
        </div>
      </div>
    );
  }
}

module.exports = Messages;
