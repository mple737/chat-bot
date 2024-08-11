'use client';

import { Box, Stack, TextField, Button, Typography } from "@mui/material";
import { useState, useEffect, useRef } from "react";
import { useRouter } from 'next/navigation';

export default function Home() {


  const [history, setHistory] = useState([]);
  const firstMessage = "Hi there! I'm the Arsenal FC virtual assistant. How can I help you today?";

  const [message, setMessage] = useState("");
  
  const endOfMessagesRef = useRef(null); // ref to scroll to
  const router = useRouter(); // Initialize the router

  // auto-scroll 
  useEffect(() => {

    if (endOfMessagesRef.current) {
      endOfMessagesRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [history]);

  const sendMessage = async () => {
    if (!message.trim()) return; // Preventinig sending empty messages

    const newMessage = { role: "user", parts: [{ text: message }] };
    setHistory((history) => [...history, newMessage]);
    setMessage('');

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify([...history, newMessage])
      });

      const data = await response.json();
      setHistory((history) => [...history, { role: "model", parts: [{ text: data.text }] }]);
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  const handleEndChat = () => {
    // Navigate back to the landing page
    router.push("/"); // Replace "/" with your actual landing page route
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault(); // Prevent default Enter key behavior 
      sendMessage(); // Callings the function to send the message
    }
  };

  return (
    <Box


      width="100vw"
      height="100vh"
      display="flex"
      alignItems="center"
      justifyContent="center"
      sx={{
        background: 'linear-gradient(135deg, #DA291C, #003A6C)', // Arsenal FC gradient
        padding: 2
      }}
    >
      <Stack 


        direction="column" 
        justifyContent="flex-end"
        width="60%" 
        height="80%" 
        maxHeight="80%" 
        bgcolor="white"
        border="2px solid #E0E0E0" 
        borderRadius={5}
        boxShadow={3}
        spacing={3}
        p={3}
      >
        {/* Title Section */}
        <Box
          bgcolor="transparent" // remove default background
          p={2}


          borderRadius={2}
          boxShadow={2}
          sx={{
            background: 'linear-gradient(135deg, #d00, #003A6C)', // Arsenal FC gradient
            color: 'white' 
          }}
        >
          <Typography 
            variant="h5" 
            align="center" 
            sx={{ fontWeight: 'bold' }}
          >
            Welcome to Arsenal FC Support Assistant
          </Typography>
        </Box>

        <Stack 
          direction="column" 
          spacing={2} 
          sx={{ 


            overflowY: 'auto', 
            flexGrow: 1,
            backgroundImage: 'url("/arsenal.jpg")', // Reference image from public folder
            backgroundSize: 'contain', // Cover the entire area
            backgroundPosition: 'center', // Center the image
            backgroundRepeat: 'no-repeat', // No repeating the img


          }}
        >
          <Box
            display="flex"
            justifyContent="flex-start"
          >
            <Typography

              bgcolor="#003A6C" // Arsenal navy
              color="white"
              borderRadius={2}
              p={2}
              boxShadow={2}
            >
              {firstMessage}

            </Typography>
          </Box>
          {history.map((textObject, index) => (
            <Box

              key={index}
              display="flex"
              justifyContent={textObject.role === 'user' ? 'flex-end' : 'flex-start'}
            >
              <Typography
                bgcolor={textObject.role === 'user' ? '#DA291C' : '#003A6C'} 
                color="white"
                borderRadius={2}
                p={2}
                boxShadow={2}
                maxWidth="70%"
              >
                {textObject.parts[0].text}
              </Typography>
            </Box>
          ))}
          <div ref={endOfMessagesRef} /> 
        </Stack>
        
        <Stack direction="row" spacing={2} width="100%" display="flex" alignItems="center">
          <TextField 

            label="Type your message..." 

            value={message} 

            onChange={(e) => setMessage(e.target.value)} 

            onKeyDown={handleKeyDown} // Handle Enter key press
            fullWidth 
            sx={{
              backgroundColor: '#f1f1f1',
              borderRadius: '8px',
              boxShadow: 1
            }}
          />
          <Button 
            variant="contained" 
            onClick={sendMessage}
            sx={{

              bgcolor: '#DA291C', 
              color: 'white',
              padding: '10px 20px',
              borderRadius: '8px',
              '&:hover': {
                bgcolor: '#B21F1F'

              }
            }}
          >
            Send
          </Button>
          <Button 
            variant="contained" 
            onClick={handleEndChat}
            sx={{


              bgcolor: '#003A6C', 
              color: 'white',
              padding: '10px 20px',
              borderRadius: '8px',
              '&:hover': {
                bgcolor: '#002A54'

              }
            }}
          >
            End
          </Button>
        </Stack>
      </Stack>
    </Box>
  );
}
