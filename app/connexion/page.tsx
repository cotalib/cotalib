'use client'; 

import React, { useState, useCallback, useEffect } from 'react';
import {
  Container,
  TextField,
  Button,
  Typography,
  Box,
  Link,
  Checkbox,
  FormControlLabel,
  Paper,
  Divider,
  CircularProgress,
} from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import NextLink from 'next/link';

// --- BRANDING & CONSTANTS ---
const COTALIB_ORANGE = '#FF7A00';

// --- TYPES ---
type UserRole = 'Etudiant' | 'Proprietaire';

interface LoginFormProps {
  onLoginSuccess: (loggedIn: boolean, userRole: UserRole | null, termsAccepted: boolean) => void;
}

interface TermsAndConditionsProps {
  onTermsAccepted: () => void;
}

interface DashboardProps {
  userRole: UserRole | null;
}

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

// --- Component 1: LoginForm ---
const LoginForm: React.FC<LoginFormProps> = ({ onLoginSuccess }) => {
  const [email, setEmail] = useState<string>('');
  const [motDePasse, setMotDePasse] = useState<string>('');
  const [rememberMe, setRememberMe] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [emailError, setEmailError] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const value = e.target.value;
    setEmail(value);
    
    if (value && !isValidEmail(value)) {
      setEmailError('Veuillez entrer une adresse e-mail valide.');
    } else {
      setEmailError('');
    }
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setMotDePasse(e.target.value);
  };

  const handleRememberMeChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setRememberMe(e.target.checked);
  };

  const handleSubmit = useCallback(
    async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
      event.preventDefault();
      setErrorMessage('');

      // Frontend validation
      if (!email.trim()) {
        setErrorMessage('Veuillez entrer votre adresse e-mail.');
        return;
      }

      if (!isValidEmail(email)) {
        setErrorMessage('Veuillez entrer une adresse e-mail valide.');
        return;
      }

      if (!motDePasse) {
        setErrorMessage('Veuillez entrer votre mot de passe.');
        return;
      }

      if (!isValidPassword(motDePasse)) {
        setErrorMessage('Le mot de passe doit contenir au moins 6 caractères.');
        return;
      }

      setIsLoading(true);

      try {
        // API call to backend (ready for integration)
        const response = await fetch('/api/auth/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: email.toLowerCase(),
            motDePasse: motDePasse,
            rememberMe: rememberMe,
          }),
        });

        if (!response.ok) {
          const errorData = await response.json();
          setErrorMessage(errorData.message || 'Erreur lors de la connexion. Veuillez réessayer.');
          setIsLoading(false);
          return;
        }

        const data = await response.json();
        const userRole: UserRole = data.role;
        const termsAccepted = data.accepteTerms;

        if (data.token) {
          localStorage.setItem('authToken', data.token);
        }

        if (data.user) {
          localStorage.setItem('user', JSON.stringify(data.user));
        }

        setIsLoading(false);
        onLoginSuccess(true, userRole, termsAccepted);
      } catch (error) {
        setIsLoading(false);
        setErrorMessage('Une erreur réseau s\'est produite. Veuillez vérifier votre connexion.');
        console.error('Login failed'); 

      }
    },
    [email, motDePasse, rememberMe, onLoginSuccess]
  );

  return (
    <Container component="main" maxWidth="xs" sx={{ p: 0 }}>
      <Paper 
        elevation={10}
        sx={{ 
          padding: 4, 
          display: 'flex', 
          flexDirection: 'column', 
          alignItems: 'center',
          borderRadius: '16px', 
          boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)',
        }}
      >
        <Box sx={{ p: 1, borderRadius: '50%', bgcolor: COTALIB_ORANGE, color: 'white', mb: 2 }} aria-label="icône de connexion">
          <LockOutlinedIcon />
        </Box>
        <Typography component="h1" variant="h5" gutterBottom>
          Connectez-vous à CoTalib
        </Typography>

        {errorMessage && (
          <Typography color="error" variant="body2" sx={{ my: 2, textAlign: 'center', p: 1.5, bgcolor: '#ffebee', borderRadius: '4px', width: '100%' }}>
            {errorMessage}
          </Typography>
        )}

        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 2, width: '100%' }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Adresse E-mail"
            name="email"
            autoComplete="email"
            autoFocus
            value={email}
            onChange={handleEmailChange}
            error={!!emailError}
            helperText={emailError}
            disabled={isLoading}
            sx={{ 
              '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': { 
                borderColor: COTALIB_ORANGE 
              } 
            }}
          />

          <TextField
            margin="normal"
            required
            fullWidth
            name="motDePasse"
            label="Mot de passe"
            type="password"
            id="motDePasse"
            autoComplete="current-password"
            value={motDePasse}
            onChange={handlePasswordChange}
            disabled={isLoading}
            sx={{ 
              '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': { 
                borderColor: COTALIB_ORANGE 
              } 
            }}
          />

          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 2, mb: 2 }}>
            <FormControlLabel
              control={
                <Checkbox
                  value="rememberMe"
                  sx={{ color: COTALIB_ORANGE, '&.Mui-checked': { color: COTALIB_ORANGE } }}
                  checked={rememberMe}
                  onChange={handleRememberMeChange}
                  disabled={isLoading}
                />
              }
              label="Se souvenir de moi"
            />
            <Link
              component={NextLink}
              href="/resetpwd"
              sx={{ 
                color: COTALIB_ORANGE,
                textDecoration: 'none',
                fontSize: '14px',
                '&:hover': { textDecoration: 'underline' }
              }}
            >
              Mot de passe oublié ?
            </Link>
          </Box>

          <Button 
            type="submit"
            fullWidth
            variant="contained"
            disabled={isLoading}
            sx={{ 
              mt: 3,
              mb: 2,
              bgcolor: COTALIB_ORANGE,
              '&:hover': { bgcolor: '#e67c23', transform: 'scale(1.01)', transition: 'transform 0.1s' },
              '&:active': { transform: 'scale(0.99)' },
              '&:disabled': { bgcolor: '#ccc' }
            }}
          >
            {isLoading ? (
              <CircularProgress size={20} color="inherit" />
            ) : (
              'Se connecter'
            )}
          </Button>

          <Divider sx={{ my: 2 }} />

          <Box sx={{ textAlign: 'center' }}>
            <Typography variant="body2">
              Vous n'avez pas de compte ?{' '}
              <Link
                href="/inscription"
                sx={{ 
                  color: COTALIB_ORANGE,
                  fontWeight: '600',
                  textDecoration: 'none',
                  '&:hover': { textDecoration: 'underline' }
                }}
              >
                Inscription
              </Link>
            </Typography>
          </Box>
        </Box>
      </Paper>
    </Container>
  );
};

