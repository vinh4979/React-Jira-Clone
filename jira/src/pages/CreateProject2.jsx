import {
  Box,
  Breadcrumbs,
  Button,
  InputLabel,
  Link,
  Paper,
  styled,
  Typography
} from '@mui/material'
import { withFormik } from 'formik'
import React, { useEffect } from 'react'
import InputForm from 'src/components/common/input.component/InputForm'
import SelectInput from 'src/components/common/input.component/SelectInput'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
import { CKEditor } from '@ckeditor/ckeditor5-react'
import { connect } from 'react-redux'
import { useDispatch } from 'react-redux'
import { ProjectCategoryAction } from 'src/redux/action/ProjectCategoryAction'
import { createProjectAthorizeAction } from 'src/redux/action/ProjectAuthorizeAction'
import { useNavigate } from 'react-router-dom'
import { NAVIGATE } from 'src/redux/type/type'

export const StyledEditor = styled('div')(({ theme }) => ({
  '.ck-editor__top': {
    position: 'sticky !important',
    top: 0,
    background: 'black !important'
  }
}))

function LayoutCreateProject(props) {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    dispatch(ProjectCategoryAction())
    dispatch({
      type: NAVIGATE,
      payload: navigate
    })
  }, [dispatch])

  const { handleSubmit, handleChange, setFieldValue } = props

  // project category was recived form redux throught transmission props
  const arrCategory = props.arrProjectCategory
  // console.log('props', props)

  //get data from editor
  const handleGetDataEditor = (event, editor) => {
    const data = editor.getData()
    setFieldValue('description', data)
  }

  return (
    <Box
      component={'div'}
      sx={{
        width: '100%'
      }}
    >
      <Breadcrumbs aria-label="breadcrumb">
        <Link underline="hover" color="inherit" href="/">
          React Jira Clone
        </Link>
        <Link underline="hover" color="inherit" href="/">
          My project
        </Link>
        <Typography color="text.primary">Create project </Typography>
      </Breadcrumbs>

      <Paper
        sx={{
          maxWidth: '700px',
          padding: '20px',
          marginTop: '2rem'
        }}
      >
        <Typography variant="h5" py={2}>
          Create new project
        </Typography>
        <Box component={'form'} onSubmit={handleSubmit}>
          {/* project name */}
          <Box
            sx={{
              marginBottom: '20px'
            }}
          >
            <InputForm
              name="projectName"
              getValue={handleChange}
              placeholder="Input project name"
              label="Name"
            />
          </Box>
          {/* description */}
          <Box
            sx={{
              marginBottom: '20px'
            }}
          >
            <InputLabel
              sx={{
                marginBottom: '10px'
              }}
            >
              Desciption
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
              <StyledEditor>
                <CKEditor
                  editor={ClassicEditor}
                  onChange={handleGetDataEditor}
                />
              </StyledEditor>
            </Box>
          </Box>
          {/* category project */}
          <Box
            sx={{
              marginBottom: '20px'
            }}
          >
            <SelectInput
              values={props.values.categoryId}
              name="categoryId"
              getValue={handleChange}
              label="Category"
              data={arrCategory}
            />
          </Box>
          <Box textAlign={'center'}>
            <Button type="submit">Submit</Button>
          </Box>
        </Box>
      </Paper>
    </Box>
  )
}

const CreateProject2 = withFormik({
  enableReinitialize: true,
  mapPropsToValues: props => {
    const arrCategory = props.arrProjectCategory

    let select
    if (arrCategory) {
      select = arrCategory
      return {
        projectName: '',
        description: '',
        categoryId: select[0]?.id
      }
    } else {
      select = 1
      return {
        projectName: '',
        description: '',
        categoryId: select
      }
    }
  },
  handleSubmit: (values, { props, setSubmitting }) => {
    // console.log('handlesubmit', props)
    props.dispatch(createProjectAthorizeAction(values, props.navigate))
  }
})(LayoutCreateProject)

const mapStateToProps = state => {
  return {
    arrProjectCategory: state.projectCategoryReducer.projectCategory,
    navigate: state.stateReducer.navigate
  }
}

export default connect(mapStateToProps)(CreateProject2)
