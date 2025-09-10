# React Next.js Nested Form with TypeScript & Ant Design

A powerful form management application built with Next.js 14, TypeScript, Ant Design, react-hook-form, and Yup validation featuring nested form arrays with real-time duplicate validation.

## Features

- ✨ **Next.js 14** with App Router
- 🎯 **TypeScript** for type safety
- 🎨 **Ant Design** for beautiful UI components
- 📝 **React Hook Form** for efficient form management
- ✅ **Yup Validation** with custom duplicate checking
- 🔄 **Real-time Validation** for duplicate names and types
- 📱 **Responsive Design** with mobile-friendly layout

## Form Structure

The application manages a nested form structure:

```typescript
categories: [
  {
    name: string,
    descriptions: string,
    departments: [
      {
        name: string,
        description: string,
        enabled: boolean,
        type: string,
      },
    ],
  },
]
```

## Validation Features

### Duplicate Validation

- **Category Names**: Prevents duplicate category names across all categories
- **Department Types**: Prevents duplicate types within the same category
- **Real-time Feedback**: Shows validation errors immediately as you type

### Form Validation Rules

- All fields are required except the `enabled` boolean
- Minimum length requirements for names and descriptions
- Custom Yup validators for duplicate detection
- Cross-field validation with detailed error messages

## Getting Started

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

### Build

```bash
npm run build
npm run start
```

## Dependencies

### Core Dependencies

- **next**: ^14.2.5 - React framework with App Router
- **react**: ^18 - React library
- **typescript**: ^5 - TypeScript support

### Form Management

- **react-hook-form**: ^7.52.1 - Performant form library
- **@hookform/resolvers**: ^3.9.0 - Form validation resolvers
- **yup**: ^1.4.0 - Schema validation library

### UI Components

- **antd**: ^5.20.2 - Enterprise-class UI design language
- **@ant-design/nextjs-registry**: ^1.0.0 - Next.js integration for Ant Design

## Project Structure

```
src/
├── app/
│   ├── layout.tsx          # Root layout with Ant Design setup
│   ├── page.tsx            # Main page component
│   └── globals.css         # Global styles
├── components/
│   └── CategoriesForm.tsx  # Main form component with nested arrays
├── types/
│   └── form.ts            # TypeScript type definitions
└── utils/
    └── validation.ts      # Yup validation schemas
```

## Key Components

### CategoriesForm Component

- Dynamic form arrays for categories and departments
- Real-time validation with immediate error feedback
- Add/remove functionality for both categories and departments
- Debug panel for development (visible in dev mode)

### Validation Schema

- Custom Yup validators for duplicate detection
- Detailed error messages for specific field violations
- Cross-validation between form array items

## Usage Examples

### Adding Categories

1. Fill in the category name and description
2. Add departments to the category
3. Set department details and enable/disable status
4. Use "Add Category" to create additional categories

### Duplicate Detection

- Try entering duplicate category names - you'll see immediate validation errors
- Try entering duplicate department types within the same category
- Each duplicate field will show a specific error message

### Form Submission

- The form validates all fields including duplicates before submission
- Successful validation displays form data in the console
- All validation errors are displayed with helpful messages

## Development Notes

- The application uses `onChange` mode for real-time validation
- TypeScript provides full type safety throughout the application
- Ant Design components are fully integrated with react-hook-form
- Custom CSS classes provide additional styling for nested form elements

## Troubleshooting

If you encounter TypeScript warnings in the editor, they are typically false positives during development setup. The application runs correctly despite these warnings.

For production builds, ensure all linting errors are resolved:

```bash
npm run lint
```

## Contributing

1. Follow TypeScript best practices
2. Maintain consistent code formatting
3. Add proper type definitions for new features
4. Test form validation thoroughly
5. Ensure responsive design compatibility

## License

This project is for demonstration purposes and learning.

