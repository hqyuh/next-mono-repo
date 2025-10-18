import type { ReactNode } from 'react';

import type { Control, FieldPath, FieldPathValue, FieldValues } from 'react-hook-form';

import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '../../ui/form';
import { Textarea } from '../../ui/textarea';
import { Show } from '../show';

interface IProps<T extends FieldValues = FieldValues> extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  control: Control<T>;
  name: FieldPath<T>;
  defaultValue?: FieldPathValue<T, FieldPath<T>>;
  label?: ReactNode;
  required?: boolean;
  labelClassName?: string;
}

export const TextAreaField = <T extends FieldValues>({
  defaultValue,
  labelClassName,
  control,
  label,
  required,
  ...props
}: IProps<T>) => (
  <FormField
    control={control}
    name={props.name}
    defaultValue={defaultValue}
    render={({ field }) => (
      <FormItem>
        <div className='flex w-full flex-col items-stretch justify-start gap-4'>
          <FormControl className='w-full'>
            <div>
              <Show when={Boolean(label)}>
                <FormLabel className={labelClassName}>
                  {label} {required && <span className='text-error-light'>*</span>}
                </FormLabel>
              </Show>
              <Textarea {...field} {...props} />
            </div>
          </FormControl>
          <FormMessage className='mt-1 text-xs' />
        </div>
      </FormItem>
    )}
  />
);
