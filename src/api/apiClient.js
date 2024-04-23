import axios from 'axios';
import config from '../config';

const apiClient = axios.create({
  baseURL: config.API_URL,
  //NOTE :  요청 타임아웃 설정
  timeout: 5_000,
});
//NOTE :  요청 인터셉터 추가
apiClient.interceptors.request.use(async (config) => {
  //NOTE :  요청을 보내기전 수정할 로직
  //NOTE: AccessToken 가져오기
  // const accessToken = localStorage.getItem('ACCESS_TOKEN');

  // if (accessToken) {
  //   config.headers['Authorization'] = `Bearer ${accessToken}`;
  // }

  //NOTE: 필수!!
  return config;
});

apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    //NOTE: 토큰이 만료된 경우
    if (
      error?.response?.data?.statusCode === 401 &&
      error?.response?.data?.message === 'TOKEN_EXPIRED'
    ) {
      const refreshToken = localStorage.getItem('REFRESH_TOKEN');
      const accessToken = localStorage.getItem('ACCESS_TOKEN');
      //NOTE: Refresh API 호출
      const response = await axios.post(`${config.API_URL}/auth/refresh`, {
        refreshToken,
        accessToken,
      });
      if (response.data) {
        const { accessToken, refreshToken } = response.data;
        //NOTE: 토큰 저장
        localStorage.setItem('ACCESS_TOKEN', accessToken);
        localStorage.setItem('REFRESH_TOKEN', refreshToken);

        //NOTE: 토큰 재발급 하고 다시 요청
        return await apiClient(error.config);
      } else {
        localStorage.clear();
      }
    }

    return Promise.reject(error);
  },
);

export default apiClient;
