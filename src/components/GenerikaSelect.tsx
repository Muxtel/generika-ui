import React from "react";
import { Select, Portal, createListCollection} from '@chakra-ui/react';
import {useGetGenerikaItems} from "../hooks/useGenerika";
import { useEffect } from "react"

type GenerikaSelectProps = {
    model_name: string,
    selected?: {name?: string, id?:number},
    onChange: (val: string[]) => void,
    contentRef?: React.RefObject<HTMLDivElement | null>,
    openAPI : any
}
type SelectItem = {
    value: string,
    label: string
};

export const GenerikaSelect: React.FC<GenerikaSelectProps> = ({model_name, selected, onChange, contentRef, openAPI}) => {
    
    const items = useGetGenerikaItems(model_name, openAPI);
    
    const selectItems: SelectItem[] = items.map((item: any) => ({
        value: String(item?.id ?? ''),
        label: item?.name ?? '???',
      }));

    const collection = createListCollection<SelectItem>({ items: selectItems });

    return (
        <Select.Root 
            collection={collection} 
            defaultValue={selected?.id ? [String(selected.id)] : []} 
            onValueChange={(e) => {onChange(e.value)}}
        >
        <Select.HiddenSelect />
        <Select.Control>
            <Select.Trigger>
                <Select.ValueText placeholder="-" />
            </Select.Trigger>
            <Select.IndicatorGroup>
                <Select.ClearTrigger />
                <Select.Indicator />
            </Select.IndicatorGroup>
        </Select.Control>
        <Portal container={contentRef}>
            <Select.Positioner>
            <Select.Content>
                {collection.items.map((item) => (
                    <Select.Item item={item.value} key={item.value}>
                        {item.label}
                        <Select.ItemIndicator />
                    </Select.Item>
                ))}
            </Select.Content>
            </Select.Positioner>
        </Portal>
        </Select.Root>
    );
};
