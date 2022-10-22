import React, { useEffect } from 'react'
import {
  getProjectDetailAction,
  updateProjectAction
} from 'src/redux/action/ProjectAuthorizeAction'
import { connect, useDispatch } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import {
  Box,
  Breadcrumbs,
  Button,
  InputLabel,
  Link,
  Paper,
  Typography
} from '@mui/material'
import InputForm from '../common/input.component/InputForm'
import SelectInput from 'src/components/common/input.component/SelectInput'
import { getUserAction } from 'src/redux/action/userAction'
import { StyledEditor } from 'src/pages/CreateProject2'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
import { CKEditor } from '@ckeditor/ckeditor5-react'
import { withFormik } from 'formik'
import { ProjectCategoryAction } from 'src/redux/action/ProjectCategoryAction'

function EditProject(props) {
  const dispatch = useDispatch()

  const param = useParams()

  const idProject = param.id
  const { handleSubmit, handleChange, setFieldValue, arrProjectDetail } = props

  useEffect(() => {
    dispatch(ProjectCategoryAction())
    dispatch(getProjectDetailAction(idProject))
    dispatch(getUserAction())
  }, [dispatch])

  // //GET INFO DETAIL OF PROJECT
  // const { arrProjectDetail } = useSelector(state => state.projectReducer)
  const { arrUser } = useSelector(state => state.userReducer)

  // project category was recived form redux throught transmission props
  const arrCategory = props.arrProjectCategory

  //GET DATA FORM EDITOR
  const handleGetDataEditor = (event, editor) => {
    const data = editor.getData()
    setFieldValue('description', data)
  }

  // NAVIGATE
  // const handleNavigate = () => {
  //   const data = navigate
  //   setFieldValue('navigate', data)
  // }
  //GET DATA FORM FORM INPUT PROJECT NAME
  // const handleGetDataProjectName = () => {
  //   const data = arrProjectDetail?.projectName
  //   setFieldValue('projectName', data)
  //   console.log(data)
  // }
  // console.log('info of project:', props)
  return (
    <Box>
      {/* bread crumbs */}
      <Breadcrumbs aria-label="breadcrumb">
        <Link underline="hover" color="inherit" href="/">
          React Jira Clone
        </Link>
        <Link underline="hover" color="inherit" href="/">
          My project
        </Link>
        <Typography color="text.primary">Edit project </Typography>
      </Breadcrumbs>

      <Paper
        sx={{
          maxWidth: '700px',
          padding: '20px',
          my: 3
        }}
      >
        <Box component={'form'} onSubmit={handleSubmit}>
          <Box>
            <Typography mt={2} mb={3} variant="h5" fontWeight={900}>
              Edit Project
            </Typography>
          </Box>

          {/* project name */}
          <Box
            sx={{
              marginBottom: '20px'
            }}
          >
            <InputForm
              // values={'dsaf'}
              name="projectName"
              getValue={handleChange}
              // placeholder="Input project name"
              label="Project Name"
              defaultValue={arrProjectDetail.projectName}
              // onChange={handleGetDataProjectName}
            />
          </Box>

          {/* creator */}
          <Box
            sx={{
              marginBottom: '20px'
            }}
          >
            <SelectInput
              values={props.values.creator}
              name="creator"
              getValue={handleChange}
              label="Creator"
              data={arrUser}
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
                  data={arrProjectDetail.description}
                  onChange={handleGetDataEditor}
                />
              </StyledEditor>
            </Box>
          </Box>
          {/* category */}
          <Box
            sx={{
              marginBottom: '20px'
            }}
          >
            <SelectInput
              values={props.values.categoryId}
              name="categoryId"
              getValue={handleChange}
              label="Category Project"
              data={arrCategory}
            />
          </Box>
          <Button type="submit">Submit</Button>
        </Box>
      </Paper>
    </Box>
  )
}
const EditProjectLayout = withFormik({
  // enableReinitialize: true,
  mapPropsToValues: props => {
    const arrProjectDetail = props.arrProjectDetail
    console.log('check props:', arrProjectDetail)

    if (arrProjectDetail === null) {
      return {
        projectName: '',
        creator: '',
        description: '',
        categoryId: ''
      }
    }
    if (arrProjectDetail !== null) {
      return {
        projectName: arrProjectDetail?.projectName,
        creator: arrProjectDetail?.creator.id,
        description: arrProjectDetail?.description,
        categoryId: arrProjectDetail?.projectCategory.id
      }
    }
  },
  handleSubmit: (values, { props, setSubmitting }) => {
    const body = values
    const idProject = props.arrProjectDetail.id
    const navigate = props.navigate
    console.log('handlesubmit', props)
    props.dispatch(updateProjectAction(body, idProject, navigate))
  }
})(EditProject)

const mapStateToProps = state => {
  return {
    arrProjectCategory: state.projectCategoryReducer.projectCategory,
    arrProjectDetail: state.projectReducer.arrProjectDetail,
    navigate: state.stateReducer.navigate
  }
}

export default connect(mapStateToProps)(EditProjectLayout)
