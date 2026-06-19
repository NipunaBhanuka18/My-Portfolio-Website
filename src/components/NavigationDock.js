'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Home, Briefcase, Code2, User, Mail } from 'lucide-react';

const dockItems = [
  { id: null, label: 'Home', icon: Home },
  { id: 'work', label: 'Work', icon: Briefcase },
  { id: 'skills', label: 'Skills', icon: Code2 },
  { id: 'about', label: 'About', icon: User },
  { id: 'contact', label: 'Contact', icon: Mail },
];

export default function NavigationDock({ activeTab, setActiveTab }) {
  return (
    <div style={{
      position: 'absolute',
      bottom: '20px',
      left: '50%',
      transform: 'translateX(-50%)',
      display: 'flex',
      gap: '12px', /* Tighter gap for narrow iPhone screens */
      padding: '10px 16px',
      background: 'rgba(0, 10, 24, 0.6)',
      backdropFilter: 'blur(20px)',
      border: '1px solid var(--color-glass-border)',
      borderRadius: '24px',
      boxShadow: '0 10px 40px rgba(0,0,0,0.8)',
      zIndex: 100
    }}>
      {dockItems.map((item) => {
        const Icon = item.icon;
        const isActive = activeTab === item.id;
        
        return (
          <button
            key={item.label}
            onClick={() => setActiveTab(item.id)}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '6px',
              background: 'transparent',
              border: 'none',
              cursor: 'pointer',
              color: isActive ? 'var(--color-neon-accent)' : 'var(--color-text-secondary)',
              transition: 'all 0.2s ease',
              padding: '8px',
              position: 'relative',
              outline: 'none'
            }}
            onMouseOver={(e) => {
              if (!isActive) {
                e.currentTarget.style.color = 'var(--color-text-primary)';
                e.currentTarget.style.transform = 'translateY(-2px)';
              }
            }}
            onMouseOut={(e) => {
              if (!isActive) {
                e.currentTarget.style.color = 'var(--color-text-secondary)';
                e.currentTarget.style.transform = 'translateY(0)';
              }
            }}
          >
            <Icon size={24} />
            <span style={{ fontSize: '0.75rem', fontWeight: 500, letterSpacing: '0.5px' }}>{item.label}</span>
            {isActive && (
              <motion.div
                layoutId="dock-indicator"
                style={{
                  position: 'absolute',
                  bottom: '-6px',
                  width: '4px',
                  height: '4px',
                  borderRadius: '50%',
                  background: 'var(--color-neon-accent)',
                  boxShadow: '0 0 8px var(--color-neon-accent)'
                }}
              />
            )}
          </button>
        );
      })}
    </div>
  );
}
