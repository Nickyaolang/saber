import request from '@/router/axios';

export const getList = (current, size, params) => {
  return request({
    url: '/api/blade-activity/activity/list',
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
    url: '/api/blade-activity/activity/detail',
    method: 'get',
    params: {
      id
    }
  })
}

export const remove = (ids) => {
  return request({
    url: '/api/blade-activity/activity/remove',
    method: 'post',
    params: {
      ids,
    }
  })
}

export const add = (row) => {
  return request({
    url: '/api/blade-activity/activity/submit',
    method: 'post',
    data: row
  })
}
export const update = (row) => {
  return request({
    url: '/api/blade-activity/activity/submit',
    method: 'post',
    data: row
  })
}
export const begin = (id) => {
  return request({
    url: '/api/blade-activity/activity/begin',
    method: 'post',
    params: {
      id,
    }
  })
}

