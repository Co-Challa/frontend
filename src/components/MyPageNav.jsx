import React from 'react';
import './MyPageNav.css';

export default function MyPageNav({ tabs, activeTab, onChange }) {
  return (
    <nav className="mypage_nav">
      {tabs.map((t) => (
        <button
          key={t}
          className={`mypage_nav_item ${t === activeTab ? 'active' : ''}`}
          onClick={() => onChange(t)}
        >
          {t}
        </button>
      ))}
    </nav>
  );
}
