import type { ThemeProviderProps } from "next-themes";
export interface ColorModeProviderProps extends ThemeProviderProps {
}
export declare function ColorModeProvider(props: ColorModeProviderProps): any;
export type ColorMode = "light" | "dark";
export interface UseColorModeReturn {
    colorMode: ColorMode;
    setColorMode: (colorMode: ColorMode) => void;
    toggleColorMode: () => void;
}
export declare function useColorMode(): UseColorModeReturn;
export declare function useColorModeValue<T>(light: T, dark: T): T;
export declare function ColorModeIcon(): any;
export declare const ColorModeButton: any;
export declare const LightMode: any;
export declare const DarkMode: any;
