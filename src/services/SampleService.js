import axios from 'axios';

const API_URL = 'http://127.0.0.1:8000/api/v1';

class SampleService {
  predict(img) {
    let formData = new FormData();
    formData.append("image", img);
    return axios.post(API_URL + '/predict', formData)
  }
}

export default new SampleService();