// src/components/VerticalTabs.js
import React, { useState } from 'react';
import './VerticalTabs.css';
import Content from './content';

const VerticalTabs = ({ tabs, onAddTab }) => {
  const [activeTab, setActiveTab] = useState(tabs[0]?.id || '');

  const handleTabClick = (id) => {
    setActiveTab(id);
  };

  const closeTab = (id) => {
    const updatedTabs = tabs.filter(tab => tab.id !== id);
    if (activeTab === id) {
      setActiveTab(updatedTabs[0]?.id || '');
    }
    onAddTab(updatedTabs); // Update parent with new tabs
  };

  const addTab = () => {
    const newCount = tabs.length + 1;
    const newTab = {
      id: `${newCount}`,
      title: `Document ${newCount}`,
      content: <Content/>
    };
    const updatedTabs = [...tabs, newTab];
    setActiveTab(newTab.id);
    onAddTab(updatedTabs); // Update parent with new tabs
  };

  return (
    <div className="vertical-tabs">
      <div className="tabs-list">
        {tabs.map((tab) => (
          <div
            key={tab.id}
            className={`tab ${activeTab === tab.id ? 'active' : ''}`}
            onClick={() => handleTabClick(tab.id)}
          >
            {tab.title}
            <button
              className="close-tab-button"
              onClick={(e) => {
                e.stopPropagation(); // Prevent the tab click event
                closeTab(tab.id);
              }}
            >
              ×
            </button>
          </div>
        ))}
        <button className="add-tab-button" onClick={addTab}>
          Add Vertical Tab
        </button>
      </div>
      <div className="tab-content">
        {tabs.find((tab) => tab.id === activeTab)?.content}
      </div>
    </div>
  );
};

export default VerticalTabs;
