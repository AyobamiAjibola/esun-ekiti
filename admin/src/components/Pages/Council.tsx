import React, { useState } from 'react';
import {
  Tabs,
  Tab,
  Box
}
  from '@mui/material';
import { makeStyles } from "@material-ui/core";
import Oba from './Oba';
import Chief from './Chief';

interface TabPanelProps {
  children?: React.ReactNode
  index: number
  value: number
}

const useStyles = makeStyles((theme) => ({
  title: {
    color: "#521414",
    fontWeight: 600,
    width: '50%',
    '&:hover':
      {
        color: '#521414',
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

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
          centered
          textColor="primary"
          indicatorColor="primary"
          sx={{ marginTop: '2rem' }}
        >
          <Tab label="OBA" {...a11yProps(0)} className={ classes.title }/>
          <Tab label="TRADITIONAL CHIEFS" {...a11yProps(1)} className={ classes.title }/>
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        <Oba/>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <Chief/>
      </TabPanel>
    </Box>
  );
}
