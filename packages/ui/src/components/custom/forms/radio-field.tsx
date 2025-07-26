import type * as RadioPrimitive from "@radix-ui/react-radio-group";
import type {
  Control,
  FieldPath,
  FieldPathValue,
  FieldValues,
} from "react-hook-form";

import { FormControl, FormField, FormItem, FormMessage } from "../../ui/form";
import { RadioGroup } from "../../ui/radio-group";

type TProps<T extends FieldValues = FieldValues> = {
  control?: Control<T>;
  name: FieldPath<T>;
  defaultValue?: FieldPathValue<T, FieldPath<T>>;
  label?: string;
  labelClassName?: string;
  required?: boolean;
} & React.ComponentProps<typeof RadioPrimitive.Root>;

export const RadioField = <T extends FieldValues>({
  control,
  defaultValue,
  children,
  ...props
}: TProps<T>) => (
  <FormField
    defaultValue={defaultValue}
    control={control}
    name={props.name}
    render={({ field }) => (
      <FormItem>
        <FormControl>
          <div>
            <RadioGroup
              onValueChange={field.onChange}
              value={field.value}
              defaultValue={defaultValue}
              className="flex flex-wrap gap-x-5"
            >
              {children}
            </RadioGroup>
            <FormMessage className="mt-1 text-xs" />
          </div>
        </FormControl>
      </FormItem>
    )}
  />
);
