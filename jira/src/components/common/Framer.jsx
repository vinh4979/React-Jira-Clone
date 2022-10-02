import { Box } from '@mui/material'
import React from 'react'
import { motion } from 'framer-motion'

export default function Framer() {
  return (
    <Box
      sx={{
        border: '1px solid gray',
        width: 500,
        height: 500
      }}
    >
      <motion.div
        // initial={{ opacity: 0, scale: 0 }}
        // animate={{ opacity: 1, scale: 1 }}
        animate={{
          scale: [1, 2, 3, 2, 1],
          rotate: [0, 0, 270, 270, 0],
          borderRadius: ['20%', '20%', '50%', '50%', '20%']
        }}
        transition={{ duration: 5 }}
        style={{
          backgroundColor: 'green',
          width: 200,
          height: 200
        }}
      ></motion.div>
    </Box>
  )
}
