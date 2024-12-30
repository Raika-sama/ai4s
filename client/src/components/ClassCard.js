import React from 'react';
import { Card, CardContent, Typography, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const ClassCard = ({ classe }) => {
  const navigate = useNavigate();

  return (
    <Card 
      sx={{ 
        height: '100%',
        cursor: 'pointer',
        transition: 'transform 0.2s, box-shadow 0.2s',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: 4,
        }
      }}
      onClick={() => navigate(`/classes/${classe._id}`)}
    >
      <CardContent>
        <Typography variant="h5" component="h2" gutterBottom>
          {classe.nome}
        </Typography>
        <Typography color="textSecondary" gutterBottom>
          Anno Scolastico: {classe.anno}
        </Typography>
        <Typography color="textSecondary" gutterBottom>
          Indirizzo: {classe.indirizzo}
        </Typography>
        <Box sx={{ mt: 2 }}>
          <Typography variant="body2" color="textSecondary">
            Docenti: {classe.docenti?.length || 0}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

export default ClassCard;