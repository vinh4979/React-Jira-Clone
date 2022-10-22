import { InputLabel, MenuItem, Select, Stack, Typography } from '@mui/material'
import React, { Fragment } from 'react'
import { getIconTaskPriority, getIonTaskType } from 'src/utils/constant'

const SelectInput = ({ name, getValue, values, label, data }) => {
  return (
    <>
      <InputLabel
        sx={{
          textTransform: 'capitalize',
          marginBottom: '10px'
        }}
        id="demo-simple-select-label"
      >
        {label}
      </InputLabel>
      <Select
        name={name}
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={values}
        onChange={getValue}
        defaultValue={values}
        fullWidth
        size="small"
      >
        {data?.map(item => {
          let key
          let value
          let nameMenu
          if (name === 'creator') {
            key = item.userId
            value = item.userId
            nameMenu = item.name
          }

          if (name === 'categoryId') {
            key = item.id
            value = item.id
            nameMenu = item.projectCategoryName
          }

          if (name === 'typeId') {
            key = item.id
            value = item.id
            nameMenu = item.taskType
          }
          if (name === 'priorityId') {
            key = item.priorityId
            value = item.priorityId
            nameMenu = item.priority
          }
          if (name === 'statusId') {
            key = item.statusId
            value = item.statusId
            nameMenu = item.statusName
          }
          return (
            <MenuItem key={key} value={value}>
              <Stack direction={'row'}>
                {name === 'typeId' && getIonTaskType(value)}
                {name === 'priorityId' && getIconTaskPriority(value)}
                <Typography textTransform={'capitalize'}>{nameMenu}</Typography>
              </Stack>
            </MenuItem>
          )
        })}
      </Select>
    </>
  )
}

export default SelectInput
