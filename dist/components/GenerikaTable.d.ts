import { RegisterOptions } from "react-hook-form";
import { QueryKey } from '@tanstack/react-query';
export type ValidationSchema<T> = {
    [K in keyof T]?: RegisterOptions;
};
export type FieldType = "text" | "number" | "select" | "uuid";
export type FieldDef = {
    name: string;
    label: string;
    required: boolean;
    type: FieldType;
};
type GenerikaTableProps<T> = {
    getFn: () => Promise<any>;
    mutationEditFn: (data: T) => Promise<any>;
    mutationDeleteFn: (data: T) => Promise<any>;
    hiddenFields?: (keyof T)[];
    validationSchema: ValidationSchema<T>;
    schema: any;
    queryKey: QueryKey;
    openAPI: any;
};
export declare function GenerikaTable<TypeRecord extends Record<string, any>>({ getFn, mutationEditFn, mutationDeleteFn, hiddenFields, validationSchema, schema, queryKey, openAPI }: GenerikaTableProps<TypeRecord>): import("react/jsx-runtime").JSX.Element;
export {};
