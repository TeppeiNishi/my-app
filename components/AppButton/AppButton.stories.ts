import type { Meta, StoryObj } from '@storybook/react'

import { AppButton } from './AppButton'

const meta: Meta<typeof AppButton> = {
  title: 'AppButton',
  component: AppButton,
  args: {
    loading: false,
    children: 'Click me',
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
