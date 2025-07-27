import { useState, useEffect } from "react";
import { useMutation } from "@tanstack/react-query";
import { DefaultValues, FieldValues, useForm } from "react-hook-form";
import { GenerikaService } from "../services/GenerikaService";
import { useQueryClient } from "@tanstack/react-query";
import { ApiError } from "@/client/core/ApiError";

type Item<T = Record<string, any>> = T & { id: string };

const useGetGenerikaItems = (model_name: string, openAPI) => {
  const [items, setItems] = useState<Item[]>([]);
  
  useEffect(() => {
    if (!model_name) return;

    GenerikaService.getGenerikaItems(model_name, openAPI)
      .then((data: any) => {
        if (Array.isArray(data)) {
          setItems(data);
        } else if (Array.isArray(data.data)) {
          setItems(data.data);
        } else {
          setItems([data.data]);
        }
      })
      .catch((err: unknown) => {
        console.error(`Erreur lors du chargement de ${model_name}:`, err);
      });
  }, [model_name]);


  return items;
};


// EDIT
///////////////////////////////////////////////////////////////////
function useEditGenerikaItem<T extends FieldValues>(
    record: T,
    mutationEditFn: (record: T) => Promise<any>,
    schema: T
  ){
    
    const fields = Object.entries(schema.properties).map(([key, value]) => {
      const schema = value as any; 
      const type =
                  schema.anyOf?.[0]?.$ref !== undefined
                    ? "select"
                    : schema.type ?? "string";
      return {
          name: key,
          label: schema.title || key,
          type,
          required: schema.nullable === false || (schema.anyOf && !schema.anyOf.some((t: any) => t.type === "null")),
      };
    });
    
    const { register, handleSubmit, reset, formState: { errors, isSubmitting }, control} = useForm<T>({
      mode: "onBlur",
      criteriaMode: "all",
      defaultValues: record as DefaultValues<T>,
    });
    const mutation = useMutation({
      mutationFn: mutationEditFn,
      onSuccess: () => {
        reset();
      },
      onError: (err: any) => {
        handleError(err);
      },
    });


    const getModifiedFields = (initial: Record<string, any>, current: Record<string, any>) => {
      return Object.keys(current).reduce((diff: Record<string, any>, key) => {
        if (initial[key] !== current[key]) {
          diff[key] = current[key];
        }
        return diff;
      }, {});
    };

    const onSubmit = async (data: any) => {
      const modifiedFields = getModifiedFields(record as any, data);
      mutation.mutate({ id: record.id, ...modifiedFields } as unknown as T);
    };

    return { handleSubmit, onSubmit, register, mutation, fields, control, errors, isSubmitting }

}

// ADD
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const useAddGenerikaItem = <T extends Record<string, any>> (model_name: string, schema: T, mutationFn: any) =>{
  const fields = Object.entries(schema.properties).map(([key, value]) => {
    const schema = value as any; 
    const type = schema.anyOf?.[0]?.$ref !== undefined
                    ? "select"
                    : schema.type ?? "string";
    return {
        name: key,
        label: schema.title || key,
        type,
        required: schema.nullable === false || (schema.anyOf && !schema.anyOf.some((t: any) => t.type === "null")),
    };
    });
  const queryClient = useQueryClient();
  const mutation = useMutation({
      mutationFn,
      onSuccess: () => {
          console.log(`${model_name} créé avec succès`);
      },
      onError: (err) => {
          handleError(err as ApiError);
      },
      onSettled: () => {
          queryClient.invalidateQueries({ queryKey: [model_name] });
      },
  });
  const onSubmit = (data: any) => {
    mutation.mutate(data);
  }

  const { register, handleSubmit, formState: { errors, isSubmitting }, control} = useForm<T>({
      mode: "onBlur",
      criteriaMode: "all"
  });
  return { handleSubmit, onSubmit, register, mutation, fields, control, errors, isSubmitting }

}
export const handleError = (err: ApiError) => {
  const errDetail = (err.body as any)?.detail
  let errorMessage = errDetail || "Something went wrong."
  if (Array.isArray(errDetail) && errDetail.length > 0) {
    errorMessage = errDetail[0].msg
  }
  console.log(errorMessage)
}

export default useGetGenerikaItems;
export {useGetGenerikaItems, useEditGenerikaItem, useAddGenerikaItem};
