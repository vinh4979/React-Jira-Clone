import { baseService } from './BaseService'

export class ProjectCategoryService extends baseService {
  constructor() {
    super()
  }

  getProjectCategory = () => {
    return this.get('/api/ProjectCategory')
  }
}

export const projectCategoryService = new ProjectCategoryService()
