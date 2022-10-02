import React from 'react'
import { Avatar, Box } from '@mui/material'
import SearchRoundedIcon from '@mui/icons-material/SearchRounded'
import AddIcon from '@mui/icons-material/Add'
import HelpOutlinedIcon from '@mui/icons-material/HelpOutlined'

export default function LeftBar() {
  return (
    <Box
      sx={{
        width: '64px',
        height: '100vh',
        backgroundColor: theme => theme.palette.primary.main,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '2rem 0',
        position: 'sticky'
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'space-between',
          height: '120px'
        }}
      >
        <Box
          sx={{
            width: '40px'
          }}
        >
          <svg
            _ngcontent-kek-c129=""
            viewBox="0 0 32 32"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
            class="w-8 h-8 text-textLogo"
          >
            <defs _ngcontent-kek-c129="">
              <linearGradient
                _ngcontent-kek-c129=""
                x1="108.695%"
                x2="12.439%"
                y1="-14.936%"
                y2="45.215%"
                id="uid11-1"
              >
                <stop
                  _ngcontent-kek-c129=""
                  stop-color="#DEEBFF"
                  stop-opacity="0.4"
                  offset="0%"
                ></stop>
                <stop
                  _ngcontent-kek-c129=""
                  stop-color="#DEEBFF"
                  offset="100%"
                ></stop>
              </linearGradient>
              <linearGradient
                _ngcontent-kek-c129=""
                x1="0%"
                x2="91.029%"
                y1="118.55%"
                y2="63.971%"
                id="uid11-2"
              >
                <stop
                  _ngcontent-kek-c129=""
                  stop-color="#DEEBFF"
                  stop-opacity="0.4"
                  offset="0%"
                ></stop>
                <stop
                  _ngcontent-kek-c129=""
                  stop-color="#DEEBFF"
                  offset="100%"
                ></stop>
              </linearGradient>
            </defs>
            <g _ngcontent-kek-c129="">
              <path
                _ngcontent-kek-c129=""
                d="M15.967 29.362a6.675 6.675 0 0 0 0-9.442l-8.699-8.671-3.957 3.957a1.062 1.062 0 0 0 0 1.5l12.656 12.656zm12.656-14.156L15.967 2.55l-.039.039a6.675 6.675 0 0 0 .028 9.41l8.706 8.667 3.96-3.96a1.062 1.062 0 0 0 0-1.5z"
                fill="currentColor"
              ></path>
              <path
                _ngcontent-kek-c129=""
                d="M15.967 11.992a6.675 6.675 0 0 1-.028-9.41L6.91 11.606l4.72 4.721 4.336-4.335z"
                fill="url(#uid11-1"
              ></path>
              <path
                _ngcontent-kek-c129=""
                d="M20.295 15.591l-4.328 4.329a6.675 6.675 0 0 1 0 9.442l9.05-9.05-4.722-4.72z"
                fill="url(#uid11-2"
              ></path>
            </g>
          </svg>
        </Box>
        <Box>
          <SearchRoundedIcon />
        </Box>
        <Box>
          <AddIcon />
        </Box>
      </Box>

      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'space-between',
          height: '80px'
        }}
      >
        <Avatar
          sx={{
            width: '30px',
            height: '30px'
          }}
          alt="Jira clone"
        />
        <Box>
          <HelpOutlinedIcon />
        </Box>
      </Box>
    </Box>
  )
}
