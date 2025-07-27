import type { GroupProps, InputProps } from "@chakra-ui/react";
export interface PasswordVisibilityProps {
    defaultVisible?: boolean;
    visible?: boolean;
    onVisibleChange?: (visible: boolean) => void;
    visibilityIcon?: {
        on: React.ReactNode;
        off: React.ReactNode;
    };
}
export interface PasswordInputProps extends InputProps, PasswordVisibilityProps {
    rootProps?: GroupProps;
    startElement?: React.ReactNode;
    type: string;
    errors: any;
}
export declare const PasswordInput: any;
export declare const PasswordStrengthMeter: any;
