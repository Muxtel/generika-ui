import React from "react";
type GenerikaSelectProps = {
    model_name: string;
    selected?: {
        name?: string;
        id?: number;
    };
    onChange: (val: string[]) => void;
    contentRef?: React.RefObject<HTMLDivElement | null>;
    openAPI: any;
};
export declare const GenerikaSelect: React.FC<GenerikaSelectProps>;
export {};
