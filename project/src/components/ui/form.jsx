import { createContext, forwardRef, useContext, useId } from "react";
import { cn } from "@/lib/utils";
import { Label } from "@/components/ui/label";

const Form = ({ ...props }) => {
  return <form {...props} />;
};

const FormFieldContext = createContext({});

const FormField = ({ ...props }) => {
  return <FormFieldContext.Provider value={{ id: useId() }} {...props} />;
};

const useFormField = () => {
  const fieldContext = useContext(FormFieldContext);
  const itemContext = useContext(FormItemContext);
  const { id } = fieldContext;
  const { id: itemId } = itemContext;

  return {
    id: itemId || id,
    formItemId: `${id}-form-item`,
    formDescriptionId: `${id}-form-item-description`,
    formMessageId: `${id}-form-item-message`,
  };
};

const FormItemContext = createContext({});

const FormItem = forwardRef(({ className, ...props }, ref) => {
  const id = useId();
  return (
    <FormItemContext.Provider value={{ id }}>
      <div ref={ref} className={cn("space-y-2", className)} {...props} />
    </FormItemContext.Provider>
  );
});
FormItem.displayName = "FormItem";

const FormLabel = forwardRef(({ className, ...props }, ref) => {
  const { formItemId } = useFormField();
  return (
    <Label
      ref={ref}
      className={cn("", className)}
      htmlFor={formItemId}
      {...props}
    />
  );
});
FormLabel.displayName = "FormLabel";

const FormControl = forwardRef(({ ...props }, ref) => {
  const { id, formItemId, formDescriptionId, formMessageId } = useFormField();
  return (
    <div
      ref={ref}
      id={id}
      aria-describedby={`${formDescriptionId} ${formMessageId}`}
      aria-labelledby={formItemId}
      {...props}
    />
  );
});
FormControl.displayName = "FormControl";

const FormDescription = forwardRef(({ className, ...props }, ref) => {
  const { formDescriptionId } = useFormField();
  return (
    <p
      ref={ref}
      id={formDescriptionId}
      className={cn("text-sm text-muted-foreground", className)}
      {...props}
    />
  );
});
FormDescription.displayName = "FormDescription";

const FormMessage = forwardRef(({ className, children, ...props }, ref) => {
  const { formMessageId } = useFormField();
  return (
    <p
      ref={ref}
      id={formMessageId}
      className={cn("text-sm font-medium text-destructive", className)}
      {...props}
    >
      {children}
    </p>
  );
});
FormMessage.displayName = "FormMessage";

export {
  useFormField,
  Form,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
  FormField,
};