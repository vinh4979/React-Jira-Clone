import axios from 'axios'
import { DOMAIN, TOKEN, TokenCybersoft } from 'src/config/configApi'

export class baseService {
  put = (url, model) => {
    return axios({
      url: `${DOMAIN}${url}`,
      method: 'PUT',
      data: model,
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem(TOKEN),
        TokenCybersoft: `${TokenCybersoft}`
      } //JWT
    })
  }

  post = (url, model) => {
    return axios({
      url: `${DOMAIN}${url}`,
      method: 'POST',
      data: model,
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem(TOKEN),
        TokenCybersoft: `${TokenCybersoft}`
      } //JWT
    })
  }

  get = url => {
    return axios({
      url: `${DOMAIN}${url}`,
      method: 'GET',
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem(TOKEN),
        TokenCybersoft: `${TokenCybersoft}`
      }
    })
  }

  delete = url => {
    return axios({
      url: `${DOMAIN}${url}`,
      method: 'DELETE',
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem(TOKEN),
        TokenCybersoft: `${TokenCybersoft}`
      }
    })
  }
}
