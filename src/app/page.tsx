'use client'

import React from 'react'
import { Typography } from 'antd'
import CategoriesForm from '../components/CategoriesForm'

const { Title } = Typography


export default function Home() {
  return (
    <div className="container">
      <Title level={1} style={{ textAlign: 'center', marginBottom: '2rem' }}>
        Categories Management Form
      </Title>
      <div className="form-section">
          <CategoriesForm />
      </div>
    </div>
  )
}
