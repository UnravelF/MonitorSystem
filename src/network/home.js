import { request } from "./request";

// 获取设备总数
export function getDeviceTotal() {
  return request({
    url: '/device/count'
  })
}

// 获取用户总数
export function getUserTotal() {
  return request({
    url: '/user/count'
  })
}

// 获取工单总数
export function getOrderTotal() {
  return request({
    url: '/workOrder/count'
  })
}

// 获取历史警报总数
export function getLogTotal() {
  return request({
    url: '/log/count'
  })
}
