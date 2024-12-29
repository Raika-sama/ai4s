// Classes.js
import React, { useState, useEffect } from 'react';
import { Container, Grid, Typography } from '@mui/material';
import ClassCard from '../components/ClassCard';
import axios from '../utils/axios';

const Classes = () => {
  const [classes, setClasses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [expandedId, setExpandedId] = useState(null); // Traccia quale card è espansa

  const fetchClasses = async () => {
    try {
      setLoading(true);
      const response = await axios.get('/api/classes');
      setClasses(response.data.data);
    } catch (err) {
      setError('Errore nel caricamento delle classi');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchClasses();
  }, []);

  // Gestisce quale card è espansa
  const handleExpand = (classId) => {
    setExpandedId(expandedId === classId ? null : classId);
  };

  if (loading) {
    return (
      <div className="p-6">
        <Typography>Caricamento classi...</Typography>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6">
        <Typography color="error">{error}</Typography>
      </div>
    );
  }

  return (
    <div className="p-6">
      <Typography variant="h4" component="h1" sx={{ mb: 4 }}>
        Le mie Classi
      </Typography>

      <Grid container spacing={3}>
        {classes.map((classe) => (
          <Grid 
            item 
            xs={12} 
            sm={6} 
            md={4} 
            key={classe._id}
            sx={{
              transition: 'all 0.3s ease',
              // Se questa card è espansa, occupa più spazio
              ...(expandedId === classe._id && {
                sm: 12,  // Occupa tutta la larghezza su tablet
                md: 8,   // Occupa 2/3 della larghezza su desktop
                zIndex: 2
              })
            }}
          >
            <ClassCard 
              classe={classe}
              expanded={expandedId === classe._id}
              onExpandClick={() => handleExpand(classe._id)}
            />
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default Classes;