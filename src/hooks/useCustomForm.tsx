import { UseCustomFormReturn } from "@/components/CustomFormProvider"
import { FieldValues, Path, UseFormProps, useForm } from "react-hook-form"

export function useCustomForm<TFieldValues extends FieldValues = FieldValues, TContext = any>(
    props: UseFormProps<TFieldValues, TContext>,
  ): UseCustomFormReturn<TFieldValues> {
  
  const formControl = useForm({...props, context: {...props.context, isDuplicate} as TContext})

  /**
   * Helper to check if the value is duplicate
   * @param path - The path to check
   * @param value - The value to check
   * @param error - The error to set
   * @returns True if the value is duplicate, false otherwise
   */
  function isDuplicate(path: string, value: any, error: { message: string, type: string }): boolean {
    if (!path || !value?.trim()) return false

    const values = formControl.getValues()
    // Convert path like "categories[0].name" to regex pattern "categories\[\d+\]\.name"
    const pathPattern = path
      .replace(/\[\d+\]/g, '\\[\\d+\\]')  // [0] -> \[\d+\]
      .replace(/\./g, '\\.')              // . -> \.
    const pathRegex = new RegExp(`^${pathPattern}$`)
    
    // Get all form field paths and check for matches exclude path example: [{path: 'categories[0].name', value: 'value1'}, {path: 'categories[1].name', value: 'value2'}]
    const allPathsValues = getAllFieldPathsValues(values)
    const matchingPathsValues = allPathsValues.filter(p => pathRegex.test(p.path))
    const isDuplicate = matchingPathsValues.some(p => p.value === value && p.path !== path)

    if (isDuplicate) {
        formControl.setError(path as Path<TFieldValues>, { message: error.message, type: error.type })
      } else {
        formControl.clearErrors(path as Path<TFieldValues>)
    }

    return isDuplicate
  }

  /**
   * Helper to get all nested field paths recursively example: [{path: 'categories[0].name', value: 'value1'}, {path: 'categories[1].name', value: 'value2'}]
   * @param obj - The object to get the paths from
   * @param prefix - The prefix to add to the path
   * @param visited - The visited objects to avoid infinite recursion
   * @returns An array of objects with the path and value
   */
  function getAllFieldPathsValues(obj: any, prefix = '', visited = new WeakSet()): {path: string, value: any}[] {
    const paths: {path: string, value: any}[] = []
    
    // Prevent infinite recursion with circular references
    if (obj && typeof obj === 'object' && visited.has(obj)) {
      return paths
    }
    
    if (obj && typeof obj === 'object') {
      visited.add(obj)
    }
    
    if (Array.isArray(obj)) {
      // Handle arrays
      obj.forEach((item, index) => {
        const currentPath = prefix ? `${prefix}[${index}]` : `[${index}]`
        
        if (item && typeof item === 'object') {
          // Recursively get paths from nested objects/arrays
          const nestedPaths = getAllFieldPathsValues(item, currentPath, visited)
          paths.push(...nestedPaths)
          
          // Also add the current path if it's an object (for intermediate paths)
          if (nestedPaths.length === 0) {
            paths.push({path: currentPath, value: item})
          }
        } else {
          // Primitive value - add the path
          paths.push({path: currentPath, value: item})
        }
      })
    } else if (obj && typeof obj === 'object') {
      // Handle objects
      Object.keys(obj).forEach(key => {
        const currentPath = prefix ? `${prefix}.${key}` : key
        const value = obj[key]
        
        if (value && typeof value === 'object') {
          // Recursively get paths from nested objects/arrays
          const nestedPaths = getAllFieldPathsValues(value, currentPath, visited)
          paths.push(...nestedPaths)
          
          // Also add the current path if it's an object with no nested paths
          if (nestedPaths.length === 0) {
            paths.push({path: currentPath, value: value})
          }
        } else {
          // Primitive value - add the path
          paths.push({path: currentPath, value: value})
        }
      })
    } else if (prefix) {
      // Primitive value at root level with prefix
      paths.push({path: prefix, value: obj})
    }
    
    return paths
  }

  return formControl
  }
  