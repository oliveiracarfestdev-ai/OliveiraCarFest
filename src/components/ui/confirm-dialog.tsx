'use client'

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import React from 'react'

interface ConfirmDialogProps {
  title?: string
  description?: string
  onConfirm: () => void
  children: React.ReactNode
}

export function ConfirmDialog({
  title = 'Tem certeza?',
  description = 'Esta ação não pode ser desfeita.',
  onConfirm,
  children,
}: ConfirmDialogProps) {
  return (
    <AlertDialog>
      {/* Use render instead of asChild for base-ui */}
      <AlertDialogTrigger render={children as any} />
      <AlertDialogContent className="bg-card border border-border/50 font-sans">
        <AlertDialogHeader>
          <AlertDialogTitle className="font-heading uppercase text-foreground">{title}</AlertDialogTitle>
          <AlertDialogDescription className="text-muted-foreground">
            {description}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className="rounded-none border-border hover:bg-white/5 hover:text-foreground">Cancelar</AlertDialogCancel>
          <AlertDialogAction 
            onClick={onConfirm}
            className="bg-red-600 text-white hover:bg-red-700 rounded-none border-none clip-corner"
          >
            Confirmar
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
