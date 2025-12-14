"use client";

import React from 'react';
import {
  Box,
  Link,
  Button,
} from '@mui/material';

// --- BRANDING & CONSTANTS ---
const COTALIB_ORANGE = '#FF7A00';

// COMPONENT: Header Navigation Bar
const Header: React.FC = () => {
  return (
    <Box 
      component="header" 
      sx={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        padding: 2, 
        backgroundColor: 'white', 
        borderBottom: '1px solid #eee', 
        width: '100%',
        position: 'fixed',
        top: 0,
        zIndex: 1000,
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <img 
          src="/logoo.png" 
          alt="CoTalib Logo" 
          style={{ height: '32px', marginRight: '8px' }}
        />
      </Box>

      <Box>
        <Link 
          href="/connexion"
          sx={{ 
            color: COTALIB_ORANGE, 
            fontWeight: 'bold', 
            textDecoration: 'none', 
            mx: 1,
            cursor: 'pointer'
          }}
        >
          Connexion
        </Link>
        
        <Button 
          variant="contained"
          href="/inscription" 
          sx={{ 
            bgcolor: COTALIB_ORANGE, 
            '&:hover': { bgcolor: '#e67c23' }, 
            color: 'white', 
            fontWeight: 'bold',
            mx: 1
          }}
        >
          Inscription
        </Button>
      </Box>
    </Box>
  );
};

// --- Main Page Component ---
export default function PageAccueil() {
  return (
    <Box 
      sx={{ 
        minHeight: '100vh', 
        backgroundColor: 'white',
        paddingTop: '80px',
      }}
    >
      <Header />
    </Box>
  );
}