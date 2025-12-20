// components/ui/toaster.jsx
import { useToast } from '../../hooks/use-toast';
import { cn } from '../../lib/utils';
import { X } from 'lucide-react';
import { useEffect, useState } from 'react';

export function Toaster() {
  const { toasts } = useToast();

  return (
    <div className="fixed top-0 z-[100] flex max-h-screen w-full flex-col-reverse p-4 sm:bottom-0 sm:right-0 sm:top-auto sm:flex-col md:max-w-[420px]">
      {toasts.map(function ({ id, title, description, action, ...props }) {
        return (
          <Toast key={id} {...props}>
            <div className="grid gap-1">
              {title && <ToastTitle>{title}</ToastTitle>}
              {description && (
                <ToastDescription>{description}</ToastDescription>
              )}
            </div>
            {action}
            <ToastClose />
          </Toast>
        );
      })}
    </div>
  );
}

const Toast = ({ className, variant = 'default', open = true, onOpenChange, ...props }) => {
  const [isVisible, setIsVisible] = useState(open);

  useEffect(() => {
    setIsVisible(open);
  }, [open]);

  useEffect(() => {
    if (!isVisible && onOpenChange) {
      const timer = setTimeout(() => onOpenChange(false), 100);
      return () => clearTimeout(timer);
    }
  }, [isVisible, onOpenChange]);

  if (!isVisible) return null;

  const variants = {
    default: 'border bg-background text-foreground',
    destructive: 'destructive group border-destructive bg-destructive text-destructive-foreground',
  };

  return (
    <div
      className={cn(
        'group pointer-events-auto relative flex w-full items-center justify-between space-x-4 overflow-hidden rounded-md border p-6 pr-8 shadow-lg transition-all',
        variants[variant],
        className
      )}
      {...props}
    />
  );
};

const ToastTitle = ({ className, ...props }) => {
  return (
    <div
      className={cn('text-sm font-semibold', className)}
      {...props}
    />
  );
};

const ToastDescription = ({ className, ...props }) => {
  return (
    <div
      className={cn('text-sm opacity-90', className)}
      {...props}
    />
  );
};

const ToastClose = ({ className, ...props }) => {
  return (
    <button
      className={cn(
        'absolute right-2 top-2 rounded-md p-1 text-foreground/50 opacity-0 transition-opacity hover:text-foreground focus:opacity-100 focus:outline-none focus:ring-2 group-hover:opacity-100',
        className
      )}
      {...props}
    >
      <X className="h-4 w-4" />
    </button>
  );
};

export { Toast, ToastTitle, ToastDescription, ToastClose };