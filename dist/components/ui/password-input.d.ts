import type { GroupProps, InputProps, StackProps } from "@chakra-ui/react";
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
export declare const PasswordInput: import("react").ForwardRefExoticComponent<PasswordInputProps & import("react").RefAttributes<HTMLInputElement>>;
interface PasswordStrengthMeterProps extends StackProps {
    max?: number;
    value: number;
}
export declare const PasswordStrengthMeter: import("react").ForwardRefExoticComponent<PasswordStrengthMeterProps & import("react").RefAttributes<HTMLDivElement>>;
export {};
