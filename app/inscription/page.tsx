"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
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
  Checkbox,
  Snackbar,
  Alert,
  CircularProgress,
} from '@mui/material';

// Define constant for CoTalib orange color and branding
const COTALIB_ORANGE = '#FF7A00';

// Main Component: InscriptionPage
type FormDataUtilisateur = {
  prenom: string;
  nom: string;
  email: string;
  motDePasse: string;
  confirmMotDePasse: string;
  accepteTerms: boolean;
};
// Component: Header Navigation Bar
const Header: React.FC<{ onInscriptionClick?: () => void }> = ({ onInscriptionClick }) => {
  return (
    <Box // Header Container
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
    > {/* Logo Section */}
      <Box sx={{ display: 'flex', alignItems: 'center' }}> 
        <img 
          src="/logoo.png" 
          alt="CoTalib Logo" 
          style={{ height: '32px', marginRight: '8px' }}
        />
      </Box>
      {/* Navigation Links Section : Connextion | Inscription */}
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

// Inscription Page Component
export default function InscriptionPage() {
  const router = useRouter(); // Next.js router for navigation
  const [isLoading, setIsLoading] = useState(false); // Loading state for spinner
  // State variables for role, step, form data, and error messages
  const [role, setRole] = useState<string>(""); // "Etudiant" or "Proprietaire"
  const [step, setStep] = useState<number>(1); // 1: Role Selection, 2: Registration Form
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
  const [successOpen, setSuccessOpen] = useState(false);


  // Helper Functions : isValidEmail checks email format and FormisValid checks overall form validity.
  const isValidEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; 
    return emailRegex.test(email); 
  };
  const formIsValid =
    formData.prenom.trim() !== "" &&
    formData.nom.trim() !== "" &&
    formData.email.trim() !== "" &&
    isValidEmail(formData.email) &&
    formData.motDePasse.trim() !== "" &&
    formData.confirmMotDePasse.trim() !== "" &&
    formData.accepteTerms;

// This function handles changes to input fields and updates the form data state accordingly.
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value, type, checked } = e.target; // Destructure event target 
    setFormData((prev) => ({ // Update form data state
      ...prev, 
      [name]: type === "checkbox" ? checked : value, // Handle checkbox separately
    }));

    // Real-time email validation
    if (name === "email") { // Check if the changed field is email
      if (value && !isValidEmail(value)) { // Validate email format
        setEmailError("Veuillez entrer une adresse e-mail valide."); // Set error if invalid
      } else {
        setEmailError(""); // Clear error if valid
      }
    }
  };

// This function updates the selected role state when a radio button is changed.
  const handleRoleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setRole(e.target.value);
  };
// This function handles the role selection submission by checking if a role is selected and advancing to the next step or displaying an error message.
  const handleRoleSubmit = (): void => {
    if (!role) {
      setErrorMessage("Veuillez sélectionner votre rôle avant de continuer.");
      return;
    }
    setErrorMessage("");
    setStep(2);
  };
// This function handles the form submission by validating all fields and displaying appropriate error messages or success alerts.
const handleSubmit = async (): Promise<void> => { // Form submission handler
  setErrorMessage(""); // Clear previous error messages
  // Validate required fields
  if (!formData.prenom || !formData.nom || !formData.email || 
      !formData.motDePasse || !formData.confirmMotDePasse) {
    setErrorMessage("Tous les champs sont obligatoires."); 
    return;
  }
  // Validate email format
  if (!isValidEmail(formData.email)) {
    setErrorMessage("Veuillez entrer une adresse e-mail valide.");
    return;
  }
  // Validate password length
  if (!formData.accepteTerms) {
    setErrorMessage("Vous devez accepter les conditions générales et la politique de confidentialité.");
    return;
  }
  // Validate password match
  if (formData.motDePasse !== formData.confirmMotDePasse) {
    setErrorMessage("Les mots de passe ne correspondent pas !");
    return;
  }
  // Validate password length
  const MIN_PASSWORD_LENGTH = 6;
  if (formData.motDePasse.length < MIN_PASSWORD_LENGTH) {
    setErrorMessage("Le mot de passe doit contenir au moins 6 caractères.");
    return;
  }
  setIsLoading(true); // Start the spinner if validations pass
  
    try {
      const registerRequest = { // Prepare registration request payload
        firstname: formData.prenom,
        lastname: formData.nom,
        email: formData.email,
        password: formData.motDePasse,
        role: role === "Etudiant" ? "STUDENT" : "HOUSE_OWNER"
      };
      // Make API call to register the user
      const response = await fetch('http://localhost:8080/api/v1/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(registerRequest),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem('token', data.token);
        setSuccessOpen(true); // This shows the "Success" message/alert

        // INSTEAD OF RESETTING STATE, WE REDIRECT:
        setTimeout(() => {
          router.push('/dashboard'); 
        }, 2000);

      } else {
        // Backend error (e.g., 403 Forbidden or 400 Bad Request)
        setErrorMessage("Cet email est déjà utilisé ou les données sont invalides.");
      }
    } catch (error) {
      setErrorMessage("Erreur de connexion au serveur.");
    } finally {
      setIsLoading(false); // Stop the spinner
    }
  };

