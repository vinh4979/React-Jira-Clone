import { baseService } from './BaseService'

export class UserService extends baseService {
  constructor() {
    super()
  }
  signup = body => {
    return this.post('/api/Users/signup', body)
  }

  signin = body => {
    return this.post('/api/Users/signin', body)
  }

  getUser = key => {
    return key.trim() !== ''
      ? this.get(`/api/Users/getUser?keyword=${key}`)
      : this.get(`/api/Users/getUser`)
  }
}

export const userService = new UserService()
