import React, { useState, useRef, useEffect } from 'react';
import { IonPage, IonContent, IonButton, IonIcon } from '@ionic/react';
import { search, save, chevronBack } from 'ionicons/icons';
import { useHistory } from 'react-router-dom';

import BottomNavigation from '../components/BottomNavigation';
import './Jotting.css';

const Jotting: React.FC = () => {
  const history = useHistory();
  const [content, setContent] = useState('');
  const [isKeyboardMode, setIsKeyboardMode] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [lastPoint, setLastPoint] = useState({ x: 0, y: 0 });

  // Handle triple tap to switch to keyboard mode
  const handleTripleTap = () => {
    setIsKeyboardMode(true);
    setTimeout(() => {
      if (textareaRef.current) {
        textareaRef.current.focus();
      }
    }, 100);
  };

  // Handle canvas drawing
  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (isKeyboardMode) return;
    
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    setIsDrawing(true);
    setLastPoint({ x, y });

    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.beginPath();
      ctx.moveTo(x, y);
      ctx.strokeStyle = '#2c5f2c';
      ctx.lineWidth = 2;
      ctx.lineCap = 'round';
    }
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing || isKeyboardMode) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.lineTo(x, y);
      ctx.stroke();
    }

    setLastPoint({ x, y });
  };

  const stopDrawing = () => {
    setIsDrawing(false);
  };

  // Handle touch events for mobile
  const handleTouchStart = (e: React.TouchEvent<HTMLCanvasElement>) => {
    if (isKeyboardMode) return;
    
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const touch = e.touches[0];
    const x = touch.clientX - rect.left;
    const y = touch.clientY - rect.top;

    setIsDrawing(true);
    setLastPoint({ x, y });

    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.beginPath();
      ctx.moveTo(x, y);
      ctx.strokeStyle = '#2c5f2c';
      ctx.lineWidth = 2;
      ctx.lineCap = 'round';
    }
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDrawing || isKeyboardMode) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const touch = e.touches[0];
    const x = touch.clientX - rect.left;
    const y = touch.clientY - rect.top;

    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.lineTo(x, y);
      ctx.stroke();
    }

    setLastPoint({ x, y });
  };

  const handleTouchEnd = () => {
    setIsDrawing(false);
  };

  // Handle save functionality
  const handleSave = () => {
    // Save the content to local storage
    console.log('Saving jotting:', content);
    // For now, just show an alert
    alert('Jotting saved!');
  };

  // Handle search functionality
  const handleSearch = () => {
    console.log('Search clicked');
    // Navigate to search functionality
    history.push('/home');
  };

  // Handle back navigation
  const handleBack = () => {
    history.goBack();
  };

  // Initialize canvas size
  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      const resizeCanvas = () => {
        const container = canvas.parentElement;
        if (container) {
          canvas.width = container.clientWidth;
          canvas.height = container.clientHeight;
        }
      };

      resizeCanvas();
      window.addEventListener('resize', resizeCanvas);
      return () => window.removeEventListener('resize', resizeCanvas);
    }
  }, []);

  return (
    <IonPage>
      <IonContent fullscreen className="jotting-screen">
        {/* Status Bar Spacer */}
        <div className="status-bar-spacer"></div>
        
        {/* Header */}
        <div className="jotting-header">
          <button className="back-button" onClick={handleBack}>
            <IonIcon icon={chevronBack} />
          </button>
          <div className="header-content">
            <h1 className="jotting-title">Jotting</h1>
          </div>
          <div className="header-actions">
            <button className="search-btn" onClick={handleSearch}>
              <IonIcon icon={search} />
            </button>
            <button className="save-btn" onClick={handleSave}>
              <IonIcon icon={save} />
            </button>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="jotting-content">
          {isKeyboardMode ? (
            <textarea
              ref={textareaRef}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Start typing your jotting..."
              className="jotting-textarea"
              onBlur={() => {
                // Switch back to drawing mode when textarea loses focus
                setTimeout(() => setIsKeyboardMode(false), 100);
              }}
            />
          ) : (
            <>
              <canvas
                ref={canvasRef}
                className="jotting-canvas"
                onMouseDown={startDrawing}
                onMouseMove={draw}
                onMouseUp={stopDrawing}
                onMouseLeave={stopDrawing}
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
                onClick={handleTripleTap}
              />
              <div className="jotting-instruction">
                Write on this page with a pen or triple tap for keyboard
              </div>
            </>
          )}
        </div>

        {/* Bottom Navigation */}
        <BottomNavigation />
      </IonContent>
    </IonPage>
  );
};

export default Jotting;
