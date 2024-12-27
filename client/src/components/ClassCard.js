import React from 'react';
import {
  Card,
  CardContent,
  CardActions,
  Typography,
  Button,
  IconButton,
  Box,
  useTheme
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useNavigate } from 'react-router-dom';

const ClassCard = ({ classe, onEdit, onDelete }) => {
  const theme = useTheme();
  const navigate = useNavigate();

  return (
    <Card 
      elevation={3}
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        '&:hover': {
          transform: 'translateY(-4px)',
          transition: 'transform 0.3s ease-in-out'
        }
      }}
    >
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography variant="h5" component="h2" gutterBottom>
          {classe.nome} {classe.sezione}
        </Typography>
        <Typography color="textSecondary" gutterBottom>
          Anno Scolastico: {classe.annoScolastico}
        </Typography>
        <Box sx={{ mt: 2 }}>
          <Typography variant="body2" color="textSecondary">
            Studenti: {classe.studenti?.length || 0}
          </Typography>
          <Typography variant="body2" color="textSecondary">
            Docenti: {classe.docenti?.length || 0}
          </Typography>
        </Box>
      </CardContent>
      <CardActions sx={{ justifyContent: 'space-between', p: 2 }}>
        <Box>
          <IconButton 
            size="small" 
            onClick={() => onEdit(classe._id)}
            sx={{ mr: 1 }}
          >
            <EditIcon />
          </IconButton>
          <IconButton 
            size="small" 
            onClick={() => onDelete(classe._id)}
            color="error"
          >
            <DeleteIcon />
          </IconButton>
        </Box>
        <Button 
          variant="contained" 
          onClick={() => navigate(`/classes/${classe._id}`)}
          sx={{
            background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
            color: 'white',
            '&:hover': {
              background: `linear-gradient(45deg, ${theme.palette.primary.dark}, ${theme.palette.secondary.dark})`,
            }
          }}
        >
          Gestisci
        </Button>
      </CardActions>
    </Card>
  );
};

export default ClassCard;