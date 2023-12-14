import React from 'react';
import { Typography, Container } from '@mui/material';
import { styled } from '@mui/system';

// Use the styled utility to create a styled footer
const StyledFooter = styled('footer')({
    backgroundColor: 'black',
    color: 'white',
    padding: '20px 0',
    position: 'fixed',
    bottom: 0,
    width: '100%',
});

interface FooterProps {
  // You can define any additional props you need
}

const Footer: React.FC<FooterProps> = (props) => {
  return (
    <StyledFooter>
      <Container>
        <Typography variant="body2" align="center">
          &copy; 2023 Astro Bharat. All rights reserved.
        </Typography>
      </Container>
    </StyledFooter>
  );
};

export default Footer;
