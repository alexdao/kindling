const React = require('react');
const Reactions = {
  "Approve": "smiling",
  "Indifferent": "indifferent",
  "Disapprove": "angry"
}

export class Messages extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      messages: this.retrieveMessages()
    }
  }

  retrieveMessages() {
    return [
      {
        body: "Hey!",
        sender: {
          name: "Kevin",
          reaction: "Approve"
        }
      },
      {
        body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        sender: {
          name: "Alex",
          reaction: "Disapprove"
        }
      },
      {
        body: "Hey!",
        sender: {
          name: "Danny",
          reaction: "Indifferent"
        }
      }
    ];
  }

  renderMessages() {
    let messageElements = [];
    this.state.messages.forEach((message, index) => {
      let messageElement = (
        <div key={index + "-message"} className="message-item">
          <div className="message-sender-info">
            <div className="message-sender">
              <div className="message-sender-initials">
                {message.sender.name.charAt(0)}
              </div>
            </div>
            <div className="message-sender-reaction">
              <img
                src={
                  "assets/" + Reactions[message.sender.reaction] + '_emoji.png'
                }
                className="message-sender-reaction-icon"/>
            </div>
          </div>
          <div className="message-body">
            {message.body}
          </div>
        </div>
      );
      messageElements.push(messageElement);
    });
    return messageElements;
  }

  render() {
    return (
      <div className="messages">
        <div className="messages-container">
          {this.renderMessages()}
        </div>
        <div className="message-composer">
          <input
            type="text"
            id="composer"
            className="message-composer-input"
            placeholder="Send a message..."/>
        </div>
      </div>
    );
  }
}

module.exports = Messages;
