import { request } from "./request";

// 根据角色获取用户
export function getUserByRole(roleId) {
  return request({
    url: '/user/role' + '/' +roleId
  })
}

// 新建工单
export function WorkOrder(type, description, userId) {
  return request({
    url: '/workOrder',
    method: 'post',
    data: {
      type,
      description,
      userId
    }
  })
}

// 分页获取工单数据
export function getWorkOrderData(userId, current, size) {
  return request({
    url: '/workOrder',
    params: {
      userId,
      current,
      size
    }
  })
}

// 完成工单请求
export function finishWorkOrder(id) {
  return request({
    url: '/workOrder/' + id,
    method: 'patch'
  })
}

// 删除工单请求
export function deleteWorkOrder(id) {
  return request({
    url: '/workOrder' + '/' + id,
    method: 'delete'
  })
}



