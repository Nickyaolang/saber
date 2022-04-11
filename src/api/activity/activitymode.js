import request from '@/router/axios';

export const getList = (current, size, params) => {
  return request({
    url: '/api/blade-activity-mode/activitymode/list',
    method: 'get',
    params: {
      ...params,
      current,
      size,
    }
  })
}

export const getDetail = (id) => {
  return request({
    url: '/api/blade-activity-mode/activitymode/detail',
    method: 'get',
    params: {
      id
    }
  })
}

export const remove = (ids) => {
  return request({
    url: '/api/blade-activity-mode/activitymode/remove',
    method: 'post',
    params: {
      ids,
    }
  })
}

export const usermode = (id) => {
  return request({
    url: '/api/blade-activity-mode/activitymode/usermode',
    method: 'post',
    params: {
      id,
    }
  })
}

export const add = (row) => {
  return request({
    url: '/api/blade-activity-mode/activitymode/submit',
    method: 'post',
    data: row
  })
}

export const update = (row) => {
  return request({
    url: '/api/blade-activity-mode/activitymode/submit',
    method: 'post',
    data: row
  })
}

