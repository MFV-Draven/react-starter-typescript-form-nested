import { createContext, useContext } from 'react'
import type { FieldValues, UseFormReturn } from 'react-hook-form'

export type UseCustomFormReturn<TFieldValues extends FieldValues = FieldValues> = UseFormReturn<TFieldValues>


export type CustomFormProviderProps<TFieldValues extends FieldValues> = {
  children: React.ReactNode
} & UseCustomFormReturn<TFieldValues>


const HookFormContext = createContext<UseCustomFormReturn<any> | null>(null)

export function CustomFormProvider<TFieldValues extends FieldValues>({
  children,
  ...props
}: CustomFormProviderProps<TFieldValues>) {
  return <HookFormContext.Provider value={props as UseCustomFormReturn<any>}>{children}</HookFormContext.Provider>
}

export function useCustomFormContext<TFieldValues extends FieldValues = FieldValues>(): UseCustomFormReturn<TFieldValues> {
  return useContext(HookFormContext) as UseCustomFormReturn<TFieldValues>
}
