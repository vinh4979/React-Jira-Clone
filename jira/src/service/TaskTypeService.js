import { baseService } from './BaseService'

export class TaskTypeService extends baseService {
  constructor() {
    super()
  }

  getTaskType = () => {
    return this.get('/api/TaskType/getAll')
  }
}

export const taskTypeService = new TaskTypeService()
