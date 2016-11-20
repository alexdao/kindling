const React = require('react');

export class Header extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      readers: 538
    }
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
    return (
      <div className="header">
        <div className="header-article-title">
          {this.props.title}
        </div>
        <div className="header-subtitle">
          {articlePublisher.toUpperCase()}
          &nbsp; &bull; &nbsp;
          {this.state.readers + " Readers"}
        </div>
      </div>
    );
  }
}

module.exports = Header;
