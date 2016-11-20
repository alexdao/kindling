const React = require('react');

export class Header extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      readers: 538
    }
  }

  retrieveArticlePublisher() {
    return "NYTimes";
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
