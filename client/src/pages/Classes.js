import React, { useState, useEffect } from 'react';
import { Container, Grid, Typography } from '@mui/material';
import ClassCard from '../components/ClassCard';
import axios from '../utils/axios';

const Classes = () => {
  const [classes, setClasses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchClasses = async () => {
    console.log('Iniziando fetchClasses...');
    try {
      setLoading(true);
      const response = await axios.get('/api/classes');
      console.log('Risposta API ricevuta:', response);
      setClasses(response.data.data);
    } catch (err) {
      console.error('Errore nel caricamento delle classi:', err);
      setError('Errore nel caricamento delle classi');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    console.log('Classes component mounted');
    fetchClasses();
  }, []);

  useEffect(() => {
    console.log('Stato attuale:', {
      classes,
      loading,
      error
    });
  }, [classes, loading, error]);

  if (loading) {
    console.log('Rendering loading state...');
    return (
      <div className="p-6">
        <Typography>Caricamento classi...</Typography>
      </div>
    );
  }

  if (error) {
    console.log('Rendering error state:', error);
    return (
      <div className="p-6">
        <Typography color="error">{error}</Typography>
      </div>
    );
  }

  console.log('Rendering main content...');
  return (
    <div className="p-6">
      <Typography variant="h4" component="h1" sx={{ mb: 4 }}>
        Le mie Classi
      </Typography>

      <Grid container spacing={3}>
        {classes.map((classe) => (
          <Grid item xs={12} sm={6} md={4} key={classe._id}>
            <ClassCard classe={classe} />
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default Classes;