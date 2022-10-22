import React from 'react'
import { styled } from '@mui/material/styles'
import { Button } from '@mui/material'

const TagBtn = styled(Button)(({ theme, active }) => ({
  border: 'none',
  textTransform: 'none',
  color: theme.palette.text.primary,
  fontWeight: 400,
  padding: '10px 20px',
  height: '30px',
  backgroundColor: active
    ? theme.palette.action.selected
    : theme.palette.action.hover
}))

export default function TagButton(props) {
  // console.log('button active:,', props.active)
  // let statebutton
  // if(props.active === true) {
  //   statebutton = true
  //   return statebutton
  // }
  // if (props.active === false) {
  //   statebutton = true
  //   return statebutton
  // }
  return (
    <TagBtn
      active={props.active ? true : false}
      onClick={props.onClick ? () => props.onClick() : 'null'}
    >
      {props.children}
    </TagBtn>
  )
}
