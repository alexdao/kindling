const React = require('react');
const Sidebar = require('./Sidebar');
const Header = require('./Header');
const Messages = require('./Messages');
const ReactionScreen = require('./ReactionScreen');

export class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      reaction: '',
      initialized: false,
      socket: null,
      currentChatId: '',
      currentChatIndex: -1,
      chats: [],
      chatUsers: []
    }
  }

  componentDidMount() {
    chrome.tabs.getSelected(null, (tab) => {
      console.log(tab);
      this.setState({
        uri: tab.url,
        title: tab.title
      });
    });
  }

  setUserInfo(info) {
    console.log('info set:', info);
    let socket = io('https://frozen-waters-93748.herokuapp.com/');
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

    socket.on('chatId', (chatId) => {
      console.log('chatId', chatId);
      let chats = this.state.chats;
      chats.push(chatId.chatId);

      this.setState({
        name: info.name,
        reaction: info.reaction,
        initialized: true,
        socket: socket,
        currentChatIndex: 0,
        currentChatId: chatId.chatId,
        chats: chats
      });
    });
    socket.on('privateChatResponse', (payload) => {
      console.log(payload);
    });
  }

  addChat() {
    console.log('private');
    this.state.socket.emit('private', null);
  }

  switchChat(index) {
    this.setState({
      currentChatIndex: index
    });
  }

  render() {
    return (
      <div>
        <Sidebar
          chats={this.state.chats}
          chatUsers={this.state.chatUsers}
          addChat={this.addChat.bind(this)}
          switchChat={this.switchChat.bind(this)}/>
        <Header title={this.state.title}/>
        <Messages
          myName={this.state.name}
          myReaction={this.state.reaction}
          socket={this.state.socket}
          title={this.state.title}
          currentChatId={this.state.currentChatId}
          currentChatIndex={this.state.currentChatIndex}
          chats={this.state.chats}
          chatUsers={this.state.chatUsers}/>
        <div className={!this.state.initialized ? "reaction-screen" : "reaction-screen hidden"}>
          <ReactionScreen setUserInfo={this.setUserInfo.bind(this)}/>
        </div>
      </div>
    );
  }
}

module.exports = App;
