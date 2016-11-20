const React = require('react');
const Sidebar = require('./Sidebar');
const Header = require('./Header');
const Messages = require('./Messages');

export class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <Sidebar/>
        <Header/>
        <Messages/>
      </div>
    );
  }
}

module.exports = App;
