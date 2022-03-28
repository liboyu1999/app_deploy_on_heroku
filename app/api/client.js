import {create} from 'apisauce';

const apiClient = create ({
    baseURL: "http://10.229.26.139:9000/api/",
});

export default apiClient;