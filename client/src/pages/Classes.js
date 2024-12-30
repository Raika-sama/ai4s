import React, { useState, useEffect } from 'react';
import { 
    Container, 
    Grid, 
    Typography, 
    Box, 
    CircularProgress,
    Alert
} from '@mui/material';
import ClassCard from '../components/ClassCard';
import axios from '../utils/axios';

const Classes = () => {
  const [classes, setClasses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchClasses = async () => {
    try {
      setLoading(true);
      
      // Prima verifichiamo l'utente e la sua scuola
      const userResponse = await axios.get('/api/users/me');
      console.log('User data:', userResponse.data);
      
      const response = await axios.get('/api/classes');
      console.log('Classes response:', response.data);

      if (response.data.success && Array.isArray(response.data.data)) {
        setClasses(response.data.data);
        console.log('Classes set:', response.data.data);
      } else {
        console.log('Invalid response format:', response.data);
        throw new Error('Formato risposta non valido');
      }
    } catch (err) {
      console.error('Fetch error:', err);
      setError(err.message || 'Errore nel caricamento delle classi');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchClasses();
  }, []);

  // Debug render
  useEffect(() => {
    console.log('Current state:', { classes, loading, error });
  }, [classes, loading, error]);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="200px">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Classi
      </Typography>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      {!error && classes.length === 0 && (
        <Box>
          <Alert severity="info" sx={{ mb: 2 }}>
            Non ci sono classi associate a questa scuola
          </Alert>
          {/* Modifica qui: rimosso Typography e utilizzato Box per il debug info */}
          <Box sx={{ 
            mt: 2, 
            p: 2, 
            bgcolor: 'background.paper',
            borderRadius: 1
          }}>
            <Typography variant="subtitle2" color="textSecondary" gutterBottom>
              Debug info:
            </Typography>
            <pre style={{ 
              margin: 0,
              padding: '8px',
              backgroundColor: '#f5f5f5',
              borderRadius: '4px',
              overflow: 'auto'
            }}>
              {JSON.stringify({
                classesLength: classes.length,
                error: error,
                loading: loading
              }, null, 2)}
            </pre>
          </Box>
        </Box>
      )}

      {classes.length > 0 && (
        <Grid container spacing={3}>
          {classes.map((classe) => (
            <Grid item xs={12} sm={6} md={4} key={classe._id}>
              <ClassCard classe={classe} />
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
};

export default Classes;