const React = require('react');
const Reactions = require('./Reactions');

export class Header extends React.Component {
  constructor(props) {
    super(props);
  }

  retrieveArticlePublisher() {
    if (!this.props.uri) {
      return "";
    }
    var match = this.props.uri.match(/:\/\/(www[0-9]?\.)?(.[^/:]+)/i);
    if (match != null && match.length > 2 && typeof match[2] === 'string' && match[2].length > 0) {
      return match[2];
    }
    else {
      return "";
    }
  }

  render() {
    let articlePublisher = this.retrieveArticlePublisher();
    console.log(this.props.currentChatIndex);
    console.log(this.props.chatUsers);
    return (
      <div className="header">
        {
          this.props.currentChatIndex == 0 || this.props.currentChatIndex == -1
          ? (
            <div>
              <div className="header-article-title">
                {this.props.title}
              </div>
              <div className="header-subtitle">
                {articlePublisher.toUpperCase()}
                &nbsp; &bull; &nbsp;
                {this.props.chatSize + " Readers"}
              </div>
            </div>
          )
          : (
            <div className="header-private-chat">
              <div className="header-private-chat-title">
                Chatting with...
              </div>
              <div className="header-private-chat-user">
                <div className="header-private-chat-user-reaction">
                    <img
                      src={
                        "assets/" + Reactions.reactionIcons[this.props.chatUsers[this.props.currentChatIndex - 1].reaction.toLowerCase()] + '_emoji.png'
                      }
                      className="header-private-chat-user-reaction-icon"/>
                </div>
                <div className="header-private-chat-user-name">
                  {this.props.chatUsers[this.props.currentChatIndex - 1].name}
                </div>
              </div>
            </div>
          )
        }
      </div>
    );
  }
}

module.exports = Header;
