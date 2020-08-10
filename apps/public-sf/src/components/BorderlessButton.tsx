import tw, { styled, css } from 'twin.macro'
import BaseButton from './BaseButton'

const BorderlessButton = styled(BaseButton)`
  && {
    border-color: transparent;
    background: transparent;

    &:hover {
      background: transparent;
    }

    ${tw`text-primary-dark hover:(text-primary-darker)`}
  }
`
export { BorderlessButton as default, BorderlessButton }