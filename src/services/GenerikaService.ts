import type { CancelablePromise } from '@/client';
import { request as __request } from '@/client/core/request';

export type Item<T = Record<string, any>> = T & { id: string };

type Data = {
    id: string,
    requestBody: Record<string, any>,
}

export type ItemUpdate = {
    model_name: string,
    data: Data,
};

export class GenerikaService {
    public static getGenerikaItems(model_name: string, openAPI: any): CancelablePromise<Item> {
        return __request(openAPI, {
        method: 'GET',
        url: `/api/v1/${model_name}/`
        });
    }
  }

