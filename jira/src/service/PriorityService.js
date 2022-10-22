import { baseService } from './BaseService'

export class PriorityService extends baseService {
  constructor() {
    super()
  }

  getPriority = () => {
    return this.get('/api/Priority/getAll')
  }
}

export const priorityService = new PriorityService()
