import React, { useState, useEffect } from 'react';
import { Container, Grid, Typography, Button, Box } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import ClassCard from '../components/ClassCard';
import ClassFormDialog from '../components/ClassFormDialog';
import axios from 'axios';

const Classes = () => {
  const [classes, setClasses] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Funzione per caricare le classi
  const fetchClasses = async () => {
    console.log('Iniziando fetchClasses...'); // Debug log
    try {
      setLoading(true);
      console.log('Facendo richiesta API...'); // Debug log
      const response = await axios.get('/api/classes');
      console.log('Risposta API ricevuta:', response); // Debug log
      setClasses(response.data.data);
    } catch (err) {
      console.error('Errore nel caricamento delle classi:', err);
      setError('Errore nel caricamento delle classi');
    } finally {
      setLoading(false);
      console.log('Loading completato'); // Debug log
    }
  };

  useEffect(() => {
    console.log('Classes component mounted'); // Debug log
    fetchClasses();
  }, []);

  // Debug log per stato
  useEffect(() => {
    console.log('Stato attuale:', {
      classes,
      loading,
      error,
      openDialog
    });
  }, [classes, loading, error, openDialog]);

  if (loading) {
    console.log('Rendering loading state...'); // Debug log
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Typography>Caricamento classi...</Typography>
      </Container>
    );
  }

  if (error) {
    console.log('Rendering error state:', error); // Debug log
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Typography color="error">{error}</Typography>
      </Container>
    );
  }

  console.log('Rendering main content...'); // Debug log
  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 4 }}>
        <Typography variant="h4" component="h1">
          Le mie Classi
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => setOpenDialog(true)}
          sx={{
            background: (theme) => 
              `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
            color: 'white',
            '&:hover': {
              background: (theme) => 
                `linear-gradient(45deg, ${theme.palette.primary.dark}, ${theme.palette.secondary.dark})`,
            }
          }}
        >
          Aggiungi Classe
        </Button>
      </Box>

      <Grid container spacing={3}>
        {classes.map((classe) => (
          <Grid item xs={12} sm={6} md={4} key={classe._id}>
            <ClassCard
              classe={classe}
              onEdit={handleEditClass}
              onDelete={handleDeleteClass}
            />
          </Grid>
        ))}
      </Grid>

      <ClassFormDialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        onSubmit={handleAddClass}
      />
    </Container>
  );
};

export default Classes;