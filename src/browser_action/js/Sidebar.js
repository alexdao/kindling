const React = require('react');

export class Sidebar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      hovered: -1,
    }
  }

  retrievePersonalConversations() {
    return [
      {
        name: "Kevin"
      },
      {
        name: "Danny"
      },
      {
        name: "Alex"
      },
      {
        name: "Jiawei"
      }
    ]
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
    let tabs = this.retrievePersonalConversations();
    let tabElements = [];
    tabs.forEach((tab, index) => {
      let tabElement = (
        <div
          key={index + "-chat-tab"}
          className="sidebar-chat-tab"
          onMouseEnter={this.enterTab.bind(this, index)}
          onMouseLeave={this.leaveTab.bind(this)}>
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
    let tabs = this.retrievePersonalConversations();
    let labelElements = [];
    tabs.forEach((tab, index) => {
      let labelElement = (
        <div
          key={index + "-chat-tab-label"}
          className="sidebar-chat-tab-label"
          style={{
            left: "65px",
            top: 24 + index*62 + "px",
            display: index == this.state.hovered ? "block" : "none"
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
          {this.renderChatTabs()}
        </div>
        <div>
          {this.renderChatTabLabels()}
        </div>
      </div>
    );
  }
}

module.exports = Sidebar;
