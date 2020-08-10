import * as React from "react"
import tw, { styled, css } from 'twin.macro'

export type ButtonStyle = "default" | "primary" | "secondary" | "primary-small" | "secondary-small" | "borderless"

export interface ButtonProps {
  buttonStyle?: ButtonStyle
  children: React.ReactNode
  onClick?: (e: React.MouseEvent) => void
}

const _baseStyle = css`
  ${tw`
    border-2
    border-primary
    rounded
    px-6
    py-4
    text-lg
    text-center
    uppercase
    font-alt-sans
    inline-block
    tracking-widest
    text-sm
    font-bold
    leading-snug
    hover:(bg-primary-dark text-white)
  `}
`

const _smallStyle = tw`text-xs px-6 py-3`

const _secondaryStyle = css`
  ${_baseStyle}
  ${tw`bg-white text-primary hover:(bg-primary-dark text-white)`}
`

const _primaryStyle = css`
  ${_baseStyle}
  ${tw`bg-primary-dark text-white hover:bg-primary-darker`}
`

const _primarySmallStyle = css`${_primaryStyle} ${_smallStyle}`

const _secondarySmallStyle = css`${_secondaryStyle} ${_smallStyle}`

const _borderLessStyle = css`
  ${_primaryStyle}
  border-color: transparent;
  background: transparent;

  &:hover {
    background: transparent;
  }

  ${tw`text-primary-dark hover:(text-primary-darker)`}
`

const GetStyleFromkey = (styleKey: ButtonStyle) => {
  switch (styleKey) {
    case 'default':
    case 'primary':
      return _primaryStyle
    case 'primary-small':
      return _primarySmallStyle
    case 'secondary':
      return _secondaryStyle
    case 'secondary-small':
      return _secondarySmallStyle
    case 'borderless':
      return _borderLessStyle
  }
}

const StyledButton = styled.button<{ buttonStyle: ButtonStyle }>`
  ${props => GetStyleFromkey(props.buttonStyle)}
`

const Button = ({ buttonStyle, children, onClick }: ButtonProps) => (
  <StyledButton buttonStyle={buttonStyle} onClick={onClick}>
    {children}
  </StyledButton>
)

Button.defaultProps = {
  buttonStyle: "default",
} as Partial<ButtonProps>

export { Button as default, Button }