import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Container, Spinner, Text, Table } from '@chakra-ui/react';
import { renderSmartValue, formatLabel } from '../helpers/generikaTableUtils';
import { GenerikaActionsMenu } from "./GenerikaActions";
import { useQuery } from '@tanstack/react-query';
export function GenerikaTable({ getFn, mutationEditFn, mutationDeleteFn, hiddenFields = [], validationSchema, schema, queryKey, openAPI }) {
    const { data, isLoading, isError, error } = useQuery({
        queryKey,
        queryFn: getFn
    });
    if (isLoading) {
        return (_jsx(Container, { textAlign: "center", mt: "10", children: _jsx(Spinner, { size: "xl" }) }));
    }
    if (isError) {
        return (_jsx(Container, { textAlign: "center", mt: "10", color: "red.500", children: _jsxs(Text, { children: ["Erreur : ", error?.message ?? "Erreur inconnue"] }) }));
    }
    if (!data || data.length === 0)
        return _jsx("p", { children: "Aucune donn\u00E9e \u00E0 afficher." });
    // Agrège toutes les clés uniques présentes dans tous les objets du tableau
    const allKeys = Array.from(new Set(data
        .map((record) => Object.keys(record))
        .flat())
    // new Set(data.flatMap((record: Record<string, any>) => Object.keys(record) as (keyof TypeRecord)[]))
    ).filter((key) => !hiddenFields.includes(key));
    return (_jsx(Table.ScrollArea, { borderWidth: "1px", rounded: "md", height: "40em", children: _jsxs(Table.Root, { size: { base: "sm", md: "md" }, stickyHeader: true, children: [_jsx(Table.Header, { children: _jsxs(Table.Row, { css: {
                            top: 0,
                            zIndex: 10,
                            background: "gray.100",
                            whiteSpace: "nowrap",
                        }, children: [_jsx(Table.ColumnHeader, { children: "Actions" }), allKeys.map((key) => (_jsx(Table.ColumnHeader, { children: formatLabel(String(key)) }, String(key))))] }) }), _jsx(Table.Body, { children: data.map((record, rowIndex) => (_jsxs(Table.Row, { children: [_jsx(Table.Cell, { width: "10%", children: _jsx(GenerikaActionsMenu, { record: record, mutationEditFn: mutationEditFn, mutationDeleteFn: mutationDeleteFn, hiddenFields: hiddenFields, validationSchema: validationSchema, schema: schema, queryKey: queryKey, openAPI: openAPI }) }), allKeys.map((key, colIndex) => (_jsx(Table.Cell, { truncate: true, css: colIndex === 0
                                    ? {
                                        position: "sticky",
                                        left: 0,
                                        zIndex: 5,
                                        background: "#ffffff",
                                        whiteSpace: "nowrap",
                                        borderBottom: "2px solid",
                                        borderColor: "gray.200",
                                    }
                                    : {}, children: renderSmartValue(record[String(key)]) }, String(key))))] }, rowIndex))) })] }) }));
}
