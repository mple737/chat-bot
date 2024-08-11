'use client';

import { Box, Typography, Button } from "@mui/material";
import { useRouter } from 'next/navigation';

export default function LandingPage() {
  const router = useRouter();

  const handleTalkClick = () => {
    router.push("/chatBot"); // uupdate the route to match your directory name
  };

  return (
    <Box

    
      width="100vw"
      height="100vh"
      display="flex"
      alignItems="center"
      justifyContent="center"
      sx={{ 


        background: 'linear-gradient(135deg, #003A6C, #DA291C)', // the navy blue to red gradient
        color: 'white',
        padding: 2,
      }}
    >
      <Box

        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        textAlign="center"
      >
        <Typography
          variant="h2"
          sx={{ 


            fontWeight: 'bold',
            mb: 2,
            textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)',
          }}
        >
          Welcome to the Arsenal FC <br></br> Support Assistant
        </Typography>
        <Typography
          variant="h5"
          sx={{ 


            mb: 4,
            textShadow: '1px 1px 3px rgba(0, 0, 0, 0.5)',
          }}
        >
          Come On You Gunners! 
        </Typography>
        <Button


          variant="contained"
          color="primary"
          onClick={handleTalkClick}
          sx={{ 


            fontSize: '1.2rem',
            padding: '10px 30px',
            borderRadius: '8px',
            boxShadow: '2px 2px 5px rgba(0, 0, 0, 0.3)',
            backgroundColor: '#DA291C', // Arsenal og red
            '&:hover': {
              backgroundColor: '#B21F1F', // daarker red for hover effect
            },
          }}
        >
          Chat Now
        </Button>
      </Box>
    </Box>
  );
}
