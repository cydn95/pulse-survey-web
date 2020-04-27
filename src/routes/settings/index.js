import React, {} from 'react';

import TopNav from "Containers/TopNav";
import TabPanel from "Components/TabPanel";

import Account from './account';
import Project from './project';

import styles from './styles.scss';

class Settings extends React.Component {

  render() {

    const { history } = this.props;

    return (
      <div className={ styles.root}>
				<div className={styles.topbar }>
          <TopNav history={ history } menuTitle="My Map" >
						<div className={ styles.section }>
							<h2 className={ styles['project-name'] }>Alpha Project</h2>
						</div>
					</TopNav>
        </div>
				<div className={ styles['setting-container'] }>
          <TabPanel
            selectedTab="account"
            data={[
              {
                title: "Account",
                name: "account",
                type: "default",
                content: (
                  <Account />
                ),
              },
              {
                title: "Projects",
                name: "projects",
                type: "default",
                content: (
                  <Project />
                ),
              }
            ]}
          >
          </TabPanel>
        </div>
      </div>
    );
  }
}

export default Settings