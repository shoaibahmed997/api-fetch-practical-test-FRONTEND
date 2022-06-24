
import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import {Button} from '@mui/material';
import { Link } from 'react-router-dom';

const  Header = ()=>{
  return (
    <Box color={"#282c34"} sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1, gap:2 }}>
                <Link className='navitem' to='/'><Button style={{color:"white"}} variant="text">Companies</Button></Link>
                <Link className='navitem' to='/search'><Button style={{color:"white"}} variant="text">Search</Button></Link>
                
                
          </Typography>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
export default Header