import type { FC, PropsWithChildren } from 'react';

export type TOptional<T> = T | undefined;

// eslint-disable-next-line @typescript-eslint/naming-convention
export type FCC<P = object> = FC<PropsWithChildren<P>>;
