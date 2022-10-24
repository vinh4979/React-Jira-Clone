import { baseService } from './BaseService'

export class ProjectService extends baseService {
  constructor() {
    super()
  }

  getProject = key => {
    return key.trim() !== ''
      ? this.get(`/api/Project/getAllProject?keyword=${key}`)
      : this.get(`/api/Project/getAllProject`)
  }
  deleteProject = id => {
    return this.delete(`/api/Project/deleteProject?projectId=${id}`)
  }
  getProjectById = id => {
    return this.get()
  }
}

export const projectService = new ProjectService()
