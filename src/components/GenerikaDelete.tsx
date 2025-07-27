import { useState } from "react";
import { Button, DialogActionTrigger, Text } from '@chakra-ui/react';
import { useForm } from "react-hook-form";
import { useQueryClient, useMutation, QueryKey } from "@tanstack/react-query";
import { FiTrash2 } from "react-icons/fi";
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


type GenerikaDeleteProps<T> = {
    record: T,
    mutationDeleteFn: (record: T) => Promise<any>,
    queryKey?: QueryKey,
}
export const GenerikaDelete  = <T extends Record<string, any>> ({record, mutationDeleteFn, queryKey} : GenerikaDeleteProps<T>) => {
    const [isOpen, setIsOpen] = useState(false)
    
    const queryClient = useQueryClient()
    const { handleSubmit, formState: { isSubmitting }} = useForm()

    const mutation = useMutation({
        mutationFn: mutationDeleteFn,
        onSuccess: () => {
            console.log("L'item a été supprimée avec succès")
        },
        onError: () => {
            console.log("Une erreur s'est produite pendant la suppression")
        },
        onSettled: () => {
            queryClient.invalidateQueries({queryKey})
            setIsOpen(false)
        }
    })
    const onSubmit = async () => {
        mutation.mutate(record)
    }

    return (
        <DialogRoot
            size={{ base: "xs", md: "md" }}
            placement="center"
            role="alertdialog"
            open={isOpen}
            onOpenChange={({ open }) => setIsOpen(open)}
        >
            <DialogTrigger asChild>
            <Button variant="ghost" size="sm" colorPalette="red">
                <FiTrash2 fontSize="16px" />
                Delete Item
            </Button>
            </DialogTrigger>

            <DialogContent>
            <form onSubmit={handleSubmit(onSubmit)}>
                <DialogCloseTrigger />
                <DialogHeader>
                <DialogTitle>Delete Item</DialogTitle>
                </DialogHeader>
                <DialogBody>
                <Text mb={4}>
                    This item will be permanently deleted. Are you sure? You will not
                    be able to undo this action.
                </Text>
                </DialogBody>

                <DialogFooter gap={2}>
                <DialogActionTrigger asChild>
                    <Button
                    variant="subtle"
                    colorPalette="gray"
                    disabled={isSubmitting}
                    >
                    Cancel
                    </Button>
                </DialogActionTrigger>
                <Button
                    variant="solid"
                    colorPalette="red"
                    type="submit"
                    loading={isSubmitting}
                >
                    Delete
                </Button>
                </DialogFooter>
            </form>
            </DialogContent>
        </DialogRoot>
    )
}