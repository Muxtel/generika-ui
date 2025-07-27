import { jsx as _jsx } from "react/jsx-runtime";
import { Skeleton as ChakraSkeleton, Circle, Stack } from "@chakra-ui/react";
import * as React from "react";
export const SkeletonCircle = React.forwardRef(function SkeletonCircle(props, ref) {
    const { size, ...rest } = props;
    return (_jsx(Circle, { size: size, asChild: true, ref: ref, children: _jsx(ChakraSkeleton, { ...rest }) }));
});
export const SkeletonText = React.forwardRef(function SkeletonText(props, ref) {
    const { noOfLines = 3, gap, ...rest } = props;
    return (_jsx(Stack, { gap: gap, width: "full", ref: ref, children: Array.from({ length: noOfLines }).map((_, index) => (_jsx(ChakraSkeleton, { height: "4", ...props, _last: { maxW: "80%" }, ...rest }, index))) }));
});
export const Skeleton = ChakraSkeleton;
