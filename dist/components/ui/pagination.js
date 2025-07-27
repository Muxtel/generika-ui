"use client";
import { jsx as _jsx } from "react/jsx-runtime";
import { Button, Pagination as ChakraPagination, IconButton, Text, createContext, usePaginationContext, } from "@chakra-ui/react";
import * as React from "react";
import { HiChevronLeft, HiChevronRight, HiMiniEllipsisHorizontal, } from "react-icons/hi2";
import { LinkButton } from "./link-button";
const [RootPropsProvider, useRootProps] = createContext({
    name: "RootPropsProvider",
});
const variantMap = {
    outline: { default: "ghost", ellipsis: "plain", current: "outline" },
    solid: { default: "outline", ellipsis: "outline", current: "solid" },
    subtle: { default: "ghost", ellipsis: "plain", current: "subtle" },
};
export const PaginationRoot = React.forwardRef(function PaginationRoot(props, ref) {
    const { size = "sm", variant = "outline", getHref, ...rest } = props;
    return (_jsx(RootPropsProvider, { value: { size, variantMap: variantMap[variant], getHref }, children: _jsx(ChakraPagination.Root, { ref: ref, type: getHref ? "link" : "button", ...rest }) }));
});
export const PaginationEllipsis = React.forwardRef(function PaginationEllipsis(props, ref) {
    const { size, variantMap } = useRootProps();
    return (_jsx(ChakraPagination.Ellipsis, { ref: ref, ...props, asChild: true, children: _jsx(Button, { as: "span", variant: variantMap.ellipsis, size: size, children: _jsx(HiMiniEllipsisHorizontal, {}) }) }));
});
export const PaginationItem = React.forwardRef(function PaginationItem(props, ref) {
    const { page } = usePaginationContext();
    const { size, variantMap, getHref } = useRootProps();
    const current = page === props.value;
    const variant = current ? variantMap.current : variantMap.default;
    if (getHref) {
        return (_jsx(LinkButton, { href: getHref(props.value), variant: variant, size: size, children: props.value }));
    }
    return (_jsx(ChakraPagination.Item, { ref: ref, ...props, asChild: true, children: _jsx(Button, { variant: variant, size: size, children: props.value }) }));
});
export const PaginationPrevTrigger = React.forwardRef(function PaginationPrevTrigger(props, ref) {
    const { size, variantMap, getHref } = useRootProps();
    const { previousPage } = usePaginationContext();
    if (getHref) {
        return (_jsx(LinkButton, { href: previousPage != null ? getHref(previousPage) : undefined, variant: variantMap.default, size: size, children: _jsx(HiChevronLeft, {}) }));
    }
    return (_jsx(ChakraPagination.PrevTrigger, { ref: ref, asChild: true, ...props, children: _jsx(IconButton, { variant: variantMap.default, size: size, children: _jsx(HiChevronLeft, {}) }) }));
});
export const PaginationNextTrigger = React.forwardRef(function PaginationNextTrigger(props, ref) {
    const { size, variantMap, getHref } = useRootProps();
    const { nextPage } = usePaginationContext();
    if (getHref) {
        return (_jsx(LinkButton, { href: nextPage != null ? getHref(nextPage) : undefined, variant: variantMap.default, size: size, children: _jsx(HiChevronRight, {}) }));
    }
    return (_jsx(ChakraPagination.NextTrigger, { ref: ref, asChild: true, ...props, children: _jsx(IconButton, { variant: variantMap.default, size: size, children: _jsx(HiChevronRight, {}) }) }));
});
export const PaginationItems = (props) => {
    return (_jsx(ChakraPagination.Context, { children: ({ pages }) => pages.map((page, index) => {
            return page.type === "ellipsis" ? (_jsx(PaginationEllipsis, { index: index, ...props }, index)) : (_jsx(PaginationItem, { type: "page", value: page.value, ...props }, index));
        }) }));
};
export const PaginationPageText = React.forwardRef(function PaginationPageText(props, ref) {
    const { format = "compact", ...rest } = props;
    const { page, totalPages, pageRange, count } = usePaginationContext();
    const content = React.useMemo(() => {
        if (format === "short")
            return `${page} / ${totalPages}`;
        if (format === "compact")
            return `${page} of ${totalPages}`;
        return `${pageRange.start + 1} - ${Math.min(pageRange.end, count)} of ${count}`;
    }, [format, page, totalPages, pageRange, count]);
    return (_jsx(Text, { fontWeight: "medium", ref: ref, ...rest, children: content }));
});