// --- Component 2: TermsAndConditionsPage ---
const TermsAndConditionsPage: React.FC<TermsAndConditionsProps> = ({ onTermsAccepted }) => {
  const [hasAccepted, setHasAccepted] = useState<boolean>(false);
  const CHECKBOX_LABEL = 'J\'accepte les nouvelles Conditions Générales de Service et la Politique de Confidentialité';

  const handleAccept = (): void => {
    if (hasAccepted) {
      onTermsAccepted();
    } else {
      alert('Vous devez accepter les termes et conditions pour continuer.');
    }
  };

  return (
    <Container component="main" maxWidth="md" sx={{ p: 0 }}>
      <Paper elevation={10} sx={{ padding: 4, display: 'flex', flexDirection: 'column', alignItems: 'center', borderRadius: '16px' }}>
        <Typography component="h1" variant="h4" gutterBottom sx={{ fontWeight: 'bold' }}>
          Conditions Générales de Service (Mise à jour)
        </Typography>
        <Typography variant="body1" sx={{ mt: 2, mb: 3, textAlign: 'center' }}>
          Pour continuer, vous devez accepter les nouvelles Conditions Générales de Service et la Politique de Confidentialité.
        </Typography>

        <Box sx={{ border: '1px solid #ccc', p: 2, height: 200, overflowY: 'scroll', width: '100%', mb: 3 }}>
          <Typography variant="body2">
            **Section 1 : Généralités...**
            <br /><br />
            Votre utilisation continue de la plateforme après avoir cliqué sur la case d'acceptation signifie votre adhésion aux nouvelles conditions.
            <br /><br />
            Les présentes conditions générales s'appliquent à tous les utilisateurs de la plateforme CoTalib.
            <br /><br />
            ... (Contenu détaillé des CGS)
          </Typography>
        </Box>

        <FormControlLabel
          control={
            <Checkbox
              checked={hasAccepted}
              sx={{ color: COTALIB_ORANGE, '&.Mui-checked': { color: COTALIB_ORANGE } }}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setHasAccepted(e.target.checked)}
              inputProps={{ 'aria-label': 'J\'accepte les Conditions Générales de Service' }}
            />
          }
          label={CHECKBOX_LABEL}
          sx={{ mb: 3, textAlign: 'left' }}
        />

        <Button 
          variant="contained"
          onClick={handleAccept}
          disabled={!hasAccepted}
          sx={{ 
            bgcolor: COTALIB_ORANGE,
            '&:hover': { bgcolor: '#e67c23', transform: 'scale(1.02)', transition: 'transform 0.1s' },
            '&:active': { transform: 'scale(0.98)' },
            '&:disabled': { bgcolor: '#ccc' }
          }}
        >
          Accéder à mon tableau de bord
        </Button>
      </Paper>
    </Container>
  );
};

