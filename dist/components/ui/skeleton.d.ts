import type { SkeletonProps as ChakraSkeletonProps, CircleProps } from "@chakra-ui/react";
export interface SkeletonCircleProps extends ChakraSkeletonProps {
    size?: CircleProps["size"];
}
export declare const SkeletonCircle: any;
export interface SkeletonTextProps extends ChakraSkeletonProps {
    noOfLines?: number;
}
export declare const SkeletonText: any;
export declare const Skeleton: any;
