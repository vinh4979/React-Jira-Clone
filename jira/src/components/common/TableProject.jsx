import React, { useEffect, useState } from 'react'
import { makeStyles } from '@mui/styles'
import {
  Button,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow
} from '@mui/material'
import { useDispatch } from 'react-redux'
import { getAllProjectAction } from 'src/redux/action/ProjectAuthorizeAction'
import { useSelector } from 'react-redux'
import { Delete, Edit } from '@mui/icons-material'
import CustomPopover from './Popover'
import { getAllUserAction, getUserAction } from 'src/redux/action/userAction'
import AddMemberPopover from './AddMemberPopover'

const columns = [
  { id: 'id', label: 'Id', minWidth: 100 },
  { id: 'projectname', label: 'Project\u00a0Name', minWidth: 170 },
  {
    id: 'category',
    label: 'Category',
    minWidth: 170
  },
  {
    id: 'creator',
    label: 'Creator',
    minWidth: 170
  },
  {
    id: 'members',
    label: 'Members',
    minWidth: 170
  },
  {
    id: 'action',
    label: 'Actions',
    minWidth: 170
  }
]

const useStyles = makeStyles({
  root: {
    width: '100%'
  },
  container: {
    maxHeight: 440
  }
})

export default function TableProject() {
  const classes = useStyles()
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getAllProjectAction())
    dispatch(getAllUserAction())
  }, [])
  const rows = useSelector(state => state.projectReducer.arrAllProject)
  const users = useSelector(state => state.userReducer.arrAllUser)
  console.log(
    'ROWWWW',
    useSelector(state => state.projectReducer)
  )

  const handleDeleteRows = () => {}

  return (
    <Paper className={classes.root}>
      <TableContainer className={classes.container}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead sx={{ marginLeft: 10 }}>
            <TableRow>
              {columns.map(column => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody sx={{ marginLeft: 10 }}>
            {rows?.map(row => {
              return (
                <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                  <TableCell key="id">{row.id}</TableCell>
                  <TableCell key="projectname">{row.projectName}</TableCell>
                  <TableCell key="category">{row.categoryId}</TableCell>
                  <TableCell key="creator">{row.creator.name}</TableCell>
                  <TableCell key="members" className="flex ">
                    {row.members?.map((memberimg, index) => {
                      if (index < 3) {
                        return (
                          <img
                            className="rounded-full w-10 h-10 inline-block"
                            src={memberimg.avatar}
                          />
                        )
                      }
                    })}
                    {row.members?.length > 0 && (
                      <CustomPopover id={row.id} row={row}></CustomPopover>
                    )}
                    <AddMemberPopover id={row.id} row={row} user={users} />
                  </TableCell>
                  <TableCell key={'action'}>
                    <IconButton
                      aria-label="delete"
                      variant="contained"
                      color="error"
                    >
                      <Delete />
                    </IconButton>
                    <IconButton aria-label="edit" variant="contained">
                      <Edit />
                    </IconButton>
                  </TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  )
}
