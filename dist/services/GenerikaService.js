import { request as __request } from '@/client/core/request';
export class GenerikaService {
    static getGenerikaItems(model_name, openAPI) {
        return __request(openAPI, {
            method: 'GET',
            url: `/api/v1/${model_name}/`
        });
    }
}
