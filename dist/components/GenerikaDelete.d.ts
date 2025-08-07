import { QueryKey } from "@tanstack/react-query";
type GenerikaDeleteProps<T> = {
    record: T;
    mutationDeleteFn: (record: T) => Promise<any>;
    queryKey?: QueryKey;
};
export declare const GenerikaDelete: <T extends Record<string, any>>({ record, mutationDeleteFn, queryKey }: GenerikaDeleteProps<T>) => import("react/jsx-runtime").JSX.Element;
export {};
