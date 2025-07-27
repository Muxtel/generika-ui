import { RadioGroup as ChakraRadioGroup } from "@chakra-ui/react";
import * as React from "react";
export interface RadioProps extends ChakraRadioGroup.ItemProps {
    rootRef?: React.Ref<HTMLDivElement>;
    inputProps?: React.InputHTMLAttributes<HTMLInputElement>;
}
export declare const Radio: any;
export declare const RadioGroup: any;
