import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { IconButton } from '@chakra-ui/react';
import { MenuContent, MenuRoot, MenuTrigger } from "./ui/menu";
import { BsThreeDotsVertical } from "react-icons/bs";
import { GenerikaEdit } from "./GenerikaEdit";
import { GenerikaDelete } from "./GenerikaDelete";
export function GenerikaActionsMenu({ record, mutationEditFn, mutationDeleteFn, validationSchema, hiddenFields, schema, queryKey, openAPI }) {
    return (_jsxs(MenuRoot, { children: [_jsx(MenuTrigger, { asChild: true, children: _jsx(IconButton, { variant: "ghost", color: "inherit", children: _jsx(BsThreeDotsVertical, {}) }) }), _jsxs(MenuContent, { children: [_jsx(GenerikaEdit, { record: record, mutationEditFn: mutationEditFn, queryKey: queryKey, validationSchema: validationSchema, hiddenFields: hiddenFields, schema: schema, openAPI: openAPI }), _jsx(GenerikaDelete, { record: record, mutationDeleteFn: mutationDeleteFn, queryKey: queryKey })] })] }));
}
