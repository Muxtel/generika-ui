import { QueryKey } from '@tanstack/react-query';
import { type ValidationSchema } from "./GenerikaTable";
export type GenerikaActionsMenuProps<T> = {
    record: T;
    mutationEditFn: (record: T) => Promise<any>;
    mutationDeleteFn: (record: T) => Promise<any>;
    validationSchema?: ValidationSchema<T>;
    hiddenFields?: (keyof T)[];
    schema: any;
    queryKey?: QueryKey;
    openAPI: any;
};
export declare function GenerikaActionsMenu<TypeRecord extends Record<string, any>>({ record, mutationEditFn, mutationDeleteFn, validationSchema, hiddenFields, schema, queryKey, openAPI }: GenerikaActionsMenuProps<TypeRecord>): any;
