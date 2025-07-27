import { type ValidationSchema } from "./GenerikaTable";
import { QueryKey } from "@tanstack/react-query";
type GenerikaAddProps<T> = {
    model_name: string;
    validationSchema: ValidationSchema<T>;
    hiddenFields?: (keyof T)[];
    mutationFn: (data: T) => Promise<any>;
    schema: any;
    queryKey: QueryKey;
    openAPI: any;
};
export declare const GenerikaAdd: <T extends Record<string, any>>({ model_name, validationSchema, hiddenFields, mutationFn, schema, queryKey, openAPI }: GenerikaAddProps<T>) => any;
export {};
