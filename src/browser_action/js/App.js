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
      initialized: false
    }
  }

  setUserInfo(info) {
    console.log('info set:', info);
    let socket = io('https://frozen-waters-93748.herokuapp.com/');
    let payload = {
      uri: 'uri',
      name: 'Kevin',
      reaction: 'Approve',
      title: 'title',
      topic: 'topic',
      bias: 'liberal'
    }
    socket.emit('init', JSON.stringify(payload));
    this.setState({
      name: info.name,
      reaction: info.reaction,
      initialized: true
    });
  }

  render() {
    return (
      <div>
        <Sidebar/>
        <Header/>
        <Messages
          myName={this.state.name}
          myReaction={this.state.reaction}/>
        <div className={!this.state.initialized ? "reaction-screen" : "reaction-screen hidden"}>
          <ReactionScreen setUserInfo={this.setUserInfo.bind(this)}/>
        </div>
      </div>
    );
  }
}

module.exports = App;
