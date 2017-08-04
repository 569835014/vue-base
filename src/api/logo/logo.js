/**
 * Created by geek on 2017/7/11.
 */
import axios from 'axios'
export const apiLogo=function (par) {
  return axios.get('/logo',{
    params:par
  })
};
