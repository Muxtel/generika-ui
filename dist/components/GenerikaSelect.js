import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Select, Portal, createListCollection } from '@chakra-ui/react';
import { useGetGenerikaItems } from "../hooks/useGenerika";
export const GenerikaSelect = ({ model_name, selected, onChange, contentRef, openAPI }) => {
    const items = useGetGenerikaItems(model_name, openAPI);
    const selectItems = items.map((item) => ({
        value: String(item?.id ?? ''),
        label: item?.name ?? '???',
    }));
    const collection = createListCollection({ items: selectItems });
    return (_jsxs(Select.Root, { collection: collection, defaultValue: selected?.id ? [String(selected.id)] : [], onValueChange: (e) => { onChange(e.value); }, children: [_jsx(Select.HiddenSelect, {}), _jsxs(Select.Control, { children: [_jsx(Select.Trigger, { children: _jsx(Select.ValueText, { placeholder: "-" }) }), _jsxs(Select.IndicatorGroup, { children: [_jsx(Select.ClearTrigger, {}), _jsx(Select.Indicator, {})] })] }), _jsx(Portal, { container: contentRef, children: _jsx(Select.Positioner, { children: _jsx(Select.Content, { children: collection.items.map((item) => (_jsxs(Select.Item, { item: item.value, children: [item.label, _jsx(Select.ItemIndicator, {})] }, item.value))) }) }) })] }));
};
