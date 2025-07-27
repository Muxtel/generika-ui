import { useState, useEffect } from "react";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { GenerikaService } from "../services/GenerikaService";
import { useQueryClient } from "@tanstack/react-query";
const useGetGenerikaItems = (model_name, openAPI) => {
    const [items, setItems] = useState([]);
    useEffect(() => {
        if (!model_name)
            return;
        GenerikaService.getGenerikaItems(model_name, openAPI)
            .then((data) => {
            if (Array.isArray(data)) {
                setItems(data);
            }
            else if (Array.isArray(data.data)) {
                setItems(data.data);
            }
            else {
                setItems([data.data]);
            }
        })
            .catch((err) => {
            console.error(`Erreur lors du chargement de ${model_name}:`, err);
        });
    }, [model_name]);
    return items;
};
// EDIT
///////////////////////////////////////////////////////////////////
function useEditGenerikaItem(record, mutationEditFn, schema) {
    const fields = Object.entries(schema.properties).map(([key, value]) => {
        const schema = value;
        const type = schema.anyOf?.[0]?.$ref !== undefined
            ? "select"
            : schema.type ?? "string";
        return {
            name: key,
            label: schema.title || key,
            type,
            required: schema.nullable === false || (schema.anyOf && !schema.anyOf.some((t) => t.type === "null")),
        };
    });
    const { register, handleSubmit, reset, formState: { errors, isSubmitting }, control } = useForm({
        mode: "onBlur",
        criteriaMode: "all",
        defaultValues: record,
    });
    const mutation = useMutation({
        mutationFn: mutationEditFn,
        onSuccess: () => {
            reset();
        },
        onError: (err) => {
            handleError(err);
        },
    });
    const getModifiedFields = (initial, current) => {
        return Object.keys(current).reduce((diff, key) => {
            if (initial[key] !== current[key]) {
                diff[key] = current[key];
            }
            return diff;
        }, {});
    };
    const onSubmit = async (data) => {
        const modifiedFields = getModifiedFields(record, data);
        mutation.mutate({ id: record.id, ...modifiedFields });
    };
    return { handleSubmit, onSubmit, register, mutation, fields, control, errors, isSubmitting };
}
// ADD
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const useAddGenerikaItem = (model_name, schema, mutationFn) => {
    const fields = Object.entries(schema.properties).map(([key, value]) => {
        const schema = value;
        const type = schema.anyOf?.[0]?.$ref !== undefined
            ? "select"
            : schema.type ?? "string";
        return {
            name: key,
            label: schema.title || key,
            type,
            required: schema.nullable === false || (schema.anyOf && !schema.anyOf.some((t) => t.type === "null")),
        };
    });
    const queryClient = useQueryClient();
    const mutation = useMutation({
        mutationFn,
        onSuccess: () => {
            console.log(`${model_name} créé avec succès`);
        },
        onError: (err) => {
            handleError(err);
        },
        onSettled: () => {
            queryClient.invalidateQueries({ queryKey: [model_name] });
        },
    });
    const onSubmit = (data) => {
        mutation.mutate(data);
    };
    const { register, handleSubmit, formState: { errors, isSubmitting }, control } = useForm({
        mode: "onBlur",
        criteriaMode: "all"
    });
    return { handleSubmit, onSubmit, register, mutation, fields, control, errors, isSubmitting };
};
export const handleError = (err) => {
    const errDetail = err.body?.detail;
    let errorMessage = errDetail || "Something went wrong.";
    if (Array.isArray(errDetail) && errDetail.length > 0) {
        errorMessage = errDetail[0].msg;
    }
    console.log(errorMessage);
};
export default useGetGenerikaItems;
export { useGetGenerikaItems, useEditGenerikaItem, useAddGenerikaItem };
