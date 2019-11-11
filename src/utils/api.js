import {get,post} from './xhr'

//登录
export const pcLogin = p => post('/users/pclogin', p)
//验证码
export const smsCode = p => post('/wx/smsCode', p)


//车辆查询
export const findCar = p => post('/car/carlist', p)
//车辆跟踪
export const findTrackNewOne = p => post('car/findTrackNewOne', p)
//车辆轨迹
export const findTrack = p => post('car/findTrack', p)


//车辆管理
export const carList = p => post('car/list', p)
//车辆录入
export const carAdd = p => post('car/add', p)
//车辆删除
export const carDelete = p => post('car/delete', p)
//车辆修改
export const carUpdate = p => post('car/update', p)


//查询电子围栏
export const listFence = p => post('rail/list', p)
//添加电子围栏
export const addFence = p => post('rail/add', p)
//删除电子围栏
export const deleteFence = p => post('rail/delete', p)


//保险套餐
export const findSafe = p => post('safe/list', p)
