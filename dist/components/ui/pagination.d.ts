import type { ButtonProps } from "@chakra-ui/react";
import { Pagination as ChakraPagination } from "@chakra-ui/react";
import * as React from "react";
type PaginationVariant = "outline" | "solid" | "subtle";
export interface PaginationRootProps extends Omit<ChakraPagination.RootProps, "type"> {
    size?: ButtonProps["size"];
    variant?: PaginationVariant;
    getHref?: (page: number) => string;
}
export declare const PaginationRoot: any;
export declare const PaginationEllipsis: any;
export declare const PaginationItem: any;
export declare const PaginationPrevTrigger: any;
export declare const PaginationNextTrigger: any;
export declare const PaginationItems: (props: React.HTMLAttributes<HTMLElement>) => any;
export declare const PaginationPageText: any;
export {};
