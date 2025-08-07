import type { IconButtonProps, SpanProps } from "@chakra-ui/react";
import type { ThemeProviderProps } from "next-themes";
import * as React from "react";
export interface ColorModeProviderProps extends ThemeProviderProps {
}
export declare function ColorModeProvider(props: ColorModeProviderProps): import("react/jsx-runtime").JSX.Element;
export type ColorMode = "light" | "dark";
export interface UseColorModeReturn {
    colorMode: ColorMode;
    setColorMode: (colorMode: ColorMode) => void;
    toggleColorMode: () => void;
}
export declare function useColorMode(): UseColorModeReturn;
export declare function useColorModeValue<T>(light: T, dark: T): T;
export declare function ColorModeIcon(): import("react/jsx-runtime").JSX.Element;
interface ColorModeButtonProps extends Omit<IconButtonProps, "aria-label"> {
}
export declare const ColorModeButton: React.ForwardRefExoticComponent<ColorModeButtonProps & React.RefAttributes<HTMLButtonElement>>;
export declare const LightMode: React.ForwardRefExoticComponent<SpanProps & React.RefAttributes<HTMLSpanElement>>;
export declare const DarkMode: React.ForwardRefExoticComponent<SpanProps & React.RefAttributes<HTMLSpanElement>>;
export {};
