import swal from 'sweetalert2'
import 'sweetalert2/dist/sweetalert2.min.css'

const Swal={}
Swal.install = function (Vue, type) {
  // 4. 添加实例方法
  Vue.prototype.$swal = swal;
};
export default Swal
