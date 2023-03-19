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
}

export default new SampleService();