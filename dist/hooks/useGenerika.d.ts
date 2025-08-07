import { FieldValues } from "react-hook-form";
import { ApiError } from "@/client/core/ApiError";
type Item<T = Record<string, any>> = T & {
    id: string;
};
declare const useGetGenerikaItems: (model_name: string, openAPI: any) => Item<Record<string, any>>[];
declare function useEditGenerikaItem<T extends FieldValues>(record: T, mutationEditFn: (record: T) => Promise<any>, schema: T): {
    handleSubmit: import("react-hook-form").UseFormHandleSubmit<T, T>;
    onSubmit: (data: any) => Promise<void>;
    register: import("react-hook-form").UseFormRegister<T>;
    mutation: import("@tanstack/react-query").UseMutationResult<any, any, T, unknown>;
    fields: {
        name: string;
        label: any;
        type: any;
        required: any;
    }[];
    control: import("react-hook-form").Control<T, any, T>;
    errors: import("react-hook-form").FieldErrors<T>;
    isSubmitting: boolean;
};
declare const useAddGenerikaItem: <T extends Record<string, any>>(model_name: string, schema: T, mutationFn: any) => {
    handleSubmit: import("react-hook-form").UseFormHandleSubmit<T, T>;
    onSubmit: (data: any) => void;
    register: import("react-hook-form").UseFormRegister<T>;
    mutation: import("@tanstack/react-query").UseMutationResult<unknown, Error, void, unknown>;
    fields: {
        name: string;
        label: any;
        type: any;
        required: any;
    }[];
    control: import("react-hook-form").Control<T, any, T>;
    errors: import("react-hook-form").FieldErrors<T>;
    isSubmitting: boolean;
};
export declare const handleError: (err: ApiError) => void;
export default useGetGenerikaItems;
export { useGetGenerikaItems, useEditGenerikaItem, useAddGenerikaItem };
