import { request } from "./request";

// 添加设备请求
export function addEquipement(deviceId, deviceName, location, temLimit, humLimit, smokeLimit) {
  return request({
    url: '/device',
    method: 'post',
    data: {
      deviceId,
      deviceName,
      location,
      temLimit,
      humLimit,
      smokeLimit
    }
  })
}

// 渲染所有设备请求
export function getEquipmentData(current, size, keyWord) {
  return request({
    url: '/device',
    method: 'get',
    params: {
      current,
      size,
      keyWord
    }
  })
}

// 根据id获取编辑设备信息
export function editDeviceById(id) {
  return request({
    url: '/device' + '/' + id
  })
}

// 根据id编辑设备信息
export function editDevice(id, deviceId, deviceName, location, temLimit, humLimit, smokeLimit) {
  return request({
    url: '/device' + '/' + id,
    method: 'put',
    data: {
      deviceId,
      deviceName,
      location,
      temLimit,
      humLimit,
      smokeLimit
    }
  })
}

// 根据id删除设备信息
export function deleteDeviceById(id) {
  return request({
    url: '/device' + '/' + id,
    method: 'delete'
  })
}

// 获取历史报警列表
export function getWarninlog(current, size) {
  return request({
    url: '/log',
    params: {
      current,
      size
    }
  })
}


