import React, { useState } from 'react';
import { Box, Grid } from '@mui/material';
import ClassCard from '../components/ClassCard';

const Classes = ({ classes }) => {
  const [expandedId, setExpandedId] = useState(null);

  return (
    // Contenitore principale che si adatta allo spazio disponibile
    <div className="h-full w-full p-4">
      {/* Area delle cards */}
      <div className={`flex ${expandedId ? 'space-x-4' : ''}`}>
        {/* Lista delle card sulla sinistra */}
        <div className={`
          ${expandedId ? 'w-1/3' : 'w-full'}
          transition-all duration-300
        `}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {classes?.map((classe) => (
              <div 
                key={classe._id}
                className={`
                  ${expandedId ? 'md:col-span-1' : ''}
                  ${expandedId === classe._id ? 'hidden md:block' : ''}
                `}
              >
                <ClassCard
                  classe={classe}
                  expanded={expandedId === classe._id}
                  onExpandClick={() => setExpandedId(expandedId === classe._id ? null : classe._id)}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Area espansa sulla destra */}
        {expandedId && (
          <div className="w-2/3 transition-all duration-300">
            <ClassCard
              classe={classes?.find(c => c._id === expandedId)}
              expanded={true}
              onExpandClick={() => setExpandedId(null)}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Classes;