// This function resets the form and navigates back to the first step when the "Inscription" button in the header is clicked.
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

  return (
    // Main Container for the Inscription Page 
  <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', bgcolor: 'white' }}>
    {/* Header Component with Inscription Button Handler */}
    <Header onInscriptionClick={handleHeaderInscriptionClick} />
    {/* Main Content Area */}
    <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', px: 2, pt: 12, pb: 4 }}>
      {/* Step 1: Role Selection */}
      {step === 1 ? (
        <Paper // Role Selection Card
          elevation={10} // Shadow Effect
          sx={{  // Styling
            width: '100%', 
            maxWidth: '480px', 
            padding: 5, 
            borderRadius: '16px',
            boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)',
            textAlign: 'center'
          }}
        > 
          {/* Title */}
          <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 1, color: '#000' }}> 
            Qui êtes-vous ?
          </Typography>
          {/* Subtitle for role selection */}
          <Typography variant="body2" sx={{ color: '#666', mb: 4 }}>
            Choisissez votre rôle pour commencer
          </Typography>
          {/* Error Message for role selection */}
          {errorMessage && (
            <Typography color="error" variant="body2" sx={{ mb: 2, p: 1, bgcolor: '#ffebee', borderRadius: '4px' }}>
              {errorMessage}
            </Typography>
          )}

          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
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
                transition: 'transform 0.1s',
                '&:hover': { 
                  bgcolor: '#e67c23', 
                  transform: 'scale(1.01)'
                },
                '&:active': { 
                  transform: 'scale(0.99)' 
                }
              }}
            >
              Continuer
            </Button>
          </Box>
        </Paper>
      ) : (
        <Paper // Registration Form Card
          elevation={10}
          sx={{
            width: '100%',
            maxWidth: '600px',
            padding: 5,
            borderRadius: '16px',
            boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)'
          }}
        >
        {/*Registration Form */}
          {/* Title for the Registration Form */}
          <Typography variant="h5" sx={{ fontWeight: 'bold', textAlign: 'center', mb: 1, color: '#000' }}>
            Inscription {role === "Etudiant" ? "Étudiant" : "Propriétaire"}
          </Typography>
          {/* Subtitle for the Registration Form */}
          <Typography variant="body2" sx={{ textAlign: 'center', color: '#666', mb: 4 }}>
            Créez votre compte CoTalib
          </Typography>
          {/* Error Message for the Registration Form */}
          {errorMessage && (
            <Typography color="error" variant="body2" sx={{ mb: 2, p: 1.5, bgcolor: '#ffebee', borderRadius: '4px' }}>
              {errorMessage}
            </Typography>
          )}
          {/* Registration Form Fields */}
          <Box sx={{ display: 'flex', flexDirection: 'column' }}> {/* Creates a column layout*/}
            <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2, mb: 2 }}> {/* Creates a grid layout for first name and last name */}
              <TextField // First Name Field
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
              <TextField // Last Name Field
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

            <TextField // Email Field
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
              sx={{
                mb: 2,
                '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': { 
                  borderColor: COTALIB_ORANGE 
                }
              }}
            />

            <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2, mb: 2 }}> {/* Grid layout for password and confirm password */}
              <TextField // Password Field
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
              <TextField // Confirm Password Field
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
      
            <FormControlLabel // Terms and Conditions Checkbox
              control={
                <Checkbox
                  name="accepteTerms"
                  checked={formData.accepteTerms}
                  onChange={handleInputChange}
                  sx={{
                    color: COTALIB_ORANGE,
                    '&.Mui-checked': { color: COTALIB_ORANGE }
                  }}
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
              sx={{ mb: 3, alignItems: 'center' }} // changed flex-start -> center
            />


    <Button
        onClick={handleSubmit}
        fullWidth
        variant="contained"
        // The button is disabled if the form is invalid OR if a request is already in progress
        disabled={!formIsValid || isLoading}
        sx={{
          bgcolor: COTALIB_ORANGE,
          color: 'white',
          fontWeight: 'bold',
          py: 1.5,
          mb: 2,
          height: '48px', // Fixed height so the button doesn't jump when the spinner appears
          transition: 'transform 0.1s, background-color 0.2s',
          '&:hover': {
            bgcolor: '#e67c23', // Slightly darker orange on hover
            transform: 'scale(1.01)',
          },
          '&:active': {
            transform: 'scale(0.99)'
          },
          '&.Mui-disabled': {
            bgcolor: isLoading ? COTALIB_ORANGE : '#ccc', // Keep orange if loading, grey if invalid
            color: 'white',
            opacity: 0.7,
            cursor: 'not-allowed'
          }
        }}
      >
        {isLoading ? (
          <CircularProgress size={24} color="inherit" />
        ) : (
          "Créer mon compte"
        )}
      </Button>
            {/* Link to login page */}
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
  <Snackbar
  open={successOpen}
  autoHideDuration={2000}
  onClose={() => setSuccessOpen(false)}
  anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
>
  <Alert severity="success" sx={{ width: '100%' }}>
    Inscription réussie !
  </Alert>
</Snackbar>
  </Box>
);
}