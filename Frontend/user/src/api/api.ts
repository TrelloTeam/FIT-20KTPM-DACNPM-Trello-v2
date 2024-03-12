import axios from 'axios'

//Export default thì ko nên đôi khi import thì mình ko biết là đang import cái nào
// VD: import axios from '../api/api';
// export default axios.create({
//     baseURL: api.prod,
// });

//Export const thì sẽ lấy đúng cái tên khi import ở các component khác
// VD: import { axiosPrivate } from '../api/api';
// axios.interceptors.request.use(function (config) {
//     // Cấu hình tiêu đề để cho phép CORS
//     config.headers['Access-Control-Allow-Origin'] = 'http://localhost:3000/#/profile/6550abc2c99e30c698187add'; // Thay đổi '*' bằng tên miền của máy chủ API thực tế
//     config.headers['Access-Control-Allow-Headers'] = 'Origin, X-Requested-With, Content-Type, Accept';

//     return config;
//   });
export const axiosPrivate = axios.create({
  baseURL: 'http://localhost:3333',
  headers: { 'Content-Type': 'application/json' },
  withCredentials: true
})
