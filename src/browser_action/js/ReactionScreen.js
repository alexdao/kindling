const React = require('react');
const Reactions = require('./Reactions');

export class ReactionScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      nameValue: '',
      selectedReactionIndex: -1,
      donePressed: false
    }
  }

  handleNameChange(event) {
    this.setState({
      nameValue: event.target.value
    });
  }

  selectReaction(index) {
    this.setState({
      selectedReactionIndex: index == this.state.selectedReactionIndex ? -1 : index
    });
  }

  renderReactions() {
    const reactions = Reactions.reactions;
    let reactionElements = [];
    reactions.forEach((reaction, index) => {
      const reactionElement = (
        <div
          key={index + "-reaction-option"}
          className={index == this.state.selectedReactionIndex ? "reaction-option selected" : "reaction-option"}
          onClick={this.selectReaction.bind(this, index)}>
          <img className="reaction-option-icon" src={"assets/" + Reactions.reactionIcons[reaction.toLowerCase()] + "_emoji.png"}/>
          <div className="reaction-option-label">
            {reaction}
          </div>
        </div>
      );
      reactionElements.push(reactionElement);
    });
    return reactionElements;
  }

  donePressed() {
    if (this.state.nameValue.length == 0 || this.state.selectedReactionIndex == -1) {
      return;
    }
    this.setState({
      donePressed: true
    });
  }

  doneReleased(done) {
    if (this.state.nameValue.length == 0 || this.state.selectedReactionIndex == -1) {
      return;
    }
    if (done) {
      this.props.setUserInfo({
        name: this.state.nameValue,
        reaction: Reactions.reactions[this.state.selectedReactionIndex]
      });
    }
    this.setState({
      donePressed: false
    });
  }

  render() {
    let doneButtonClass = "done-button unselectable";
    if (this.state.nameValue.length == 0 || this.state.selectedReactionIndex == -1) {
      doneButtonClass += " disabled";
    } else if (this.state.donePressed) {
      doneButtonClass += " pressed";
    }

    return (
      <div className="reaction-screen-content">
        <div className="reaction-screen-header">
          <div className="reaction-screen-title">Kindling</div>
        </div>
        <div className="name-input-label">
          Enter A Nickname:
        </div>
        <div className="name-input-container">
          <input
            type="text"
            id="name-field"
            className="name-input"
            placeholder="Your Nickname"
            value={this.state.nameValue}
            onChange={this.handleNameChange.bind(this)}/>
        </div>
        <div className="reaction-options-label">
          What was your reaction?
        </div>
        <div className="reaction-options">
          {this.renderReactions()}
        </div>
        <div
          className={doneButtonClass}
          onMouseDown={this.donePressed.bind(this)}
          onMouseUp={this.doneReleased.bind(this, true)}
          onMouseLeave={this.doneReleased.bind(this, false)}>
          Done
        </div>
      </div>
    );
  }
}

module.exports = ReactionScreen;
