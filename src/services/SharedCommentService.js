import axios from 'axios';
import AuthService from './AuthService';

const API_URL = 'http://127.0.0.1:8000/api/v1';

class SharedCommentService {
  // use a constructor for config

  get_shared_comments() {
    let config = {
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Token ${AuthService.getToken()}`,
        }
    }

    const response =  axios.get(API_URL + "/sharedcomments/", config)
    return response
  }
}

export default new SharedCommentService();