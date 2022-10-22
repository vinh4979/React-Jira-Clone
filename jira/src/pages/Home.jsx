import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import GetProjectDetail from 'src/components/common/GetProjectDetail'
import MainTask from 'src/components/common/MainTask'
import AssignUserModal from 'src/components/common/modal.component/AssignUserModal'
import {
  getAllProjectAction,
  getProjectDetailAction
} from 'src/redux/action/ProjectAuthorizeAction'
import { statusAction } from '../redux/action/StatusAction'
import { getUserAction } from '../redux/action/userAction'

export default function Home() {
  const dispatch = useDispatch()
  const { statusBlog } = useSelector(state => state.caseDataReducer)
  const { arrProjectDetail } = useSelector(state => state.projectReducer)

  const hanldeGetMyProject = () => {
    let item
    if (arrProjectDetail) {
      const myProject = arrProjectDetail?.filter(project => project.id === 7850)
      item = myProject[0]
    }

    return item
  }

  console.log('user reducer:', arrProjectDetail)

  useEffect(() => {
    dispatch(statusAction())
    dispatch(getAllProjectAction())
    dispatch(getProjectDetailAction())
    dispatch(getUserAction(['bui vinh']))
  }, [dispatch])
  return (
    <>
      <MainTask statusBlog={statusBlog} />
      <GetProjectDetail
        myProject={hanldeGetMyProject() ? hanldeGetMyProject() : ''}
      />
      <AssignUserModal />
    </>
  )
}
