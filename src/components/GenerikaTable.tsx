import { Container, Spinner, Text, Table} from '@chakra-ui/react';
import { RegisterOptions } from "react-hook-form";
import { request as __request } from '@/client/core/request';
import {renderSmartValue, formatLabel} from '../helpers/generikaTableUtils';
import { GenerikaActionsMenu } from "./GenerikaActions";
import { QueryKey, useQuery } from '@tanstack/react-query';

export type ValidationSchema<T> = {
  [K in keyof T]?: RegisterOptions
}
export type FieldType = "text" | "number" | "select" | "uuid";
export type FieldDef = {
    name: string,
    label: string,
    required: boolean,
    type: FieldType
  };

/////////////////
// GENERIKA TABLE
////////////////
type GenerikaTableProps<T> = {
    getFn: () => Promise<any>,
    mutationEditFn: (data: T) => Promise<any>,
    mutationDeleteFn: (data: T) => Promise<any>,
    hiddenFields?: (keyof T)[],
    validationSchema: ValidationSchema<T>,
    schema: any,
    queryKey: QueryKey,
    openAPI : any
}

export function GenerikaTable<TypeRecord extends Record<string, any>>({
        getFn,
        mutationEditFn,
        mutationDeleteFn,
        hiddenFields = [],
        validationSchema,
        schema,
        queryKey,
        openAPI
    }: GenerikaTableProps<TypeRecord>) {


        const {data, isLoading, isError, error} = useQuery({
            queryKey,
            queryFn: getFn
        }) 


        if (isLoading) {
            return (
                <Container textAlign="center" mt="10">
                <Spinner size="xl" />
                </Container>
            );
        }

        if (isError) {
            return (
                <Container textAlign="center" mt="10" color="red.500">
                <Text>Erreur : {(error as Error)?.message ?? "Erreur inconnue"}</Text>
                </Container>
            );
        }
        if (!data || data.length === 0) return <p>Aucune donnée à afficher.</p>;
        // Agrège toutes les clés uniques présentes dans tous les objets du tableau
        const allKeys = Array.from(
            new Set(
                data
                  .map((record: TypeRecord) => Object.keys(record) as (keyof TypeRecord)[])
                  .flat()
              )
            // new Set(data.flatMap((record: Record<string, any>) => Object.keys(record) as (keyof TypeRecord)[]))
        ).filter((key): key is keyof TypeRecord => !hiddenFields.includes(key as keyof TypeRecord));

        return (
            <Table.ScrollArea borderWidth="1px" rounded="md" height="40em">
                <Table.Root  size={{ base: "sm", md: "md" }} stickyHeader>
                    <Table.Header>
                        <Table.Row css={{
                            top: 0,
                            zIndex: 10,
                            background: "gray.100",
                            whiteSpace: "nowrap",
                        }}>
                            <Table.ColumnHeader>
                                Actions
                            </Table.ColumnHeader>
                            {allKeys.map((key) => (
                                <Table.ColumnHeader key={String(key)}>
                                    {formatLabel(String(key))}
                                </Table.ColumnHeader>
                            ))}
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>
                    {data.map((record: TypeRecord, rowIndex: number) => (
                        <Table.Row key={rowIndex}>
                            <Table.Cell width="10%">
                                <GenerikaActionsMenu 
                                    record={record}
                                    mutationEditFn={mutationEditFn}
                                    mutationDeleteFn={mutationDeleteFn}
                                    hiddenFields={hiddenFields}  
                                    validationSchema = {validationSchema}
                                    schema = {schema}
                                    queryKey = {queryKey} 
                                    openAPI = {openAPI} 
                                />
                            </Table.Cell>
                            {allKeys.map((key, colIndex) => (
                                <Table.Cell key={String(key)} truncate css={
                                    colIndex === 0
                                    ? {
                                            position: "sticky",
                                            left: 0,
                                            zIndex: 5,
                                            background: "#ffffff",
                                            whiteSpace: "nowrap",
                                            borderBottom: "2px solid",
                                            borderColor: "gray.200",
                                        }
                                    : {}
                                }>
                                    {renderSmartValue(record[String(key)])}
                                </Table.Cell>
                            ))}
                        </Table.Row>
                    ))}
                    </Table.Body>
                </Table.Root>
            </Table.ScrollArea>
        );
}