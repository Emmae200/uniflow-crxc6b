import React from 'react';
import './GlassIcons.css';

interface GlassIconItem {
  icon: React.ReactNode;
  color: string;
  label: string;
}

interface GlassIconsProps {
  items: GlassIconItem[];
  className?: string;
}

const GlassIcons: React.FC<GlassIconsProps> = ({ items, className = '' }) => {
  return (
    <div className={`glass-icons-container ${className}`}>
      {items.map((item, index) => (
        <div
          key={index}
          className="glass-icon-item"
          style={{
            '--icon-color': item.color,
            '--animation-delay': `${index * 0.2}s`
          } as React.CSSProperties}
        >
          <div className="glass-icon-wrapper">
            <div className="glass-icon">
              {item.icon}
            </div>
            <div className="glass-icon-label">
              {item.label}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default GlassIcons;

