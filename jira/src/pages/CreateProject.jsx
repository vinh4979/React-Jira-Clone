import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
import { CKEditor } from '@ckeditor/ckeditor5-react'
import { Bookmark } from '@mui/icons-material'
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  TextField,
  Typography
} from '@mui/material'
import React, { Fragment, useState } from 'react'
import { useEffect } from 'react'
import 'src/assets/css/custom-editor.css'
import { useDispatch } from 'react-redux'
import { ProjectCategoryAction } from 'src/redux/action/ProjectCategoryAction'
import { useSelector } from 'react-redux'
import { Controller, useForm } from 'react-hook-form'
import { createProjectAthorizeAction } from 'src/redux/action/ProjectAuthorizeAction'

// const InputCustom = styled('div')(({ theme }) => ({
//   backgroundColor: 'text.default',
//   borderRadius: theme.shape.borderRadius,
//   border: '1px solid red'
// }))

export default function CreateProject() {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(ProjectCategoryAction())
  }, [dispatch])

  const {
    control,
    handleSubmit,
    getValues,
    formState: { errors }
  } = useForm({
    defaultValues: {
      projectName: '',
      description: '',
      categoryId: 0,
      alias: 'String'
    }
  })
  const { projectCategory } = useSelector(state => state.projectCategoryReducer)

  const [description, setDescription] = useState()

  const handleGetInfo = data => {
    const body = {
      projectName: data.projectName,
      description: description,
      categoryId: data.categoryId === 0 ? 1 : data.categoryId,
      alias: data.alias
    }
    dispatch(createProjectAthorizeAction(body))
  }

  return (
    <Box
      sx={
        {
          // border: '1px solid red',
          // height: '100%'
        }
      }
    >
      <Box
        sx={{
          // border: '1px solid green',
          maxWidth: '700px'
        }}
      >
        <Paper
          sx={{
            padding: '20px 30px'
          }}
        >
          <Typography variant="h5" py={3}>
            Create new project
          </Typography>
          {/* form */}
          <Box component="form" onSubmit={handleSubmit(handleGetInfo)}>
            <Box
              component="div"
              sx={{
                marginBottom: '10px'
              }}
            >
              <InputLabel
                sx={{
                  marginBottom: '5px'
                }}
                required
              >
                Project Name
              </InputLabel>
              <Controller
                name="projectName"
                control={control}
                render={({ field }) => (
                  <TextField
                    name="projectName"
                    // label="Size"
                    // id="outlined-size-small"
                    // defaultValue="Small"
                    required
                    placeholder="Input your project name"
                    size="small"
                    fullWidth
                    onChange={field.onChange}
                  />
                )}
              />
            </Box>
            {/* description */}
            <Box
              sx={{
                marginBottom: '10px'
              }}
            >
              <InputLabel
                sx={{
                  marginBottom: '5px'
                }}
              >
                Description
              </InputLabel>
              <Box
                sx={{
                  width: '100%',
                  height: '20vh',
                  borderRadius: '5px',
                  overflow: 'auto',
                  border: '1px solid gray',
                  position: 'relative'
                }}
              >
                {/* <CKEditor editor={ClassicEditor} /> */}
                <CKEditor
                  editor={ClassicEditor}
                  // data="<p>Hello from CKEditor 5!</p>"
                  // onReady={editor => {
                  //   // You can store the "editor" and use when it is needed.
                  //   console.log('Editor is ready to use!', editor)
                  // }}
                  onChange={(event, editor) => {
                    const data = editor.getData()
                    setDescription(data)
                    // console.log({ event, editor, data })
                  }}
                  // onBlur={(event, editor) => {
                  //   console.log('Blur.', editor)
                  // }}
                  // onFocus={(event, editor) => {
                  //   console.log('Focus.', editor)
                  // }}
                />
              </Box>
            </Box>
            {/* category */}
            <Box
              component="div"
              sx={{
                marginBottom: '10px'
              }}
            >
              <InputLabel
                sx={{
                  marginBottom: '5px'
                }}
              >
                Category project
              </InputLabel>
              <Controller
                name="categoryId"
                control={control}
                render={({ field }) => (
                  <Select
                    // {...field}
                    name="categoryId"
                    // value={categoryChoose}
                    onChange={field.onChange}
                    fullWidth
                    size="small"
                    defaultValue={1}
                    required
                  >
                    {projectCategory?.map(item => {
                      return (
                        <MenuItem key={item.id} value={item.id}>
                          {item.projectCategoryName}
                        </MenuItem>
                      )
                    })}
                  </Select>
                )}
              />
            </Box>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <Button
                sx={{
                  marginTop: '2rem'
                }}
                variant="contained"
                type="submit"
              >
                Create project
              </Button>
            </Box>
          </Box>
        </Paper>
      </Box>
    </Box>
  )
}
