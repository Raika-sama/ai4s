import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';

const ClassCard = ({ classe }) => {
  return (
    <Card sx={{ height: '100%' }}>
      <CardContent>
        <Typography variant="h5" component="h2" gutterBottom>
          {classe.nome} {classe.sezione}
        </Typography>
        <Typography color="textSecondary" gutterBottom>
          Anno Scolastico: {classe.annoScolastico}
        </Typography>
        <Typography variant="body2" color="textSecondary">
          Studenti: {classe.studenti?.length || 0}
        </Typography>
        <Typography variant="body2" color="textSecondary">
          Docenti: {classe.docenti?.length || 0}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default ClassCard;