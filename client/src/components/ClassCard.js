// ClassCard.js
import React from 'react';  // Rimuovi useState se non lo usi più
import { 
  Card, 
  CardContent, 
  Typography, 
  Collapse,
  Box,
  IconButton,
  useTheme
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { styled } from '@mui/material/styles';

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

// Usa solo la prop expanded, rimuovi lo state locale
const ClassCard = ({ classe, expanded, onExpandClick }) => {
  const theme = useTheme();

  return (
    <Card
      sx={{
        position: 'relative',
        transition: theme.transitions.create(['transform', 'box-shadow'], {
          duration: theme.transitions.duration.standard,
        }),
        transform: expanded ? 'scale(1.02)' : 'scale(1)',
        zIndex: expanded ? 2 : 1,
        boxShadow: expanded ? theme.shadows[8] : theme.shadows[1],
        height: 'auto',
        cursor: 'pointer',
        '&:hover': {
          boxShadow: theme.shadows[4]
        }
      }}
    >
      <CardContent 
        onClick={onExpandClick}
        sx={{ 
          display: 'flex', 
          justifyContent: 'space-between',
          alignItems: 'center'
        }}
      >
        <Box>
          <Typography variant="h5" component="h2">
            {classe.nome} {classe.sezione}
          </Typography>
          <Typography color="textSecondary">
            Anno Scolastico: {classe.annoScolastico}
          </Typography>
        </Box>
        <ExpandMore
          expand={expanded}
          aria-expanded={expanded}
          aria-label="mostra dettagli"
        >
          <ExpandMoreIcon />
        </ExpandMore>
      </CardContent>

      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent sx={{ borderTop: `1px solid ${theme.palette.divider}` }}>
          <Box sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Dettagli Classe
            </Typography>
            <Box sx={{ display: 'grid', gap: 2 }}>
              <Typography>
                Numero studenti: {classe.studenti?.length || 0}
              </Typography>
              <Typography>
                Numero docenti: {classe.docenti?.length || 0}
              </Typography>
            </Box>
          </Box>
        </CardContent>
      </Collapse>
    </Card>
  );
};

export default ClassCard;