import React from 'react';
import { AppBar, Toolbar, Typography } from '@mui/material';
import { styled } from '@mui/system';

// Use the styled utility to create a styled AppBar
const StyledAppBar = styled(AppBar)({
  backgroundColor: 'black',
  height: '50px',
});

// Use the styled utility to create a styled Typography for the logo
const StyledTypography = styled(Typography)({
  color: 'white',
  marginBottom: "15px"
});

interface HeaderProps {
  // You can define any additional props you need
}

const Header: React.FC<HeaderProps> = (props) => {
  return (
    <StyledAppBar position="static">
      <Toolbar>
        <StyledTypography variant="h6">
          ASTRO BHARAT
        </StyledTypography>
      </Toolbar>
    </StyledAppBar>
  );
};

export default Header;
