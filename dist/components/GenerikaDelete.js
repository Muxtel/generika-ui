import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { Button, DialogActionTrigger, Text } from '@chakra-ui/react';
import { useForm } from "react-hook-form";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { FiTrash2 } from "react-icons/fi";
import { DialogBody, DialogCloseTrigger, DialogContent, DialogFooter, DialogHeader, DialogRoot, DialogTitle, DialogTrigger, } from "./ui/dialog";
export const GenerikaDelete = ({ record, mutationDeleteFn, queryKey }) => {
    const [isOpen, setIsOpen] = useState(false);
    const queryClient = useQueryClient();
    const { handleSubmit, formState: { isSubmitting } } = useForm();
    const mutation = useMutation({
        mutationFn: mutationDeleteFn,
        onSuccess: () => {
            console.log("L'item a été supprimée avec succès");
        },
        onError: () => {
            console.log("Une erreur s'est produite pendant la suppression");
        },
        onSettled: () => {
            queryClient.invalidateQueries({ queryKey });
            setIsOpen(false);
        }
    });
    const onSubmit = async () => {
        mutation.mutate(record);
    };
    return (_jsxs(DialogRoot, { size: { base: "xs", md: "md" }, placement: "center", role: "alertdialog", open: isOpen, onOpenChange: ({ open }) => setIsOpen(open), children: [_jsx(DialogTrigger, { asChild: true, children: _jsxs(Button, { variant: "ghost", size: "sm", colorPalette: "red", children: [_jsx(FiTrash2, { fontSize: "16px" }), "Delete Item"] }) }), _jsx(DialogContent, { children: _jsxs("form", { onSubmit: handleSubmit(onSubmit), children: [_jsx(DialogCloseTrigger, {}), _jsx(DialogHeader, { children: _jsx(DialogTitle, { children: "Delete Item" }) }), _jsx(DialogBody, { children: _jsx(Text, { mb: 4, children: "This item will be permanently deleted. Are you sure? You will not be able to undo this action." }) }), _jsxs(DialogFooter, { gap: 2, children: [_jsx(DialogActionTrigger, { asChild: true, children: _jsx(Button, { variant: "subtle", colorPalette: "gray", disabled: isSubmitting, children: "Cancel" }) }), _jsx(Button, { variant: "solid", colorPalette: "red", type: "submit", loading: isSubmitting, children: "Delete" })] })] }) })] }));
};
