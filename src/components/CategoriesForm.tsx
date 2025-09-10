'use client'

import React from 'react'
import {
  Form,
  Input,
  Button,
  Card,
  Space,
  Typography,
  Row,
  Col,
  Divider,
  message,
  Collapse,
} from 'antd'
import { useFieldArray, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { PlusOutlined, DeleteOutlined, UserOutlined, SettingOutlined } from '@ant-design/icons'
import { CategoriesFormData } from '../types/form'
import { formValidationSchema } from '../utils/validation'
import { CustomFormProvider } from './CustomFormProvider'
import { useCustomForm } from '@/hooks/useCustomForm'

const { Title, Text } = Typography
const { Panel } = Collapse

// Default values for new category and department
const defaultCategory = {
  name: '',
  descriptions: '',
  departments: [
    {
      name: '',
      type: '',
    },
  ],
}

const defaultDepartment = {
  name: '',
  type: '',
}

const CategoriesForm: React.FC = () => {
  const methods = useCustomForm<CategoriesFormData>({
    resolver: yupResolver(formValidationSchema),
    defaultValues: {
      categories: [defaultCategory],
    },
    mode: 'all',
  })

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
    watch,
  } = methods

  const {
    fields: categoryFields,
    append: appendCategory,
    remove: removeCategory,
  } = useFieldArray({
    control,
    name: 'categories',
  })

  // Watch all values for real-time validation
  const watchedValues = watch()

  const onSubmit = async (data: CategoriesFormData) => {
    try {
      console.log('Form Data:', JSON.stringify(data, null, 2))
      message.success('Form submitted successfully!')
    } catch (error) {
      message.error('Failed to submit form')
    }
  }

  return (
    <CustomFormProvider<CategoriesFormData> {...methods}>
    <Form layout="vertical" onFinish={handleSubmit(onSubmit)}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <Title level={2} style={{ marginBottom: '2rem', textAlign: 'center' }}>
          Categories Management
        </Title>

        {categoryFields.map((categoryField, categoryIndex) => (
          <Card
            key={categoryField.id}
            title={
              <Space>
                <UserOutlined />
                <Text strong>Category {categoryIndex + 1}</Text>
              </Space>
            }
            extra={
              categoryFields.length > 1 && (
                <Button
                  type="text"
                  danger
                  icon={<DeleteOutlined />}
                  onClick={() => removeCategory(categoryIndex)}
                  size="small"
                >
                  Remove Category
                </Button>
              )
            }
            style={{ marginBottom: '24px' }}
          >
            <Row gutter={16}>
              <Col span={12}>
                <Controller
                  name={`categories.${categoryIndex}.name`}
                  control={control}
                  render={({ field, fieldState }) => (
                    <Form.Item
                      label="Category Name"
                      validateStatus={fieldState.error ? 'error' : ''}
                      help={fieldState.error?.message}
                      required
                    >
                      <Input {...field} placeholder="Enter category name" />
                    </Form.Item>
                  )}
                />
              </Col>
              <Col span={12}>
                <Form.Item
                  label="Category Description"
                  validateStatus={errors.categories?.[categoryIndex]?.descriptions ? 'error' : ''}
                  help={errors.categories?.[categoryIndex]?.descriptions?.message}
                  required
                >
                  <Controller
                    name={`categories.${categoryIndex}.descriptions`}
                    control={control}
                    render={({ field }) => (
                      <Input
                        {...field}
                        placeholder="Enter category description"
                      />
                    )}
                  />
                </Form.Item>
              </Col>
            </Row>

            <Divider orientation="left">
              <Space>
                <SettingOutlined />
                <Text strong>Departments</Text>
              </Space>
            </Divider>

            <DepartmentFields
              categoryIndex={categoryIndex}
              control={control}
              errors={errors}
            />
          </Card>
        ))}

        <Space direction="vertical" style={{ width: '100%' }}>
          <Button
            type="dashed"
            onClick={() => appendCategory(defaultCategory)}
            block
            icon={<PlusOutlined />}
            size="large"
          >
            Add Category
          </Button>

          <Button type="primary" htmlType="submit" loading={isSubmitting} size="large" block>
            Submit Form
          </Button>
        </Space>

        {/* Debug information in development */}
        {process.env.NODE_ENV === 'development' && (
          <Collapse ghost style={{ marginTop: '2rem' }}>
            <Panel header="Debug Information" key="debug">
              <pre style={{ background: '#f5f5f5', padding: '1rem', borderRadius: '4px' }}>
                <strong>Form Values:</strong>
                {JSON.stringify(watchedValues, null, 2)}
              </pre>
              <pre style={{ background: '#fff2f0', padding: '1rem', borderRadius: '4px' }}>
                <strong>Errors:</strong>
                {JSON.stringify(errors, null, 2)}
              </pre>
            </Panel>
          </Collapse>
        )}
      </div>
    </Form>
    </CustomFormProvider>
  )
}

// Separate component for department fields
interface DepartmentFieldsProps {
  categoryIndex: number
  control: any
  errors: any
}

const DepartmentFields: React.FC<DepartmentFieldsProps> = ({
  categoryIndex,
  control,
  errors,
}) => {
  const { fields, append, remove } = useFieldArray({
    control,
    name: `categories.${categoryIndex}.departments`,
  })

  return (
    <>
      {fields.map((field, departmentIndex) => (
        <div
          key={field.id}
          className="nested-form-item"
          style={{
            border: '1px solid #e8e8e8',
            borderRadius: '6px',
            padding: '16px',
            marginBottom: '16px',
            background: '#fafafa',
          }}
        >
          <Row justify="space-between" align="middle" style={{ marginBottom: '16px' }}>
            <Col>
              <Text strong>Department {departmentIndex + 1}</Text>
            </Col>
            <Col>
              {fields.length > 1 && (
                <Button
                  type="text"
                  danger
                  icon={<DeleteOutlined />}
                  size="small"
                  onClick={() => remove(departmentIndex)}
                >
                  Remove
                </Button>
              )}
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                label="Department Name"
                validateStatus={
                  errors.categories?.[categoryIndex]?.departments?.[departmentIndex]?.name
                    ? 'error'
                    : ''
                }
                help={
                  errors.categories?.[categoryIndex]?.departments?.[departmentIndex]?.name?.message
                }
                required
              >
                <Controller
                  name={`categories.${categoryIndex}.departments.${departmentIndex}.name`}
                  control={control}
                  render={({ field }) => <Input {...field} placeholder="Enter department name" />}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Controller
                name={`categories.${categoryIndex}.departments.${departmentIndex}.type`}
                control={control}
                render={({ field, fieldState }) => (
                  <Form.Item
                    label="Department Type"
                    validateStatus={fieldState.error ? 'error' : ''}
                    help={fieldState.error?.message}
                    required
                  >
                    <Input {...field} placeholder="Enter department type" />
                  </Form.Item>
                )}
              />
            </Col>
          </Row>
        </div>
      ))}

      <Button
        type="dashed"
        onClick={() => append(defaultDepartment)}
        icon={<PlusOutlined />}
        style={{ width: '100%' }}
      >
        Add Department
      </Button>
      </>
  )
}

export default CategoriesForm
