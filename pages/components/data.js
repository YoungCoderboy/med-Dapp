import React from 'react'
import {
  FaBehance,
  FaFacebook,
  FaLinkedin,
  FaTwitter,
  FaSketch,
  FaHome,
  FaUserFriends,
  FaFolderOpen,
  FaCalendarAlt,
  FaWpforms,
  FaHospital,
  FaMicroscope,
} from 'react-icons/fa'
export const links = [
  {
    id: 1,
    url: '/home',
    text: 'home',
    icon: <FaHome />,
  },
  {
    id: 2,
    url: '/home/reminder',
    text: 'Set Reminder',
    icon: <FaCalendarAlt />,
  },
  {
    id: 3,
    url: '/home/upload',
    text: 'Upload documents',
    icon: <FaWpforms />,
  },
  {
    id: 4,
    url: '/home/predict',
    text: 'Predict Diease',
    icon: <FaMicroscope />,
  },
]

export const social = [
  {
    id: 1,
    url: 'https://www.twitter.com',
    icon: <FaFacebook />,
  },
  {
    id: 2,
    url: 'https://www.twitter.com',
    icon: <FaTwitter />,
  },
  {
    id: 3,
    url: 'https://www.twitter.com',
    icon: <FaLinkedin />,
  },
  {
    id: 4,
    url: 'https://www.twitter.com',
    icon: <FaBehance />,
  },
  {
    id: 5,
    url: 'https://www.twitter.com',
    icon: <FaSketch />,
  },
]
