import { baseService } from './BaseService'

export class ProjectAuthorizeService extends baseService {
  constructor() {
    super()
  }

  getAllProject = () => {
    return this.get('/api/Project/getAllProject')
  }

  createProject = body => {
    return this.post('/api/Project/createProjectAuthorize', body)
  }

  getProjectDetail = idProjiect => {
    return this.get(`/api/Project/getProjectDetail?id=${idProjiect}`)
  }

  createTask = body => {
    return this.post('/api/Project/createTask', body)
  }

  getTaskDetail = taskId => {
    return this.get(`/api/Project/getTaskDetail?taskId=${taskId}`)
  }

  updateProject = (body, idProject) => {
    return this.put(`/api/Project/updateProject?projectId=${idProject}`, body)
  }

  deleteProject = idProject => {
    return this.delete(`/api/Project/deleteProject?projectId=${idProject}`)
  }

  assignUserProject = body => {
    return this.post('/api/Project/assignUserProject', body)
  }

  updateTask = body => {
    return this.put('/api/Project/updateTask', body)
  }
}

export const projectAuthorizeService = new ProjectAuthorizeService()
