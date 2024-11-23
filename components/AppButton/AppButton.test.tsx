import '@testing-library/jest-dom/vitest'

import { cleanup, render } from '@testing-library/react'
import { afterEach, expect, test } from 'vitest'

import { AppButton, AppButtonProps } from './AppButton'

afterEach(() => {
  cleanup()
})

function setup(overrides: Partial<AppButtonProps> = {}) {
  return render(<AppButton {...overrides}>Click me</AppButton>)
}

test('renders children correctly', () => {
  const { getByText } = setup()
  expect(getByText('Click me')).toBeInTheDocument()
})

test('disables button when loading is true', () => {
  const { getByRole } = setup({ loading: true })
  expect(getByRole('button')).toBeDisabled()
})

test('shows loader when loading is true', () => {
  const { container } = setup({ loading: true })
  expect(container.querySelector('.animate-spin')).toBeInTheDocument()
})

test('hides children when loading is true', () => {
  const { getByText } = setup({ loading: true })
  expect(getByText('Click me')).toHaveClass('invisible')
})

test('does not disable button when loading is false', () => {
  const { getByRole } = setup()
  expect(getByRole('button')).not.toBeDisabled()
})

test('does not show loader when loading is false', () => {
  const { container } = setup()
  expect(container.querySelector('.animate-spin')).not.toBeInTheDocument()
})
