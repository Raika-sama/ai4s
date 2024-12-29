// ClassCard.js
import React from 'react';
import {
  Card,
  CardContent,
  Typography,
  Box,
  IconButton,
  useTheme,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const ClassCard = ({ classe, expanded, onExpandClick }) => {
  const theme = useTheme();

  return (
    <Card
      onClick={onExpandClick}
      sx={{
        position: 'relative',
        transition: 'all 0.3s ease',
        cursor: 'pointer',
        height: expanded ? '100%' : 'auto',
        width: expanded ? '100%' : '300px', // larghezza fissa per card non espanse
        transform: expanded ? 'scale(1)' : 'scale(0.95)',
        '&:hover': {
          transform: expanded ? 'scale(1)' : 'scale(0.98)',
          boxShadow: theme.shadows[8],
        },
        backgroundColor: theme.palette.background.paper,
        borderRadius: '12px',
        overflow: 'hidden',
      }}
    >
      {/* Contenuto base della card (sempre visibile) */}
      <CardContent>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="h5" component="h2">
            {classe.nome} {classe.sezione}
          </Typography>
          <IconButton
            sx={{
              transform: expanded ? 'rotate(180deg)' : 'rotate(0)',
              transition: 'transform 0.3s ease',
            }}
          >
            <ExpandMoreIcon />
          </IconButton>
        </Box>
        <Typography color="textSecondary" gutterBottom>
          Anno Scolastico: {classe.annoScolastico}
        </Typography>
        <Typography>
          Studenti: {classe.studenti?.length || 0}
        </Typography>
      </CardContent>

      {/* Contenuto espanso */}
      {expanded && (
        <Box
          sx={{
            p: 3,
            mt: 2,
            borderTop: `1px solid ${theme.palette.divider}`,
            height: 'calc(100% - 200px)', // altezza dinamica
            overflow: 'auto',
          }}
        >
          {/* Qui inseriremo il contenuto dettagliato */}
          <Typography variant="h6" gutterBottom>
            Dettagli Classe
          </Typography>
          {/* Placeholder per il contenuto futuro */}
          <Box sx={{ mt: 2 }}>
            <Typography paragraph>
              Contenuto dettagliato della classe...
            </Typography>
          </Box>
        </Box>
      )}
    </Card>
  );
};

export default ClassCard;