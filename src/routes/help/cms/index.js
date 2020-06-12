import React, { Component, Fragment } from "react";
import { connect } from "react-redux";

import { pageContent, setMenuName } from "Redux/actions";

import styles from "./styles.scss";

function createMarkup(html) {
  return { __html: html };
}

class CMSPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      page: null,
    };
  }

  componentDidMount() {
    const { pageContent, getPageContent } = this.props;

    if (pageContent.length === 0) {
      getPageContent();
    }
  }

  componentWillReceiveProps(props) {
    const { pageContent } = props;
    const { match, setMenuName } = this.props;
    const { pageName } = match.params;

    if (pageContent.length > 0) {
      const page = pageContent.filter((page) => {
        const link = page.tabName.toLowerCase().replace(/\s+/g, "-");
        return link === pageName;
      });
      if (page.length > 0) {
        setMenuName(page[0].tabName);
      }
    }
  }

  render() {
    const { pageContent, match } = this.props;
    const { pageName } = match.params;

    const page = pageContent.filter((page) => {
      const link = page.tabName.toLowerCase().replace(/\s+/g, "-");
      return link === pageName;
    });

    return (
      <Fragment>
        {page.length > 0 && (
          <div className={styles.root}>
            <h1>{page[0].pageName}</h1>
            <div
              className={styles.content}
              dangerouslySetInnerHTML={createMarkup(page[0].pageContent)}
            />
          </div>
        )}
      </Fragment>
    );
  }
}

const mapStateToProps = ({ tour }) => {
  const { pageContent } = tour;

  return {
    pageContent,
  };
};

export default connect(mapStateToProps, {
  getPageContent: pageContent,
  setMenuName,
})(CMSPage);
