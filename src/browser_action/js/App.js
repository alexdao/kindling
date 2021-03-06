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
      chatUsers: [],
      chatSize: 0
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
      let data = JSON.parse(payload);
      let newUser = {
        name: data.name,
        reaction: data.reaction
      }
      let newChatId = data.chatId;
      let chatUsers = this.state.chatUsers;
      let chats = this.state.chats;
      chatUsers.push(newUser);
      chats.push(newChatId);
      this.setState({
        currentChatIndex: chats.length - 1,
        currentChatId: newChatId,
        chatUsers: chatUsers,
        chats: chats
      });
    });

    socket.on('chatSize', (payload) => {
      console.log('payload', payload);
      let data = JSON.parse(payload);
      if (data.chatId == this.state.chats[0]) {
        this.setState({
          chatSize: data.size
        });
      }
    });
  }

  addChat() {
    console.log('private');
    this.state.socket.emit('private', null);
  }

  switchChat(index) {
    this.setState({
      currentChatIndex: index,
      currentChatId: this.state.chats[index]
    });
  }

  disconnectChat(index) {
    let chats = this.state.chats;
    let chatUsers = this.state.chatUsers;
    chats.splice(index, 1);
    chatUsers.splice(index - 1, 1);
    this.setState({
      currentChatIndex: 0,
      currentChatId: chats[0],
      chats: chats,
      chatUsers: chatUsers
    });
  }

  render() {
    return (
      <div>
        <Sidebar
          currentChatIndex={this.state.currentChatIndex}
          chats={this.state.chats}
          chatUsers={this.state.chatUsers}
          addChat={this.addChat.bind(this)}
          switchChat={this.switchChat.bind(this)}/>
        <Header
          title={this.state.title}
          uri={this.state.uri}
          chats={this.state.chats}
          chatUsers={this.state.chatUsers}
          currentChatIndex={this.state.currentChatIndex}
          chatSize={this.state.chatSize}/>
        <Messages
          myName={this.state.name}
          myReaction={this.state.reaction}
          socket={this.state.socket}
          title={this.state.title}
          currentChatId={this.state.currentChatId}
          currentChatIndex={this.state.currentChatIndex}
          chats={this.state.chats}
          chatUsers={this.state.chatUsers}
          disconnectChat={this.disconnectChat.bind(this)}/>
        <div className={!this.state.initialized ? "reaction-screen" : "reaction-screen hidden"}>
          <ReactionScreen setUserInfo={this.setUserInfo.bind(this)}/>
        </div>
      </div>
    );
  }
}

module.exports = App;
