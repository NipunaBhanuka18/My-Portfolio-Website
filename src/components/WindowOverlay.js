'use client';

import React from 'react';
import { motion, useDragControls } from 'framer-motion';
import { X } from 'lucide-react';
import Tilt from 'react-parallax-tilt';

import SlRegulaAiTile from './BentoGrid/SlRegulaAiTile';
import PrimeShineTile from './BentoGrid/PrimeShineTile';
import AutoPulseTile from './BentoGrid/AutoPulseTile';
import TechRadarTile from './BentoGrid/TechRadarTile';
import NslKddTile from './BentoGrid/NslKddTile';
import BioTile from './BentoGrid/BioTile';
import ContactTile from './BentoGrid/ContactTile';

const TiltWrapper = ({ children }) => (
  <Tilt 
    tiltMaxAngleX={4} 
    tiltMaxAngleY={4} 
    glareEnable={true} 
    glareMaxOpacity={0.15} 
    glareColor="rgba(255,255,255,0.8)" 
    glarePosition="all" 
    scale={1.02} 
    transitionSpeed={1000}
    style={{ height: '100%', width: '100%', borderRadius: '16px' }}
  >
    {children}
  </Tilt>
);

export default function WindowOverlay({ activeTab, onClose }) {
  const dragControls = useDragControls();

  const renderContent = () => {
    switch (activeTab) {
      case 'work':
        return (
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
            gap: '24px' 
          }}>
            <TiltWrapper><SlRegulaAiTile /></TiltWrapper>
            <TiltWrapper><PrimeShineTile /></TiltWrapper>
            <TiltWrapper><AutoPulseTile /></TiltWrapper>
            <TiltWrapper><NslKddTile /></TiltWrapper>
          </div>
        );
      case 'skills':
        return (
          <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '24px' }}>
            <TiltWrapper><TechRadarTile /></TiltWrapper>
          </div>
        );
      case 'about':
        return (
          <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '24px' }}>
            <TiltWrapper><BioTile /></TiltWrapper>
          </div>
        );
      case 'contact':
        return (
          <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '24px' }}>
            <TiltWrapper><ContactTile /></TiltWrapper>
          </div>
        );
      default:
        return null;
    }
  };

  const getTitle = () => {
    switch (activeTab) {
      case 'work': return 'PROJECTS & ARCHITECTURE';
      case 'skills': return 'TECHNOLOGY RADAR';
      case 'about': return 'SYSTEM_BIO';
      case 'contact': return 'SECURE_COMMUNICATION';
      default: return '';
    }
  };

  return (
    <motion.div
      drag
      dragControls={dragControls}
      dragListener={false}
      dragMomentum={false}
      initial={{ opacity: 0, scale: 0.95, y: 30, x: "-50%" }}
      animate={{ opacity: 1, scale: 1, y: 0, x: "-50%" }}
      exit={{ opacity: 0, scale: 0.95, y: 30, x: "-50%" }}
      transition={{ type: 'spring', damping: 25, stiffness: 200 }}
      style={{
        position: 'fixed',
        top: '8dvh',
        left: '50%',
        width: 'calc(100vw - 30px)', /* Slightly tighter margins for small phones */
        maxWidth: '1200px',
        height: '78dvh',
        background: 'linear-gradient(135deg, rgba(5, 10, 20, 0.7) 0%, rgba(0, 5, 10, 0.85) 100%)',
        backdropFilter: 'blur(30px)',
        WebkitBackdropFilter: 'blur(30px)',
        border: '1px solid rgba(255, 255, 255, 0.08)',
        borderRadius: '16px',
        boxShadow: '0 30px 60px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.1)',
        zIndex: 50,
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden'
      }}
    >
      {/* Ultra-modern Draggable Header */}
      <div 
        onPointerDown={(e) => dragControls.start(e)}
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '20px 32px',
          borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
          background: 'rgba(0,0,0,0.2)',
          cursor: 'grab'
        }}
      >
        
        {/* Futuristic Title */}
        <div style={{ 
          fontSize: '0.75rem', 
          fontWeight: 600, 
          color: 'var(--color-neon-accent)', 
          letterSpacing: '3px',
          fontFamily: 'monospace',
          pointerEvents: 'none' /* Let drags pass through text */
        }}>
          // {getTitle()}
        </div>
        
        {/* Minimalist Close Button */}
        <button 
          onPointerDown={(e) => e.stopPropagation()} /* Prevent dragging when clicking close */
          onClick={onClose} 
          style={{ 
            background: 'rgba(255,255,255,0.05)', 
            border: '1px solid rgba(255,255,255,0.1)', 
            cursor: 'pointer', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center',
            color: 'var(--color-text-secondary)',
            borderRadius: '50%',
            width: '36px',
            height: '36px',
            transition: 'all 0.2s ease'
          }} 
          title="Close Interface"
          onMouseOver={(e) => {
            e.currentTarget.style.background = 'rgba(255, 50, 50, 0.2)';
            e.currentTarget.style.color = '#ff4444';
            e.currentTarget.style.borderColor = 'rgba(255, 50, 50, 0.3)';
            e.currentTarget.style.transform = 'rotate(90deg)';
          }} 
          onMouseOut={(e) => {
            e.currentTarget.style.background = 'rgba(255,255,255,0.05)';
            e.currentTarget.style.color = 'var(--color-text-secondary)';
            e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)';
            e.currentTarget.style.transform = 'rotate(0deg)';
          }}
        >
           <X size={16} />
        </button>
      </div>

      {/* Scrollable Content Area */}
      <div style={{
        flex: 1,
        padding: '32px',
        overflowY: 'auto',
        overflowX: 'hidden',
        // Custom subtle scrollbar
        scrollbarWidth: 'thin',
        scrollbarColor: 'var(--color-cyber-blue) transparent'
      }}>
        {renderContent()}
      </div>
    </motion.div>
  );
}
