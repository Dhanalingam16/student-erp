'use client';

import * as React from 'react';
import { AlertTriangle, Info, CheckCircle2 } from 'lucide-react';
import { Dialog } from './dialog';
import { Button } from './button';

export interface ConfirmationDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  description: string;
  confirmText?: string;
  cancelText?: string;
  variant?: 'danger' | 'warning' | 'primary';
  isLoading?: boolean;
}

export function ConfirmationDialog({
  isOpen,
  onClose,
  onConfirm,
  title,
  description,
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  variant = 'warning',
  isLoading = false,
}: ConfirmationDialogProps) {
  const iconMap = {
    danger: <AlertTriangle className="h-6 w-6 text-rose-600" />,
    warning: <AlertTriangle className="h-6 w-6 text-amber-600" />,
    primary: <Info className="h-6 w-6 text-navy-800" />,
  };

  const buttonVariant = variant === 'danger' ? 'danger' : 'primary';

  return (
    <Dialog isOpen={isOpen} onClose={onClose} title={title} maxWidth="md">
      <div className="flex gap-4 items-start">
        <div className="shrink-0 p-2 rounded-full bg-slate-100">{iconMap[variant]}</div>
        <div className="space-y-2">
          <p className="text-sm text-slate-600 leading-relaxed">{description}</p>
        </div>
      </div>

      <div className="mt-6 pt-4 border-t border-slate-200 flex items-center justify-end gap-3">
        <Button variant="outline" size="sm" onClick={onClose} disabled={isLoading}>
          {cancelText}
        </Button>
        <Button
          variant={buttonVariant}
          size="sm"
          onClick={() => {
            onConfirm();
          }}
          isLoading={isLoading}
        >
          {confirmText}
        </Button>
      </div>
    </Dialog>
  );
}
