import React from 'react';
import "./style.css";
import { motion } from 'framer-motion';

interface Props {
  selectedImg?: any
  setSelectedImg?: any
}

export default function Modal ({ selectedImg, setSelectedImg }: Props) {
  const handleClick = (e: React.FormEvent<EventTarget>): void => {
    const target = e.target as HTMLInputElement;
    if (target.classList.contains('backdrop')) {
      setSelectedImg(null)
    }
    if (target.classList.contains('back')) {
      setSelectedImg(null)
    }
  }

  return (
    <>
      {!selectedImg.includes('BABS') && <motion.div className="backdrop" onClick={ handleClick } //eslint-disable-line
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <motion.img
          src={process.env.REACT_APP_IMG_URL + selectedImg} //eslint-disable-line
          crossOrigin="anonymous"
          alt="enlarged picture"
          initial={{ y: "-100vh" }}
          animate={{ y: 0 }}
          onClick={() => setSelectedImg(null)}
        />
      </motion.div>}
      {selectedImg.includes('BABS') && <motion.div className="back" onClick={ handleClick } //eslint-disable-line
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <motion.img
          src={process.env.REACT_APP_IMG_URL + selectedImg} //eslint-disable-line
          crossOrigin="anonymous"
          alt="enlarged picture"
          initial={{ y: "-100vh" }}
          animate={{ y: 0 }}
          onClick={() => setSelectedImg(null)}
        />
      </motion.div>}
    </>
  )
}
