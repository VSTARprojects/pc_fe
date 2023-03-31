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

  set_shared_commit(data) {
    let config = {
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Token ${AuthService.getToken()}`,
        }
    }
    const response =  axios.post(API_URL + "/sharedcomments/", data, config)
    return response
  }

  get_shared_comments_by_sample(sid) {
    const data = {
        "sample_id": sid,
    }
    let config = {
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Token ${AuthService.getToken()}`,
        }
    }

    const response =  axios.post(API_URL + "/sharedcomments/getsamplecomments", data, config)
    return response
  }
}

export default new SharedCommentService();