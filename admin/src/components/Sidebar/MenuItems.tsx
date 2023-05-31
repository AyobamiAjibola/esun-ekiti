import React from 'react';
import {
  Person,
  CollectionsBookmark,
  Feed,
  AddHomeWork,
  People,
  Event
} from '@mui/icons-material';

export const TopMenu = [
  {
    path: "/council",
    name: "Council",
    icon: <Person />
  },
  {
    path: "/history",
    name: "History",
    icon: <CollectionsBookmark />
  },
  {
    path: "/news",
    name: "News",
    icon: <Feed />
  },
  {
    path: "/event",
    name: "Event",
    icon: <Event />
  }
];

export const SecondMenu = [
  {
    path: "/project",
    name: "Project",
    icon: <AddHomeWork />
  },
  {
    path: "/users",
    name: "Users",
    icon: <People />
  }
]
