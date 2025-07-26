import type * as CheckboxPrimitive from "@radix-ui/react-checkbox";
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
import { Checkbox } from "../../ui/checkbox";
import { cn } from "@workspace/ui/lib/utils";
import { Show } from "../show";

type TProps<T extends FieldValues = FieldValues> = {
  control?: Control<T>;
  name: FieldPath<T>;
  defaultValue?: FieldPathValue<T, FieldPath<T>>;
  label?: string;
  labelClassName?: string;
  required?: boolean;
} & React.ComponentProps<typeof CheckboxPrimitive.Root>;

export const CheckboxField = <T extends FieldValues>({
  className,
  labelClassName,
  control,
  defaultValue,
  label,
  required,
  value,
  ...props
}: TProps<T>) => (
  <FormField
    defaultValue={defaultValue}
    control={control}
    name={props.name}
    render={({ field }) => (
      <FormItem>
        <FormControl>
          <div className="flex gap-2">
            <Checkbox
              checked={field.value?.includes(value)}
              onCheckedChange={(checked) =>
                checked
                  ? field.onChange([...field.value, value])
                  : field.onChange(
                      field.value?.filter(
                        (current: string) => current !== value
                      )
                    )
              }
              {...props}
              className={cn(
                "data-[state=checked]:bg-cl-1 h-5 w-5 rounded-md shadow-none outline-none transition-all duration-300 data-[state=checked]:border-none",
                className
              )}
            />
            <Show when={Boolean(label)}>
              <FormLabel className={labelClassName}>
                {label}
                {required && (
                  <span
                    className={cn("text-error-light", {
                      "text-gray-900": !props.disabled,
                    })}
                  >
                    *
                  </span>
                )}
              </FormLabel>
            </Show>
            <FormMessage className="mt-1 text-xs" />
          </div>
        </FormControl>
      </FormItem>
    )}
  />
);
