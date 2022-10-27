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

  getUser = body => {
    return this.get(`/api/Users/getUser?keyword=${body}`)
  }

  getAllUser = () => {
    return this.get('/api/Users/getUser')
  }
}

export const userService = new UserService()
