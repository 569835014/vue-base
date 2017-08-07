import Session from '../common/Session'
const state = {
  userInfo:Session.getItem('user')||{}
}

export default state
