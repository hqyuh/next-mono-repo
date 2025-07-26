import type { FC, PropsWithChildren } from "react";

export type TOptional<T> = T | undefined;

export type FCC<P = object> = FC<PropsWithChildren<P>>;
