import '@testing-library/jest-dom/vitest'

import { cleanup, render } from '@testing-library/react'
import { afterEach, expect, test } from 'vitest'

import { AppButton } from './AppButton'

afterEach(() => {
  cleanup()
})

test('renders children correctly', () => {
  const { getByText } = render(<AppButton>Click me</AppButton>)
  expect(getByText('Click me')).toBeInTheDocument()
})

test('disables button when loading is true', () => {
  const { getByRole } = render(<AppButton loading>Click me</AppButton>)
  expect(getByRole('button')).toBeDisabled()
})

test('shows loader when loading is true', () => {
  const { container } = render(<AppButton loading>Click me</AppButton>)
  expect(container.querySelector('.animate-spin')).toBeInTheDocument()
})

test('hides children when loading is true', () => {
  const { getByText } = render(<AppButton loading>Click me</AppButton>)
  expect(getByText('Click me')).toHaveClass('invisible')
})

test('does not disable button when loading is false', () => {
  const { getByRole } = render(<AppButton>Click me</AppButton>)
  expect(getByRole('button')).not.toBeDisabled()
})

test('does not show loader when loading is false', () => {
  const { container } = render(<AppButton>Click me</AppButton>)
  expect(container.querySelector('.animate-spin')).not.toBeInTheDocument()
})
