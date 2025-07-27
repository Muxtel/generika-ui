import type { CancelablePromise } from '@/client';
export type Item<T = Record<string, any>> = T & {
    id: string;
};
type Data = {
    id: string;
    requestBody: Record<string, any>;
};
export type ItemUpdate = {
    model_name: string;
    data: Data;
};
export declare class GenerikaService {
    static getGenerikaItems(model_name: string, openAPI: any): CancelablePromise<Item>;
}
export {};
