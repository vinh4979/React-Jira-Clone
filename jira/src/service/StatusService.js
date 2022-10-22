import { baseService } from './BaseService'

export class StatusService extends baseService {
  constructor() {
    super()
  }

  getBlockStatus = () => {
    return this.get('/api/Status/getAll')
  }

  updateStatus = body => {
    return this.put('/api/Project/updateStatus', body)
  }
}

export const statusService = new StatusService()