// --- Component 3: Dashboard ---
const Dashboard: React.FC<DashboardProps> = ({ userRole }) => {
  const dashboardTitle = userRole === 'Etudiant' ? 'Dashboard Étudiant' : 'Dashboard Propriétaire';

  return (
    <Container component="main" maxWidth="sm" sx={{ p: 0 }}>
      <Paper elevation={10} sx={{ padding: 4, textAlign: 'center', borderRadius: '16px' }}>
        <Typography component="h1" variant="h4" sx={{ color: COTALIB_ORANGE, fontWeight: 'bold' }} gutterBottom>
          ✅ Authentification Réussie
        </Typography>
        <Typography variant="h6" sx={{ color: COTALIB_ORANGE }}>
          Accès à l'espace personnel : {dashboardTitle}
        </Typography>
      </Paper>
    </Container>
  );
};

// --- Component 4: AuthFlowContainer ---
export const AuthFlowContainer: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [role, setRole] = useState<UserRole | null>(null);
  const [termsAccepted, setTermsAccepted] = useState<boolean>(true);

  const handleLoginSuccess = useCallback((loggedIn: boolean, userRole: UserRole | null, acceptedTerms: boolean): void => {
    setIsLoggedIn(loggedIn);
    setRole(userRole);
    setTermsAccepted(acceptedTerms);
  }, []);

  const handleTermsAccepted = useCallback((): void => {
    setTermsAccepted(true);
  }, []);

  let componentToRender: React.ReactNode;

  if (!isLoggedIn) {
    componentToRender = <LoginForm onLoginSuccess={handleLoginSuccess} />;
  } else if (isLoggedIn && !termsAccepted) {
    componentToRender = <TermsAndConditionsPage onTermsAccepted={handleTermsAccepted} />;
  } else {
    componentToRender = <Dashboard userRole={role} />;
  }

  return (
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
      {componentToRender}
    </Box>
  );
};

// --- Main Page Component ---
export default function ConnexionPage() {
  const [isMounted, setIsMounted] = useState<boolean>(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <Box sx={{ minHeight: '100vh' }}>
      <Header />
      <AuthFlowContainer />
    </Box>
  );
}