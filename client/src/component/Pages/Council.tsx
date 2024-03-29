import React, { useState } from 'react';
import {
  Tabs,
  Tab,
  Box,
  tabsClasses
}
  from '@mui/material';
import { makeStyles } from "@material-ui/core";
import Oba from './Oba';
import Chief from './Chief';
import AdminStructure from './AdminStructure';

interface TabPanelProps {
  children?: React.ReactNode
  index: number
  value: number
}

const useStyles = makeStyles((theme) => ({
  title: {
    color: "#712E1E",
    fontWeight: 600,
    fontSize: '1.2rem',
    width: '50%',
    backgroundColor: 'white',
    '&:hover':
      {
        color: 'primary',
        backgroundColor: '#CBB8B8',
        fontWeight: 600
      }
  }
}));

function TabPanel (props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
      style={{ backgroundColor: 'transparent' }}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Box>{children}</Box>
        </Box>
      )}
    </div>
  );
}

function a11yProps (index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`
  };
}

export default function Council () {
  const [value, setValue] = useState(0);

  const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const classes = useStyles();
  const screenWidth = document.documentElement.clientWidth
  return (
    <Box sx={{ width: '100%', backgroundColor: 'white' }} mt={9}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
          variant={screenWidth <= 450 ? "scrollable" : undefined}
          scrollButtons
          centered
          sx={{
            marginTop: '2rem',
            [`& .${tabsClasses.scrollButtons}`]: {
              '&.Mui-disabled': { opacity: {sm: 0, xs: 0} },
            },
          }}
          allowScrollButtonsMobile
          // textColor="primary"
          // indicatorColor="primary"
        >
          <Tab label="ELESUN OF ESUN" {...a11yProps(0)} className={ classes.title }/>
          <Tab label="TRADITIONAL COUNCIL" {...a11yProps(1)} className={ classes.title }/>
          <Tab label="ADMINISTRATIVE STRUCTURE" {...a11yProps(2)} className={ classes.title }
            sx={{display: {xs: 'none', md: 'block'}}}
          />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        <Oba/>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <Chief/>
      </TabPanel>
      <TabPanel value={value} index={2}>
        <AdminStructure/>
      </TabPanel>
    </Box>
  );
}
