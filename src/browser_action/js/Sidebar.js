const React = require('react');

export class Sidebar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      hovered: -1,
    }
  }

  enterTab(index) {
    this.setState({
      hovered: index
    });
  }

  leaveTab() {
    this.setState({
      hovered: -1
    });
  }

  renderChatTabs() {
    let tabElements = [];
    this.props.chatUsers.forEach((tab, index) => {
      let tabElement = (
        <div
          key={index + "-chat-tab"}
          className={
            this.props.currentChatIndex == index + 1
            ? "sidebar-chat-tab selected"
            : "sidebar-chat-tab"
          }
          onMouseEnter={this.enterTab.bind(this, index + 1)}
          onMouseLeave={this.leaveTab.bind(this)}
          onClick={() => {
            this.props.switchChat(index + 1);
          }}>
          <div className="sidebar-chat-tab-text">
            {tab.name.charAt(0)}
          </div>
        </div>
      );
      tabElements.push(tabElement);
    });
    return tabElements;
  }

  renderChatTabLabels() {
    let labelElements = [];
    this.props.chatUsers.forEach((tab, index) => {
      let labelElement = (
        <div
          key={index + "-chat-tab-label"}
          className="sidebar-chat-tab-label"
          style={{
            left: "65px",
            top: 33 + (index + 1) * 62 + "px",
            display: index + 1 == this.state.hovered ? "block" : "none"
          }}>
          {tab.name}
        </div>
      );
      labelElements.push(labelElement);
    });
    return labelElements;
  }

  render() {
    return (
      <div>
        <div className="sidebar">
          <div
            className={
              this.props.currentChatIndex == 0
              ? "sidebar-chat-tab group selected"
              : "sidebar-chat-tab group"
            }
            onMouseEnter={this.enterTab.bind(this, 0)}
            onMouseLeave={this.leaveTab.bind(this)}
            onClick={() => {
              this.props.switchChat(0);
            }}>
            <div className="sidebar-chat-tab-text">
              <i className="fa fa-users" aria-hidden="true"></i>
            </div>
          </div>
          <div className="sidebar-divider"></div>
          {this.renderChatTabs()}
          <div
            className="sidebar-chat-tab create-chat"
            onMouseEnter={this.enterTab.bind(this, this.props.chatUsers.length + 1)}
            onMouseLeave={this.leaveTab.bind(this)}
            onClick={this.props.addChat}>
            <div className="sidebar-chat-tab-text">
              <i className="fa fa-plus" aria-hidden="true"></i>
            </div>
          </div>
        </div>
        <div>
          <div
            className="sidebar-chat-tab-label"
            style={{
              left: "65px",
              top: "18px",
              display: this.state.hovered == 0 ? "block" : "none"
            }}>
            All Readers
          </div>
          {this.renderChatTabLabels()}
          <div
            className="sidebar-chat-tab-label create-chat"
            style={{
              left: "65px",
              top: 33 + (this.props.chatUsers.length + 1) * 62 + "px",
              display: this.state.hovered == this.props.chatUsers.length + 1 ? "block" : "none"
            }}>
            Connect With Someone
          </div>
        </div>
      </div>
    );
  }
}

module.exports = Sidebar;
