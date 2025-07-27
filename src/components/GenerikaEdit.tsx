import { useEffect, useRef } from "react";
import { Button, ButtonGroup, DialogActionTrigger, Input, VStack } from '@chakra-ui/react';
import { QueryKey, useQueryClient } from '@tanstack/react-query';
import { useState } from "react";
import { Controller, Path } from "react-hook-form";
import {
    DialogBody,
    DialogCloseTrigger,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogRoot,
    DialogTitle,
    DialogTrigger,
  } from "./ui/dialog";
import { Field } from "./ui/field";
import { FaExchangeAlt } from "react-icons/fa";
import {useEditGenerikaItem} from "../hooks/useGenerika";
import { type ValidationSchema } from "./GenerikaTable";
import { GenerikaSelect } from "./GenerikaSelect";


type EditRecordProps<T> = {
  record: T,
  mutationEditFn : (record: T) => Promise<any>,
  queryKey?: QueryKey,
  validationSchema? : ValidationSchema<T>,
  hiddenFields? : (keyof T)[],
  schema: any,
  openAPI: any
};


export function GenerikaEdit<TypeRecord extends Record<string, any>>({
    record,
    mutationEditFn,
    queryKey,
    validationSchema,
    hiddenFields,
    schema,
    openAPI
  }: EditRecordProps<TypeRecord>) {

  const { handleSubmit, onSubmit, register, mutation, fields, control, errors, isSubmitting } = useEditGenerikaItem(record, mutationEditFn, schema)
  const [isOpen, setIsOpen] = useState(false);
  const queryClient = useQueryClient();
  
  useEffect(() => {
    if(mutation.isSuccess){
      setIsOpen(false);
      queryClient.invalidateQueries({ queryKey });
    }  
  }, [mutation.isSuccess]);
  
  const contentRef = useRef<HTMLDivElement>(null);
  
  return (
    <DialogRoot open={isOpen} onOpenChange={({ open }) => setIsOpen(open)}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="sm">
          <FaExchangeAlt />
          Edit
        </Button>
      </DialogTrigger>

      <DialogContent ref={contentRef}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogHeader>
            <DialogTitle>Edit</DialogTitle>
          </DialogHeader>

          <DialogBody>
            <VStack gap={4}>
            {fields
              .filter(({ name }) => !hiddenFields?.includes(name))
              .map(({ name, label, required, type = "text" }) => {
                const value = record?.[name];
                const relatedFieldName = name + "_id";
                const selected = (type === "select") ? value : undefined 
                
                return (
                  <Field
                    key={String(name)}
                    required={required}
                    invalid={!!errors[name as string]}
                    errorText={errors[name as string]?.message as string}
                    label={label}
                  >
                    {type === "select" ? (
                      <Controller
                        name={name + "_id"  as keyof Path<string>}
                        control={control}
                        defaultValue={selected?.id}
                        render={({ field }) => (  
                          <GenerikaSelect
                            model_name = {name}
                            selected={selected}
                            contentRef={contentRef} 
                            onChange={(val: any) =>{
                              field.onChange(val[0])
                            }} 
                            openAPI = {openAPI}
                          />
                        )}
                      />
                    ) : (
                      <Input
                        defaultValue={value}
                        {
                          ...register(name as any, {
                            ...validationSchema?.[name],
                            required: validationSchema?.[name]?.required
                              ?? (required ? `${label} est requis` : false),
                          })
                        }
                        type={type}
                      />
                    )}
                  </Field>
                );
              })}

            </VStack>
          </DialogBody>

          <DialogFooter>
            <ButtonGroup>
              <DialogActionTrigger asChild>
                <Button variant="subtle" disabled={isSubmitting}>
                  Cancel
                </Button>
              </DialogActionTrigger>
              <Button type="submit" loading={isSubmitting}>
                Save
              </Button>
            </ButtonGroup>
          </DialogFooter>
        </form>
        <DialogCloseTrigger />
      </DialogContent>
    </DialogRoot>
  );
}
