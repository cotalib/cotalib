'use client';

import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
  TextField,
  Typography,
  Paper,
  Link,
} from '@mui/material';

// --- BRANDING & CONSTANTS ---
const COTALIB_ORANGE = '#FF7A00';

// --- VALIDATION FUNCTIONS ---
const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

const isValidPassword = (password: string): boolean => {
  return password.length >= 6;
};

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

export default function ResetPassword() {
  const [isMounted, setIsMounted] = useState<boolean>(false);
  const [step, setStep] = useState<number>(1);
  const [email, setEmail] = useState<string>('');
  const [emailError, setEmailError] = useState<string>('');
  const [code, setCode] = useState<string>('');
  const [codeError, setCodeError] = useState<string>('');
  const [motDePasse, setMotDePasse] = useState<string>('');
  const [confirmMotDePasse, setConfirmMotDePasse] = useState<string>('');
  const [passwordError, setPasswordError] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Step 1: Email validation
  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const value = e.target.value;
    setEmail(value);
    
    if (value && !isValidEmail(value)) {
      setEmailError('Veuillez entrer une adresse e-mail valide.');
    } else {
      setEmailError('');
    }
  };

  const handleEmailSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    setEmailError('');

    if (!email.trim()) {
      setEmailError('Veuillez entrer votre adresse e-mail.');
      return;
    }

    if (!isValidEmail(email)) {
      setEmailError('Veuillez entrer une adresse e-mail valide.');
      return;
    }

    alert('Code de réinitialisation envoyé à votre adresse email');

    setStep(2);
  };

  // Step 2: Code validation
  const handleCodeChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setCode(e.target.value);
    setCodeError('');
  };

  const handleCodeSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    setCodeError('');

    if (!code.trim()) {
      setCodeError('Veuillez entrer le code reçu par email.');
      return;
    }

    if (code.length < 4) {
      setCodeError('Le code doit contenir au moins 4 caractères.');
      return;
    }

    alert('Code vérifié avec succès.');
    setStep(3);
  };

  // Step 3: Password reset
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setMotDePasse(e.target.value);
    setPasswordError('');
  };

  const handleConfirmPasswordChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setConfirmMotDePasse(e.target.value);
    setPasswordError('');
  };

  const handleNewPasswordSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    setPasswordError('');

    // Validation
    if (!motDePasse) {
      setPasswordError('Veuillez entrer un nouveau mot de passe.');
      return;
    }

    if (!confirmMotDePasse) {
      setPasswordError('Veuillez confirmer votre mot de passe.');
      return;
    }

    if (!isValidPassword(motDePasse)) {
      setPasswordError('Le mot de passe doit contenir au moins 6 caractères.');
      return;
    }

    if (motDePasse !== confirmMotDePasse) {
      setPasswordError('Les mots de passe ne correspondent pas !');
      return;
    }

    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      alert('Mot de passe réinitialisé avec succès ! Vous pouvez maintenant vous connecter.');
      
      // Reset form
      setStep(1);
      setEmail('');
      setCode('');
      setMotDePasse('');
      setConfirmMotDePasse('');
      setPasswordError('');
    }, 1000);
  };

  if (!isMounted) {
    return null;
  }

  return (
    <Box sx={{ minHeight: '100vh', backgroundColor: '#ffffff' }}>
      <Header />

      <Box 
        sx={{ 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center', 
          minHeight: '100vh', 
          paddingTop: 8,
          backgroundColor: '#ffffff',
          boxSizing: 'border-box'
        }}
      >
        {/* STEP 1: Enter Email */}
        {step === 1 && (
          <Paper 
            elevation={10}
            sx={{ 
              width: '100%', 
              maxWidth: '480px', 
              padding: 5, 
              borderRadius: '16px',
              boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)',
              textAlign: 'center'
            }}
          >
            <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 2, color: '#000' }}>
              Réinitialisation de mot de passe
            </Typography>
            <Typography variant="body2" sx={{ color: '#666', mb: 3 }}>
              Entrez votre email pour recevoir le code de réinitialisation
            </Typography>

            <Box component="form" onSubmit={handleEmailSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <TextField
                type="email"
                label="Adresse Email *"
                value={email}
                onChange={handleEmailChange}
                placeholder="Entrer votre email"
                fullWidth
                error={!!emailError}
                helperText={emailError}
                sx={{ 
                  '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': { 
                    borderColor: COTALIB_ORANGE 
                  } 
                }}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                disabled={!email || !!emailError}
                sx={{
                  bgcolor: (email && !emailError) ? COTALIB_ORANGE : '#ccc',
                  '&:hover': { 
                    bgcolor: (email && !emailError) ? '#e67c23' : '#ccc'
                  },
                  color: 'white',
                  fontWeight: 'bold',
                  py: 1.5,
                  cursor: (email && !emailError) ? 'pointer' : 'not-allowed'
                }}
              >
                Envoyer
              </Button>
            </Box>
          </Paper>
        )}

        {/* STEP 2: Enter Code */}
        {step === 2 && (
          <Paper 
            elevation={10}
            sx={{ 
              width: '100%', 
              maxWidth: '480px', 
              padding: 5, 
              borderRadius: '16px',
              boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)',
              textAlign: 'center'
            }}
          >
            <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 2, color: '#000' }}>
              Réinitialisation de mot de passe
            </Typography>
            <Typography variant="body2" sx={{ color: '#666', mb: 3 }}>
              Saisissez le code reçu par email
            </Typography>

            <Box component="form" onSubmit={handleCodeSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <TextField
                type="text"
                label="Code de vérification *"
                value={code}
                onChange={handleCodeChange}
                placeholder="Entrer le code"
                fullWidth
                error={!!codeError}
                helperText={codeError}
                sx={{ 
                  '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': { 
                    borderColor: COTALIB_ORANGE 
                  } 
                }}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                disabled={!code || !!codeError}
                sx={{
                  bgcolor: (code && !codeError) ? COTALIB_ORANGE : '#ccc',
                  '&:hover': { 
                    bgcolor: (code && !codeError) ? '#e67c23' : '#ccc'
                  },
                  color: 'white',
                  fontWeight: 'bold',
                  py: 1.5,
                  cursor: (code && !codeError) ? 'pointer' : 'not-allowed'
                }}
              >
                Confirmer
              </Button>
            </Box>
          </Paper>
        )}

        {/* STEP 3: New Password */}
        {step === 3 && (
          <Paper 
            elevation={10}
            sx={{ 
              width: '100%', 
              maxWidth: '480px', 
              padding: 5, 
              borderRadius: '16px',
              boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)',
              textAlign: 'center'
            }}
          >
            <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 2, color: '#000' }}>
              Réinitialisation de mot de passe
            </Typography>
            <Typography variant="body2" sx={{ color: '#666', mb: 3 }}>
              Entrez votre nouveau mot de passe
            </Typography>

            {passwordError && (
              <Typography color="error" variant="body2" sx={{ mb: 2, p: 1.5, bgcolor: '#ffebee', borderRadius: '4px' }}>
                {passwordError}
              </Typography>
            )}

            <Box component="form" onSubmit={handleNewPasswordSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <TextField
                type="password"
                label="Nouveau mot de passe *"
                value={motDePasse}
                onChange={handlePasswordChange}
                placeholder="Nouveau mot de passe"
                fullWidth
                disabled={isLoading}
                sx={{ 
                  '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': { 
                    borderColor: COTALIB_ORANGE 
                  } 
                }}
              />
              <TextField
                type="password"
                label="Confirmer le mot de passe *"
                value={confirmMotDePasse}
                onChange={handleConfirmPasswordChange}
                placeholder="Confirmer le mot de passe"
                fullWidth
                disabled={isLoading}
                sx={{ 
                  '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': { 
                    borderColor: COTALIB_ORANGE 
                  } 
                }}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                disabled={!motDePasse || !confirmMotDePasse || isLoading}
                sx={{
                  bgcolor: (motDePasse && confirmMotDePasse && !isLoading) ? COTALIB_ORANGE : '#ccc',
                  '&:hover': { 
                    bgcolor: (motDePasse && confirmMotDePasse && !isLoading) ? '#e67c23' : '#ccc'
                  },
                  color: 'white',
                  fontWeight: 'bold',
                  py: 1.5,
                  cursor: (motDePasse && confirmMotDePasse && !isLoading) ? 'pointer' : 'not-allowed'
                }}
              >
                {isLoading ? 'Réinitialisation...' : 'Réinitialiser le mot de passe'}
              </Button>
            </Box>
          </Paper>
        )}
      </Box>
    </Box>
  );
}