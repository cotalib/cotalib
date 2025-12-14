"use client";

import React, { useState } from 'react';
import {
  Button,
  Box,
  Link,
  Paper,
  TextField,
  Typography,
  FormControlLabel,
  Radio,
  RadioGroup,
} from '@mui/material';

const COTALIB_ORANGE = '#FF7A00';

// COMPONENT: Header Navigation Bar
const Header: React.FC<{ onInscriptionClick?: () => void }> = ({ onInscriptionClick }) => {
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
          onClick={onInscriptionClick}
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

type FormDataUtilisateur = {
  prenom: string;
  nom: string;
  email: string;
  motDePasse: string;
  confirmMotDePasse: string;
  accepteTerms: boolean;
};

export default function InscriptionPage() {
  const [role, setRole] = useState<string>("");
  const [step, setStep] = useState<number>(1);
  const [formData, setFormData] = useState<FormDataUtilisateur>({
    prenom: "",
    nom: "",
    email: "",
    motDePasse: "",
    confirmMotDePasse: "",
    accepteTerms: false,
  });
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [emailError, setEmailError] = useState<string>("");

  // Email validation function
  const isValidEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));

    // Real-time email validation
    if (name === "email") {
      if (value && !isValidEmail(value)) {
        setEmailError("Veuillez entrer une adresse e-mail valide.");
      } else {
        setEmailError("");
      }
    }
  };

  const handleRoleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setRole(e.target.value);
  };

  const handleRoleSubmit = (): void => {
    if (!role) {
      setErrorMessage("Veuillez sélectionner votre rôle avant de continuer.");
      return;
    }
    setErrorMessage("");
    setStep(2);
  };

  const handleSubmit = (): void => {
    setErrorMessage("");

    if (!formData.prenom || !formData.nom || !formData.email || 
        !formData.motDePasse || !formData.confirmMotDePasse) {
      setErrorMessage("Tous les champs sont obligatoires.");
      return;
    }

    if (!isValidEmail(formData.email)) {
      setErrorMessage("Veuillez entrer une adresse e-mail valide.");
      return;
    }

    if (!formData.accepteTerms) {
      setErrorMessage("Vous devez accepter les conditions générales et la politique de confidentialité.");
      return;
    }

    if (formData.motDePasse !== formData.confirmMotDePasse) {
      setErrorMessage("Les mots de passe ne correspondent pas !");
      return;
    }

    if (formData.motDePasse.length < 6) {
      setErrorMessage("Le mot de passe doit contenir au moins 6 caractères.");
      return;
    }

    alert(
      `✅ Inscription réussie!\n\nRôle: ${role}\n\nDonnées enregistrées:\n- Nom: ${formData.nom}\n- Prénom: ${formData.prenom}\n- Email: ${formData.email}`
    );
    
    setFormData({
      prenom: "",
      nom: "",
      email: "",
      motDePasse: "",
      confirmMotDePasse: "",
      accepteTerms: false,
    });
    setStep(1);
    setRole("");
  };

  const handleHeaderInscriptionClick = (): void => {
    setFormData({
      prenom: "",
      nom: "",
      email: "",
      motDePasse: "",
      confirmMotDePasse: "",
      accepteTerms: false,
    });
    setStep(1);
    setRole("");
    setErrorMessage("");
    setEmailError("");
  };

  const isFormValid = (): boolean => {
    return (
      formData.prenom.trim() !== "" &&
      formData.nom.trim() !== "" &&
      formData.email.trim() !== "" &&
      isValidEmail(formData.email) &&
      formData.motDePasse.trim() !== "" &&
      formData.confirmMotDePasse.trim() !== "" &&
      formData.accepteTerms
    );
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', bgcolor: 'white' }}>
      <Header onInscriptionClick={handleHeaderInscriptionClick} />

      <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', px: 2, pt: 12, pb: 4 }}>
        
        {step === 1 ? (
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
            <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 1, color: '#000' }}>
              Qui êtes-vous ?
            </Typography>
            <Typography variant="body2" sx={{ color: '#666', mb: 4 }}>
              Choisissez votre rôle pour commencer
            </Typography>

            {errorMessage && (
              <Typography color="error" variant="body2" sx={{ mb: 2, p: 1, bgcolor: '#ffebee', borderRadius: '4px' }}>
                {errorMessage}
              </Typography>
            )}

            <Box component="div" sx={{ display: 'flex', flexDirection: 'column' }}>
              <RadioGroup 
                value={role} 
                onChange={handleRoleChange}
                sx={{ mb: 3 }}
              >
                <FormControlLabel 
                  value="Etudiant" 
                  control={<Radio sx={{ color: COTALIB_ORANGE, '&.Mui-checked': { color: COTALIB_ORANGE } }} />}
                  label="Étudiant"
                  sx={{ 
                    border: '1px solid #ddd', 
                    borderRadius: '8px', 
                    px: 2, 
                    py: 1.5, 
                    mb: 2,
                    '&:hover': { borderColor: COTALIB_ORANGE, bgcolor: '#fff9f3' },
                    transition: 'all 0.2s'
                  }}
                />
                <FormControlLabel 
                  value="Proprietaire" 
                  control={<Radio sx={{ color: COTALIB_ORANGE, '&.Mui-checked': { color: COTALIB_ORANGE } }} />}
                  label="Propriétaire"
                  sx={{ 
                    border: '1px solid #ddd', 
                    borderRadius: '8px', 
                    px: 2, 
                    py: 1.5,
                    '&:hover': { borderColor: COTALIB_ORANGE, bgcolor: '#fff9f3' },
                    transition: 'all 0.2s'
                  }}
                />
              </RadioGroup>

              <Button
                onClick={handleRoleSubmit}
                fullWidth
                variant="contained"
                sx={{
                  bgcolor: COTALIB_ORANGE,
                  color: 'white',
                  fontWeight: 'bold',
                  py: 1.5,
                  '&:hover': { bgcolor: '#e67c23', transform: 'scale(1.01)', transition: 'transform 0.1s' },
                  '&:active': { transform: 'scale(0.99)' }
                }}
              >
                Continuer
              </Button>
            </Box>
          </Paper>
        ) : (
          <Paper 
            elevation={10}
            sx={{ 
              width: '100%', 
              maxWidth: '600px', 
              padding: 5, 
              borderRadius: '16px',
              boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)'
            }}
          >
            <Typography variant="h5" sx={{ fontWeight: 'bold', textAlign: 'center', mb: 1, color: '#000' }}>
              Inscription {role === "Etudiant" ? "Étudiant" : "Propriétaire"}
            </Typography>
            <Typography variant="body2" sx={{ textAlign: 'center', color: '#666', mb: 4 }}>
              Créez votre compte CoTalib
            </Typography>

            {errorMessage && (
              <Typography color="error" variant="body2" sx={{ mb: 2, p: 1.5, bgcolor: '#ffebee', borderRadius: '4px' }}>
                {errorMessage}
              </Typography>
            )}

            <Box component="div" sx={{ display: 'flex', flexDirection: 'column' }}>
              <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2, mb: 2 }}>
                <TextField
                  label="Prénom *"
                  name="prenom"
                  value={formData.prenom}
                  onChange={handleInputChange}
                  fullWidth
                  variant="outlined"
                  size="small"
                  sx={{ 
                    '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
                      borderColor: COTALIB_ORANGE
                    }
                  }}
                />
                <TextField
                  label="Nom *"
                  name="nom"
                  value={formData.nom}
                  onChange={handleInputChange}
                  fullWidth
                  variant="outlined"
                  size="small"
                  sx={{ 
                    '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
                      borderColor: COTALIB_ORANGE
                    }
                  }}
                />
              </Box>

              <TextField
                label="Email *"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleInputChange}
                fullWidth
                variant="outlined"
                size="small"
                error={!!emailError}
                helperText={emailError}
                sx={{ mb: 2, '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: COTALIB_ORANGE } }}
              />

              <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2, mb: 2 }}>
                <TextField
                  label="Mot de Passe *"
                  name="motDePasse"
                  type="password"
                  value={formData.motDePasse}
                  onChange={handleInputChange}
                  fullWidth
                  variant="outlined"
                  size="small"
                  sx={{ 
                    '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
                      borderColor: COTALIB_ORANGE
                    }
                  }}
                />
                <TextField
                  label="Confirmer Mot de Passe *"
                  name="confirmMotDePasse"
                  type="password"
                  value={formData.confirmMotDePasse}
                  onChange={handleInputChange}
                  fullWidth
                  variant="outlined"
                  size="small"
                  sx={{ 
                    '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
                      borderColor: COTALIB_ORANGE
                    }
                  }}
                />
              </Box>

              <FormControlLabel
                control={
                  <input 
                    type="checkbox" 
                    name="accepteTerms" 
                    checked={formData.accepteTerms} 
                    onChange={handleInputChange}
                    style={{ accentColor: COTALIB_ORANGE, cursor: 'pointer', width: '18px', height: '18px' }}
                  />
                }
                label={
                  <Typography variant="body2" sx={{ color: '#333', ml: 1 }}>
                    J'accepte les{' '}
                    <Link href="/TOS" sx={{ color: COTALIB_ORANGE, fontWeight: '600' }}>
                      conditions générales et la politique de confidentialité
                    </Link>
                  </Typography>
                }
                sx={{ mb: 3, alignItems: 'flex-start' }}
              />

              <Button
                onClick={handleSubmit}
                fullWidth
                variant="contained"
                disabled={!isFormValid()}
                sx={{
                  bgcolor: isFormValid() ? COTALIB_ORANGE : '#ccc',
                  color: 'white',
                  fontWeight: 'bold',
                  py: 1.5,
                  mb: 2,
                  cursor: isFormValid() ? 'pointer' : 'not-allowed',
                  '&:hover': { 
                    bgcolor: isFormValid() ? '#e67c23' : '#ccc',
                    transform: isFormValid() ? 'scale(1.01)' : 'scale(1)',
                    transition: 'transform 0.1s' 
                  },
                  '&:active': { 
                    transform: isFormValid() ? 'scale(0.99)' : 'scale(1)'
                  }
                }}
              >
                Créer mon compte
              </Button>

              <Box sx={{ textAlign: 'center' }}>
                <Typography variant="body2" sx={{ color: '#666' }}>
                  Vous avez déjà un compte ?{' '}
                  <Link href="/connexion" sx={{ color: COTALIB_ORANGE, fontWeight: '600', textDecoration: 'none', cursor: 'pointer' }}>
                    Connexion
                  </Link>
                </Typography>
              </Box>
            </Box>
          </Paper>
        )}
      </Box>
    </Box>
  );
}