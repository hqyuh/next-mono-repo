import { cn } from '@workspace/ui/lib/utils';
import type { Control, FieldPath, FieldPathValue, FieldValues } from 'react-hook-form';

import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '../../ui/form';
import { Input } from '../../ui/input';
import { Show } from '../show';

type TProps<T extends FieldValues = FieldValues> = {
  control?: Control<T>;
  name: FieldPath<T>;
  defaultValue?: FieldPathValue<T, FieldPath<T>>;
  label?: string;
  labelClassName?: string;
  required?: boolean;
} & React.InputHTMLAttributes<HTMLInputElement>;

export const InputField = <T extends FieldValues>({
  className,
  labelClassName,
  control,
  defaultValue,
  label,
  required,
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
            <Show when={Boolean(label)}>
              <FormLabel className={labelClassName}>
                {label} {required && <span className='text-error-light'>*</span>}
              </FormLabel>
            </Show>
            <Input {...field} {...props} className={cn('mt-2 w-full', className)} />
            <FormMessage className='mt-1 text-xs' />
          </div>
        </FormControl>
      </FormItem>
    )}
  />
);
