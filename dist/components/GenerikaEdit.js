import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useRef } from "react";
import { Button, ButtonGroup, DialogActionTrigger, Input, VStack } from '@chakra-ui/react';
import { useQueryClient } from '@tanstack/react-query';
import { useState } from "react";
import { Controller } from "react-hook-form";
import { DialogBody, DialogCloseTrigger, DialogContent, DialogFooter, DialogHeader, DialogRoot, DialogTitle, DialogTrigger, } from "./ui/dialog";
import { Field } from "./ui/field";
import { FaExchangeAlt } from "react-icons/fa";
import { useEditGenerikaItem } from "../hooks/useGenerika";
import { GenerikaSelect } from "./GenerikaSelect";
export function GenerikaEdit({ record, mutationEditFn, queryKey, validationSchema, hiddenFields, schema, openAPI }) {
    const { handleSubmit, onSubmit, register, mutation, fields, control, errors, isSubmitting } = useEditGenerikaItem(record, mutationEditFn, schema);
    const [isOpen, setIsOpen] = useState(false);
    const queryClient = useQueryClient();
    useEffect(() => {
        if (mutation.isSuccess) {
            setIsOpen(false);
            queryClient.invalidateQueries({ queryKey });
        }
    }, [mutation.isSuccess]);
    const contentRef = useRef(null);
    return (_jsxs(DialogRoot, { open: isOpen, onOpenChange: ({ open }) => setIsOpen(open), children: [_jsx(DialogTrigger, { asChild: true, children: _jsxs(Button, { variant: "ghost", size: "sm", children: [_jsx(FaExchangeAlt, {}), "Edit"] }) }), _jsxs(DialogContent, { ref: contentRef, children: [_jsxs("form", { onSubmit: handleSubmit(onSubmit), children: [_jsx(DialogHeader, { children: _jsx(DialogTitle, { children: "Edit" }) }), _jsx(DialogBody, { children: _jsx(VStack, { gap: 4, children: fields
                                        .filter(({ name }) => !hiddenFields?.includes(name))
                                        .map(({ name, label, required, type = "text" }) => {
                                        const value = record?.[name];
                                        const relatedFieldName = name + "_id";
                                        const selected = (type === "select") ? value : undefined;
                                        return (_jsx(Field, { required: required, invalid: !!errors[name], errorText: errors[name]?.message, label: label, children: type === "select" ? (_jsx(Controller, { name: name + "_id", control: control, defaultValue: selected?.id, render: ({ field }) => (_jsx(GenerikaSelect, { model_name: name, selected: selected, contentRef: contentRef, onChange: (val) => {
                                                        field.onChange(val[0]);
                                                    }, openAPI: openAPI })) })) : (_jsx(Input, { defaultValue: value, ...register(name, {
                                                    ...validationSchema?.[name],
                                                    required: validationSchema?.[name]?.required
                                                        ?? (required ? `${label} est requis` : false),
                                                }), type: type })) }, String(name)));
                                    }) }) }), _jsx(DialogFooter, { children: _jsxs(ButtonGroup, { children: [_jsx(DialogActionTrigger, { asChild: true, children: _jsx(Button, { variant: "subtle", disabled: isSubmitting, children: "Cancel" }) }), _jsx(Button, { type: "submit", loading: isSubmitting, children: "Save" })] }) })] }), _jsx(DialogCloseTrigger, {})] })] }));
}
