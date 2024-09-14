// src/components/HorizontalTabs.js
import React, { useState } from 'react';
import VerticalTabs from './VerticalTabs';
import './Horizontal.css';
import Content from './content';

const HorizontalTabs = () => {
  const [activeHorizontalTab, setActiveHorizontalTab] = useState('1');
  const [horizontalTabs, setHorizontalTabs] = useState([
    { id: '1', title: 'Applicant 1' },
    { id: '2', title: 'Applicant 2' }
  ]);
  const [verticalTabsData, setVerticalTabsData] = useState({
    '1': [
      { id: '1', title: 'Document 1', content: <Content/>}
    ],
    '2': [
      { id: '2', title: 'Document 2', content: <Content/> }
    ]
  });

  const addHorizontalTab = () => {
    const newCount = horizontalTabs.length + 1;
    const newHorizontalTab = {
      id: `${newCount}`,
      title: `Applicant ${newCount}`
    };
    setHorizontalTabs([...horizontalTabs, newHorizontalTab]);
    setActiveHorizontalTab(newHorizontalTab.id);

    // Add empty vertical tabs for new horizontal tab
    setVerticalTabsData({
      ...verticalTabsData,
      [newHorizontalTab.id]: []
    });
  };

  const removetab=(id)=>{
    setHorizontalTabs(horizontalTabs.filter(horizontalTabs => horizontalTabs.id !== id));
    if (activeHorizontalTab === id) {
      const newActiveTab = horizontalTabs.find(tab => tab.id !== id)?.id || '';
      setActiveHorizontalTab(newActiveTab);
    }

  }

  const updateVerticalTabs = (id, tabs) => {
    setVerticalTabsData({
      ...verticalTabsData,
      [id]: tabs
    });
  };

  return (<>
    <div className="horizontal-tabs">
      <div className="horizontal-tabs-list">
        {horizontalTabs.map((tab) => (
          <div
            key={tab.id}
            className={`horizontal-tab ${activeHorizontalTab === tab.id ? 'active' : ''}`}
            onClick={() => setActiveHorizontalTab(tab.id)}
          >
            {tab.title}
            <button className='close-tab-button' onClick={(e)=>{e.stopPropagation();removetab(tab.id)}}>x</button>
          </div>
        ))}
        <button className="add-tab-button" onClick={addHorizontalTab}>
          Add Horizontal Tab
        </button>
      </div><br/>
    
    </div>
    <div className="vertical-tabs-container">
    <VerticalTabs
      tabs={verticalTabsData[activeHorizontalTab] || []}
      onAddTab={(updatedTabs) => updateVerticalTabs(activeHorizontalTab, updatedTabs)}
    />
  </div></>
  );
};

export default HorizontalTabs;
