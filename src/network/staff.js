import { request } from "./request";

// 获取员工信息
export function getStaffData(current, size, keyWord) {
  return request({
    url: '/user',
    params: {
      current,
      size
    }
  })
}

// 获取角色列表
export function getRoleList() {
  return request({
    url: '/role'
  })
}

// 新建人员信息
export function addStaff(userName, password, nickName, email, phone, sex, roleId) {
  return request({
    url: '/register',
    method: 'post',
    data: {
      userName,
      password,
      nickName,
      email,
      phone,
      sex,
      roleId
    }
  })
}

// 获取每个用户的角色列表
export function getUserRole(current, size) {
  return request({
    url: '/role/user'
  })
}

// 获取职位列表
export function getRole() {
  return request({
    url: '/role'
  })
} 

// 更新用户职位
export function updateRole(uid, rid) {
  return request({
    url: '/role',
    method: 'put',
    params: {
      uid,
      rid
    }
  })
}

// 更新用户状态
export function updateStatus(id, status) {
  return request({
    url: '/user/' + id,
    method: 'patch',
    params: {
      id,
      status
    }
  })
}

// 根据用户id获取用户信息
export function getUserById(id) {
  return request({
    url: '/user/' + id
  })
}

// 更新用户信息
export function updateUser(id, nickName, email, phone, sex) {
  return request({
    url: '/user/' + id,
    method: 'put',
    data: {
      nickName,
      email,
      phone,
      sex
    }
  })
}

// 根据id删除用户信息
export function deleteUser(id) {
  return request({
    url: '/user/' + id,
    method: 'delete'
  })
}
