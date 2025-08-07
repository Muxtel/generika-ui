"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { ChakraProvider } from "@chakra-ui/react";
import { system } from "../../theme";
import { ColorModeProvider } from "./color-mode";
import { Toaster } from "./toaster";
export function CustomProvider(props) {
    return (_jsxs(ChakraProvider, { value: system, children: [_jsx(ColorModeProvider, { defaultTheme: "light", children: props.children }), _jsx(Toaster, {})] }));
}
