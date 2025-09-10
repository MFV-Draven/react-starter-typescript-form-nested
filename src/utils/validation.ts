import * as Yup from 'yup'
import { Department, Category, FormData } from '../types/form'

// Department validation schema
const departmentSchema: Yup.ObjectSchema<Department> = Yup.object({
  name: Yup.string().required('Department name is required'),
  type: Yup.string().required('Department type is required').test('duplicate-name', 'Invalid department name duplicate', function (name, _context) {
    const context = _context.options?.context
    const isDuplicate = context?.isDuplicate(this.path, name, { message: 'Invalid department name duplicate', type: 'duplicate-name' })
    return !isDuplicate
  }),
}).required()

// Category validation schema with custom validation for duplicate types
const categorySchema: Yup.ObjectSchema<Category> = Yup.object({
  name: Yup.string().required('Category name is required').test('duplicate-name', 'Invalid category name duplicate', function (name, _context) {
    const context = _context.options?.context
    const isDuplicate = context?.isDuplicate(this.path, name, { message: 'Invalid category name duplicate', type: 'duplicate-name' })
    return !isDuplicate
  }),
  descriptions: Yup.string().required('Category description is required'),
  departments: Yup.array()
    .of(departmentSchema)
    .min(1, 'At least one department is required')
    .required()
}).required()

// Main form validation schema
export const formValidationSchema: Yup.ObjectSchema<FormData> = Yup.object({
  categories: Yup.array()
    .of(categorySchema)
    .min(1, 'At least one category is required')
    .required()
}).required()

// Validation schema type
export type FormValidationSchema = Yup.InferType<typeof formValidationSchema>

