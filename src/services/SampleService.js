import axios from 'axios';
import AuthService from './AuthService';

const API_URL = 'http://127.0.0.1:8000/api/v1';

class SampleService {
  // use a constructor for config

  predict(img) {
    let formData = new FormData();
    formData.append("image", img);
    return axios.post(API_URL + '/predict', formData)
  }

  predict_sample(id) {
    let config = {
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Token ${AuthService.getToken()}`,
        }
    }
    const data = {"sample_id": id}
    return axios.post(API_URL + '/samples/predict', data, config);
  }

  async get_user_samples() {
    let config = {
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Token ${AuthService.getToken()}`,
        }
    }

    const response =  await axios.get(API_URL + "/samples/", config)

    const promises = response.data.map(async (element) => {
        var sample = element
        var sampleview = {
            id: sample.id,
            origin: sample.origin,
            date_of_collection: sample.date_collected,
            predictedLabel: sample.predicted_label,
            humanLabel: sample.human_label
        }

        const response = await axios.get(API_URL + `/patients/${sample.patient}`, config)
        var patient = response.data
        sampleview.patientName = patient.name
        sampleview.age = 11

        return sampleview
    });

    const samples = await Promise.all(promises)
    return samples
  }

  getSample(id) {
    let config = {
      headers: {
          "Authorization": `Token ${AuthService.getToken()}`,
      }
    }
    return axios.get(API_URL + `/samples/${id}`, config)
  }

  async getPatient(id) {
    let config = {
      headers: {
          "Authorization": `Token ${AuthService.getToken()}`,
      }
    }
    return axios.get(API_URL + `/patients/${id}`, config)
  }

  async search(query) {
    let config = {
        headers: {
            "Authorization": `Token ${AuthService.getToken()}`,
        }
    }
    
    console.log(API_URL + 'samples/search/', {"query":query}, config)
    const response =  await axios.post(API_URL + '/samples/search', {"query":query}, config)

    

    const promises = response.data.map(async (element) => {
        var sample = element
        var sampleview = {
            id: sample.id,
            origin: sample.origin,
            date_of_collection: sample.date_collected,
            predictedLabel: sample.predicted_label,
            humanLabel: sample.human_label
        }

        const response = await axios.get(API_URL + `/patients/${sample.patient}`, config)
        var patient = response.data
        sampleview.patientName = patient.name
        sampleview.age = 11

        return sampleview
    });

    const samples = await Promise.all(promises)
    
    return samples
  }


  async setAnnotations(sample_id, annotations) {
    let config = {
        headers: {
            "Authorization": `Token ${AuthService.getToken()}`,
        }
    }
    const response =  await axios.post(API_URL + '/samples/annotations', {"sample_id":sample_id, "annotations": annotations}, config)
    console.log(response)    
    return response
  }

  async setSample(formData) {
    let config = {
        headers: {
            "Authorization": `Token ${AuthService.getToken()}`,
            "Content-Type": "multipart/form-data",
        }
    }
    const response =  await axios.post(API_URL + '/samples/', formData, config)
    console.log(response)    
    return response
  }

  async setPatient(formData) {
    let config = {
        headers: {
            "Authorization": `Token ${AuthService.getToken()}`,
            "Content-Type": 'application/x-www-form-urlencoded',
        }
    }
    const response =  await axios.post(API_URL + '/patients/', formData, config)  
    return response
  }

  



  async getallPatients() {
    let config = {
        headers: {
            "Authorization": `Token ${AuthService.getToken()}`,
        }
    }
    const response =  await axios.get(API_URL + '/patients/', config)  
    return response
  }
}

export default new SampleService();