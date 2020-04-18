import React, { useState } from "react";
import PropTypes from "prop-types";
import { useLocation, useHistory } from "react-router-dom";
import { Tabs as BSTabs, Tab as BSTab } from "react-bootstrap";
import { TABS } from "../lib/constants";

const Tabs = ({ tabs }) => {
  const location = useLocation();
  const history = useHistory();

  const validTabs = tabs.map(({ eventKey }) => eventKey);
  const defaultTab = tabs[0];
  const [activeTab, setActiveTab] = useState(() => {
    const tabFromUrl = location.hash.replace("#", "");
    if (!validTabs.includes(tabFromUrl)) {
      return defaultTab.eventKey;
    }
    return (tabFromUrl || defaultTab).eventKey;
  });

  const updateTab = newTab => {
    setActiveTab(newTab);
    history.replace({
      hash: `#${newTab}`
    });
  };

  return (
    <BSTabs activeKey={activeTab} onSelect={updateTab}>
      {tabs.map(({ eventKey, title, content }) => (
        <BSTab eventKey={eventKey} title={title}>
          {content}
        </BSTab>
      ))}
    </BSTabs>
  );
};

Tabs.propTypes = {
  tabs: PropTypes.arrayOf({
    eventKey: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    content: PropTypes.node.isRequired
  }).isRequired
};

export default Tabs;
