import tw, { styled, css } from 'twin.macro'
import BaseButton from './BaseButton'

const PrimaryButton = tw(BaseButton)`bg-primary-dark text-white hover:bg-primary-darker`

export { PrimaryButton as default, PrimaryButton }