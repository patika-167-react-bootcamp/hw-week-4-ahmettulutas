import Register from './auth/Register';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import React from 'react';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import LoginForm from "./auth/loginForm"
import { useState } from 'react';
import { Grid } from '@mui/material';


export default function Auth() {
  // useState to control the tab
    const [value,setValue] = useState("1");
    const handleChange = (event:React.SyntheticEvent<Element, Event>, newValue:string) => {
        setValue(newValue)
    }
    
  return (
    <Grid sx={{m:"2rem auto", maxWidth:"80%"}}>
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <TabList onChange={handleChange} aria-label="lab API tabs example">
            <Tab label="Login" value="1" />
            <Tab label="Register" value="2" />
          </TabList>
        </Box>
        <Grid>
            <TabPanel value="1"><LoginForm/></TabPanel>
            <TabPanel value="2"><Register /></TabPanel>
        </Grid>
      </TabContext>
    </Grid>
  )
}
