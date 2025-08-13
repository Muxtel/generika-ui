/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Item } from '../models/Item';
import type { Model } from '../models/Model';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class DefaultService {
    /**
     * Get all models
     * @returns Model List of models
     * @throws ApiError
     */
    public static getApiV1Models(): CancelablePromise<Array<Model>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/models',
        });
    }
    /**
     * Get all items
     * @returns Item List of items
     * @throws ApiError
     */
    public static getApiV1Items(): CancelablePromise<Array<Item>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/items',
        });
    }
}
