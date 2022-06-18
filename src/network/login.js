import { request } from "./request";

export function login(userName, password) {
  return request({
    url: '/login',
    method: 'post',
    data: {
      userName,
      password
    }
  })
} 
