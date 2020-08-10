import tw from 'twin.macro'
import BaseButton from './BaseButton'

const SecondaryButton = tw(BaseButton)`bg-white text-primary hover:(bg-primary-dark text-white)`

export { SecondaryButton as default, SecondaryButton }