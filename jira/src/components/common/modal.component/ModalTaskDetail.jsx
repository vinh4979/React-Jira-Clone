import {
  Avatar,
  Box,
  Button,
  Grid,
  InputLabel,
  Modal,
  Paper,
  Stack,
  TextField,
  Typography
} from '@mui/material'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { CLOSE_MODAL_TASK_DETAIL } from 'src/redux/type/type'
import TagButton from '../TagButton'
import CampaignIcon from '@mui/icons-material/Campaign'
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline'
import ZoomOutMapIcon from '@mui/icons-material/ZoomOutMap'
import CloseIcon from '@mui/icons-material/Close'
import { getIonTaskType } from '../../../utils/constant'
import parse from 'html-react-parser'
import styled from '@emotion/styled'

// const TagBox = styled('div')(({ theme }) => ({
//   border: 'none',
//   textTransform: 'none',
//   color: theme.palette.text.primary,
//   fontWeight: 400,
//   padding: '10px 20px',
//   height: '30px',
//   backgroundColor: theme.palette.action.hover
// }))

export default function ModalTaskDetail() {
  const dispatch = useDispatch()
  const { arrTasKDetail } = useSelector(state => state.projectReducer)
  const open = useSelector(state => state.stateReducer.modalTaskDetail)
  console.log('modal task detail - check modal', arrTasKDetail)
  return (
    <Modal
      open={open}
      onClose={() =>
        dispatch({
          type: CLOSE_MODAL_TASK_DETAIL
        })
      }
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      sx={{
        overflow: 'auto',
        display: 'flex',
        justifyContent: 'center',
        padding: '5rem'
      }}
    >
      <Paper
        sx={{
          border: '1px solid',
          width: 800,
          height: '200vh',
          padding: '20px 20px'
        }}
      >
        {' '}
        <Stack
          direction={'row'}
          justifyContent="space-between"
          alignItems={'center'}
        >
          <Stack
            sx={{
              backgroundColor: theme => theme.palette.action.hover,
              borderRadius: '5px',
              padding: '5px 10px',
              // height: '30px',
              '&:hover': {
                backgroundColor: theme => theme.palette.action.hover
              }
            }}
            direction={'row'}
            alignItems="center"
          >
            {getIonTaskType(
              (arrTasKDetail?.taskTypeDetail.id === 1 && 1) ||
                (arrTasKDetail?.taskTypeDetail.id === 2 && 2)
            )}
            <Typography textTransform="uppercase" fontWeight="normal">
              {arrTasKDetail?.taskTypeDetail.taskType}
            </Typography>
          </Stack>

          <Stack direction={'row'} spacing={2}>
            <TagButton>
              <CampaignIcon /> Give Feedback
            </TagButton>
            <TagButton>
              <DeleteOutlineIcon />
            </TagButton>
            <TagButton>
              <ZoomOutMapIcon />
            </TagButton>
            <TagButton>
              <CloseIcon />
            </TagButton>
          </Stack>
        </Stack>
        <Grid container>
          <Grid item xs={8}>
            {/* task name */}
            <Typography my={2} variant="h5" fontWeight={'bold'}>
              {arrTasKDetail?.taskName}
            </Typography>
            {/* description*/}
            <Box>
              <Typography>Desciption:</Typography>
              <Typography my={0}>
                {parse(arrTasKDetail?.description)}
              </Typography>
            </Box>
            {/* comment */}
            <Box>
              <InputLabel>Comments</InputLabel>
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px'

                  // alignItems: 'center'
                }}
              >
                <Avatar
                  sx={{
                    width: '40px',
                    height: '40px'
                  }}
                />
                <Typography>Bui Vinh</Typography>
              </Box>
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  marginTop: '10px'
                  // alignItems: 'center'
                }}
              >
                <Box
                  sx={{
                    width: '40px',
                    height: '40px'
                  }}
                />
                <Box
                  sx={{
                    width: '100%'
                  }}
                >
                  <TextField
                    size="small"
                    fullWidth
                    placeholder="Add your comment"
                  />
                  <Stack direction={'row'} my={3} spacing={3}>
                    <Button variant="contained">Save</Button>
                    <Button variant="outlined">Cancel</Button>
                  </Stack>
                </Box>
              </Box>
              {/* show comment */}
              <Box>
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px'

                    // alignItems: 'center'
                  }}
                >
                  <Avatar
                    sx={{
                      width: '40px',
                      height: '40px'
                    }}
                  />
                  <Typography>Bui Vinh</Typography>
                  <Typography>Oct 11, 2022, 2:34:11 AM</Typography>
                </Box>
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px'

                    // alignItems: 'center'
                  }}
                >
                  <Box
                    sx={{
                      width: '40px',
                      height: '40px'
                    }}
                  />
                  <Typography variant="body2">
                    here show your comment
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Grid>
          <Grid item xs={4}>
            <Typography>Status:</Typography>
            <Typography>Done</Typography>
          </Grid>
        </Grid>
      </Paper>
    </Modal>
  )
}
