import { useRef, useState, useEffect } from "react";
import { Button, ButtonGroup, DialogActionTrigger, Input, VStack } from '@chakra-ui/react';
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
import { FaPlus } from "react-icons/fa";
// import { request as __request } from '@/client/core/request';
import { type ValidationSchema } from "./GenerikaTable";
import { GenerikaSelect } from "./GenerikaSelect";
import { useAddGenerikaItem } from "../hooks/useGenerika";
import { QueryKey, useQueryClient } from "@tanstack/react-query";


type GenerikaAddProps<T> = {
    model_name: string,
    validationSchema: ValidationSchema<T>,
    hiddenFields?: (keyof T)[],
    mutationFn: (data: T) => Promise<any>,
    schema: any,
    queryKey: QueryKey,
    openAPI : any
}
export const GenerikaAdd = <T extends Record<string, any>>({
    model_name,
    validationSchema,
    hiddenFields,
    mutationFn,
    schema,
    queryKey,
    openAPI
    }: GenerikaAddProps<T>) => {

    const [isOpen, setIsOpen] = useState(false);
    const { handleSubmit, fields, onSubmit, register, control, errors, isSubmitting, mutation } = useAddGenerikaItem(model_name, schema, mutationFn)
    const queryClient = useQueryClient();
    useEffect(() => {
        if(mutation.isSuccess){
            setIsOpen(false);
            queryClient.invalidateQueries( {queryKey} );
            mutation.reset();
        }  
    }, [mutation.isSuccess]);
    const contentRef = useRef<HTMLDivElement>(null);
    return (
        <DialogRoot open={isOpen} onOpenChange={({ open }) => setIsOpen(open)}>
        <DialogTrigger asChild>
            <Button value="add-item" my={4}>
                <FaPlus fontSize="16px" />
                Add Item
            </Button>
        </DialogTrigger>

        <DialogContent ref={contentRef}>
            <form onSubmit={handleSubmit(onSubmit)}>
            <DialogHeader>
                <DialogTitle>Ajouter</DialogTitle>
            </DialogHeader>

            <DialogBody>
                <VStack gap={4}>
                {fields
                .filter(({ name }) => !hiddenFields?.includes(name))
                .map(({ name, label, required, type = "text" }) => {
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
                            render={({ field }) => (  
                            <GenerikaSelect
                                model_name = {name}
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
                        Annuler 
                    </Button>
                </DialogActionTrigger>
                <Button type="submit" loading={isSubmitting}>
                        Sauvegarder
                </Button>
                </ButtonGroup>
            </DialogFooter>
            </form>
            <DialogCloseTrigger />
        </DialogContent>
        </DialogRoot>
    )
};