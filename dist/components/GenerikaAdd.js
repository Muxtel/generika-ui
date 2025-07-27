import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useRef, useState, useEffect } from "react";
import { Button, ButtonGroup, DialogActionTrigger, Input, VStack } from '@chakra-ui/react';
import { Controller } from "react-hook-form";
import { DialogBody, DialogCloseTrigger, DialogContent, DialogFooter, DialogHeader, DialogRoot, DialogTitle, DialogTrigger, } from "./ui/dialog";
import { Field } from "./ui/field";
import { FaPlus } from "react-icons/fa";
import { GenerikaSelect } from "./GenerikaSelect";
import { useAddGenerikaItem } from "../hooks/useGenerika";
import { useQueryClient } from "@tanstack/react-query";
export const GenerikaAdd = ({ model_name, validationSchema, hiddenFields, mutationFn, schema, queryKey, openAPI }) => {
    const [isOpen, setIsOpen] = useState(false);
    const { handleSubmit, fields, onSubmit, register, control, errors, isSubmitting, mutation } = useAddGenerikaItem(model_name, schema, mutationFn);
    const queryClient = useQueryClient();
    useEffect(() => {
        if (mutation.isSuccess) {
            setIsOpen(false);
            queryClient.invalidateQueries({ queryKey });
            mutation.reset();
        }
    }, [mutation.isSuccess]);
    const contentRef = useRef(null);
    return (_jsxs(DialogRoot, { open: isOpen, onOpenChange: ({ open }) => setIsOpen(open), children: [_jsx(DialogTrigger, { asChild: true, children: _jsxs(Button, { value: "add-item", my: 4, children: [_jsx(FaPlus, { fontSize: "16px" }), "Add Item"] }) }), _jsxs(DialogContent, { ref: contentRef, children: [_jsxs("form", { onSubmit: handleSubmit(onSubmit), children: [_jsx(DialogHeader, { children: _jsx(DialogTitle, { children: "Ajouter" }) }), _jsx(DialogBody, { children: _jsx(VStack, { gap: 4, children: fields
                                        .filter(({ name }) => !hiddenFields?.includes(name))
                                        .map(({ name, label, required, type = "text" }) => {
                                        return (_jsx(Field, { required: required, invalid: !!errors[name], errorText: errors[name]?.message, label: label, children: type === "select" ? (_jsx(Controller, { name: name + "_id", control: control, render: ({ field }) => (_jsx(GenerikaSelect, { model_name: name, contentRef: contentRef, onChange: (val) => {
                                                        field.onChange(val[0]);
                                                    }, openAPI: openAPI })) })) : (_jsx(Input, { ...register(name, {
                                                    ...validationSchema?.[name],
                                                    required: validationSchema?.[name]?.required
                                                        ?? (required ? `${label} est requis` : false),
                                                }), type: type })) }, String(name)));
                                    }) }) }), _jsx(DialogFooter, { children: _jsxs(ButtonGroup, { children: [_jsx(DialogActionTrigger, { asChild: true, children: _jsx(Button, { variant: "subtle", disabled: isSubmitting, children: "Annuler" }) }), _jsx(Button, { type: "submit", loading: isSubmitting, children: "Sauvegarder" })] }) })] }), _jsx(DialogCloseTrigger, {})] })] }));
};
