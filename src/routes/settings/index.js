import React, {} from 'react';

import TabPanel from "Components/TabPanel";

import Account from './account';
import Project from './project';

function Settings(props) {
  return (
    <TabPanel
      selectedTab="account"
      data={[
        {
          title: "Account",
          name: "account",
          content: (
            <Account />
          ),
        },
        {
          title: "Settings",
          name: "settings",
          content: (
            <Project />
          ),
        }
      ]}
    >
    </TabPanel>
  );
}

export default Settings