import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Checkbox as ChakraCheckbox } from "@chakra-ui/react";
import * as React from "react";
export const Checkbox = React.forwardRef(function Checkbox(props, ref) {
    const { icon, children, inputProps, rootRef, ...rest } = props;
    return (_jsxs(ChakraCheckbox.Root, { ref: rootRef, ...rest, children: [_jsx(ChakraCheckbox.HiddenInput, { ref: ref, ...inputProps }), _jsx(ChakraCheckbox.Control, { colorPalette: "evoplanVert", _checked: { bg: 'vert2.400', border: 0 }, borderColor: "grisViolet.200", children: icon || _jsx(ChakraCheckbox.Indicator, {}) }), children != null && (_jsx(ChakraCheckbox.Label, { children: children }))] }));
});
