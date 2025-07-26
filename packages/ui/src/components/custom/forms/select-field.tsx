import React, { type ReactNode } from "react";

import type {
  Control,
  FieldPath,
  FieldPathValue,
  FieldValues,
} from "react-hook-form";

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../ui/select";
import { cn } from "@workspace/ui/lib/utils";
import { Show } from "../show";

export interface IData {
  label: string;
  value: string;
  image?: string;
}

export interface IProps<T extends FieldValues = FieldValues>
  extends React.SelectHTMLAttributes<HTMLSelectElement> {
  control: Control<T>;
  name: FieldPath<T>;
  defaultValue?: FieldPathValue<T, FieldPath<T>>;
  label?: ReactNode;
  placeholder?: string;
  required?: boolean;
  fullWidth?: boolean;
  labelClassName?: string;
  data: IData[];
}

const SelectField = <T extends FieldValues>({
  name,
  defaultValue,
  control,
  label,
  required,
  data,
  fullWidth,
  className,
  labelClassName,
  placeholder = "Please select",
  ...props
}: IProps<T>) => (
  <FormField
    defaultValue={defaultValue}
    control={control}
    name={name}
    render={({ field }) => (
      <div className={cn("relative", fullWidth ? "w-full" : "")}>
        <FormItem>
          <Select
            onValueChange={field.onChange}
            value={field.value}
            disabled={props.disabled}
          >
            <FormControl>
              <div>
                <Show when={Boolean(label)}>
                  <FormLabel className={labelClassName}>
                    {label}{" "}
                    {required && <span className="text-error-light">*</span>}
                  </FormLabel>
                </Show>
                <SelectTrigger
                  className={cn(className, { "mt-2 w-full": fullWidth })}
                >
                  <SelectValue placeholder={placeholder} />
                </SelectTrigger>
              </div>
            </FormControl>

            <SelectContent>
              {data.map((x) => (
                <SelectItem key={x.value} value={x.value}>
                  {x.image ? (
                    <div className="flex items-center">
                      {x.image && (
                        <img
                          src={x.image!}
                          alt=""
                          width={20}
                          height={20}
                          className="h-5 w-5"
                        />
                      )}
                      <p className="pl-2">{x.label}</p>
                    </div>
                  ) : (
                    x.label
                  )}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <FormMessage className="text-xs" />
        </FormItem>
      </div>
    )}
  />
);

export { SelectField };
