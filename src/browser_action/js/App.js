const React = require('react');
const Sidebar = require('./Sidebar');
const Header = require('./Header');
const Messages = require('./Messages');
const ReactionScreen = require('./ReactionScreen');

export class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      currentChat: 0,
      chatList: [],
      name: '',
      reaction: '',
      initialized: false,
      socket: io('https://frozen-waters-93748.herokuapp.com/'),
    }
  }

  componentDidMount() {
    chrome.tabs.getSelected(null, (tab) => {
      console.log(tab);
      this.setState({
        uri: tab.url,
        title: tab.title,
      });
    });
    socket.on('chatId', (payload) => {
       chatList.push(
        <Messages
          myName={this.state.name}
          chatId={payload.chatId}
          myReaction={this.state.reaction}
          socket={this.state.socket}
          title={this.state.title}/>
        );
    });
    socket.on('msg', (msg) => {
      handleMessageReceive(msg);
    });
  }


  setUserInfo(info) {
    console.log('info set:', info);
    console.log('set');
    let payload = {
      uri: this.state.uri,
      name: info.name,
      reaction: info.reaction,
      title: this.state.title,
      topic: 'topic',
      bias: 'liberal'
    }
    socket.emit('init', JSON.stringify(payload));
    this.setState({
      name: info.name,
      reaction: info.reaction,
      initialized: true,
    });
  }

   handleMessageReceive(msg) {
    const msg_formatted = JSON.parse(msg);
    const chatId = msg_formatted.chatId;
    for (i = 0; i < chatList.length; i++) {
      if (chatList[i].getChatId() == chatId) {
        chatList[i].handleMessageReceive(msg_formatted);
        break;
      }
    }
  }

  render() {
    if (this.state.currentChat >= 0) {
      messages = this.state.chatList[this.state.currentChat];
    } else {
      messages = null;
    }
    return (
      <div>
        <Sidebar/>
        <Header title={this.state.title}/>
        {messages}
        <div className={!this.state.initialized ? "reaction-screen" : "reaction-screen hidden"}>
          <ReactionScreen setUserInfo={this.setUserInfo.bind(this)}/>
        </div>
      </div>
    );
  }
}

module.exports = App;
