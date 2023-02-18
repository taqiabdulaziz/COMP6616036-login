import axios from 'axios';

const instance = axios.create();
const isProd = process.env.NODE_ENV === 'production';
const baseUrl = isProd ? 'https://dev.api.toel.app/user' : 'api';

instance.interceptors.response.use(
  (response) => response,
  (error) => {
    try {
      return Promise.reject(error.response.data);
    } catch (e) {
      return Promise.reject(error);
    }
  },
);

const login = (email, password) => instance.post(`/api/user/login`, {
  email,
  password,
});

const register = (email, password) => instance.post('api/registration/initial', {
  email,
  password,
  legalName: email,
  userId: email,
  userType: 'SELLER'
})

const changePassword = async (email, password, newPassword) => {
  await login(email, password)
  await instance.post('api/password/forget/change-password', {
    userId: email,
    newPassword
  })
}

const userRepository = {
  login,
  register,
  changePassword
};

export default userRepository;
