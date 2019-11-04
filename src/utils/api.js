import {get,post} from './xhr'

//登录
export const apiAddress = p => post('/users/login', p)