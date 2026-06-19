'use client';

import React from 'react';
import Image from 'next/image';
import { Dumbbell, Leaf, MapPin, Terminal } from 'lucide-react';

export default function BioTile() {
  return (
    <div style={{ 
      display: 'grid', 
      gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
      gap: '30px', 
      width: '100%', 
      height: '100%' 
    }}>
      
      {/* Left Column: Core Identity */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', justifyContent: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          <div style={{ 
            width: '100px', 
            height: '100px', 
            borderRadius: '50%', 
            overflow: 'hidden', 
            border: '2px solid var(--color-neon-accent)',
            flexShrink: 0,
            boxShadow: '0 0 20px rgba(0, 240, 255, 0.2)'
          }}>
            <Image 
              src="/avatar.png" 
              alt="Avatar" 
              width={100} 
              height={100} 
              style={{ objectFit: 'cover' }}
            />
          </div>
          <div>
            <h2 style={{ fontSize: '1.8rem', color: 'var(--color-text-primary)', margin: '0 0 5px 0' }}>Nipuna Bhanuka</h2>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--color-text-secondary)', fontSize: '0.9rem' }}>
              <Terminal size={14} color="var(--color-neon-accent)" /> AI Undergraduate
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--color-text-secondary)', fontSize: '0.9rem', marginTop: '4px' }}>
              <MapPin size={14} color="#27c93f" /> Colombo, Sri Lanka
            </div>
          </div>
        </div>

        <div style={{ fontSize: '0.95rem', color: 'var(--color-text-secondary)', lineHeight: 1.6, marginTop: '10px' }}>
          Passionate about building highly scalable systems and deterministic AI integrations. I treat software architecture the same way I treat my personal discipline: <strong style={{color: 'var(--color-text-primary)'}}>with rigorous consistency and constant optimization.</strong>
        </div>
      </div>

      {/* Right Column: Values */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', justifyContent: 'center' }}>
        
        {/* Fitness Card */}
        <div style={{ 
          background: 'rgba(255,255,255,0.03)', 
          border: '1px solid rgba(255,255,255,0.05)',
          borderRadius: '16px', 
          padding: '20px', 
          display: 'flex', 
          flexDirection: 'column', 
          gap: '10px',
          transition: 'transform 0.2s',
          cursor: 'default'
        }}
        onMouseOver={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.06)'}
        onMouseOut={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.03)'}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: 'var(--color-neon-accent)' }}>
            <Dumbbell size={20} />
            <span style={{ fontSize: '1rem', fontWeight: 600, letterSpacing: '1px' }}>THE DISCIPLINE</span>
          </div>
          <p style={{ fontSize: '0.85rem', color: 'var(--color-text-secondary)', margin: 0, lineHeight: 1.5 }}>
            Heavy lifting and strict routines aren't just for fitness. They train the mind for the long-term focus required to debug complex distributed systems.
          </p>
        </div>

        {/* Nature Card */}
        <div style={{ 
          background: 'rgba(255,255,255,0.03)', 
          border: '1px solid rgba(255,255,255,0.05)',
          borderRadius: '16px', 
          padding: '20px', 
          display: 'flex', 
          flexDirection: 'column', 
          gap: '10px',
          transition: 'transform 0.2s',
          cursor: 'default'
        }}
        onMouseOver={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.06)'}
        onMouseOut={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.03)'}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#27c93f' }}>
            <Leaf size={20} />
            <span style={{ fontSize: '1rem', fontWeight: 600, letterSpacing: '1px' }}>THE PERSPECTIVE</span>
          </div>
          <p style={{ fontSize: '0.85rem', color: 'var(--color-text-secondary)', margin: 0, lineHeight: 1.5 }}>
            Stepping away from the IDE and into nature provides the clarity needed for architectural breakthroughs and elegant algorithmic solutions.
          </p>
        </div>

      </div>

    </div>
  );
}
