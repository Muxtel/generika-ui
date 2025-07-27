import { QueryKey } from '@tanstack/react-query';
import { type ValidationSchema } from "./GenerikaTable";
type EditRecordProps<T> = {
    record: T;
    mutationEditFn: (record: T) => Promise<any>;
    queryKey?: QueryKey;
    validationSchema?: ValidationSchema<T>;
    hiddenFields?: (keyof T)[];
    schema: any;
    openAPI: any;
};
export declare function GenerikaEdit<TypeRecord extends Record<string, any>>({ record, mutationEditFn, queryKey, validationSchema, hiddenFields, schema, openAPI }: EditRecordProps<TypeRecord>): any;
export {};
