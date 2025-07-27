import { FieldValues } from "react-hook-form";
import { ApiError } from "@/client/core/ApiError";
declare const useGetGenerikaItems: (model_name: string, openAPI: any) => any;
declare function useEditGenerikaItem<T extends FieldValues>(record: T, mutationEditFn: (record: T) => Promise<any>, schema: T): {
    handleSubmit: any;
    onSubmit: (data: any) => Promise<void>;
    register: any;
    mutation: any;
    fields: {
        name: string;
        label: any;
        type: any;
        required: any;
    }[];
    control: any;
    errors: any;
    isSubmitting: any;
};
declare const useAddGenerikaItem: <T extends Record<string, any>>(model_name: string, schema: T, mutationFn: any) => {
    handleSubmit: any;
    onSubmit: (data: any) => void;
    register: any;
    mutation: any;
    fields: {
        name: string;
        label: any;
        type: any;
        required: any;
    }[];
    control: any;
    errors: any;
    isSubmitting: any;
};
export declare const handleError: (err: ApiError) => void;
export default useGetGenerikaItems;
export { useGetGenerikaItems, useEditGenerikaItem, useAddGenerikaItem };
