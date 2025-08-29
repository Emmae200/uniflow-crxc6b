import React from 'react';
import { useHistory } from 'react-router-dom';
import './PageHeader.css';

interface PageHeaderProps {
  title: string;
  showBackButton?: boolean;
  showStatusBar?: boolean;
  backgroundColor?: string;
  textColor?: string;
  onBackClick?: () => void;
  rightContent?: React.ReactNode;
  children?: React.ReactNode;
}

const PageHeader: React.FC<PageHeaderProps> = ({
  title,
  showBackButton = true,
  showStatusBar = true,
  backgroundColor = '#447055',
  textColor = 'white',
  onBackClick,
  rightContent,
  children
}) => {
  const history = useHistory();

  const handleBackClick = () => {
    if (onBackClick) {
      onBackClick();
    } else {
      history.goBack();
    }
  };

  return (
    <>
      {/* Status Bar Spacer */}
      {showStatusBar && <div className="status-bar-spacer"></div>}
      
      {/* Header */}
      <div 
        className="page-header"
        style={{ 
          backgroundColor,
          color: textColor
        }}
      >
        <div className="header-left">
          {showBackButton && (
            <button className="back-button" onClick={handleBackClick}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"/>
              </svg>
            </button>
          )}
        </div>
        
        <div className="header-center">
          <h1 className="page-title">{title}</h1>
          {children}
        </div>
        
        <div className="header-right">
          {rightContent}
        </div>
      </div>
    </>
  );
};

export default PageHeader;
