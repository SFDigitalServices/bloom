import * as React from "react"
import tw, { styled, css } from 'twin.macro'

export type ButtonSize = "default" | "regular" | "small"

export interface ButtonProps {
  className?: string
  buttonSize?: ButtonSize
  children: React.ReactNode
  onClick?: (e: React.MouseEvent) => void
}

const StyledButton = styled.button<ButtonProps>`
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
  ${props => props.buttonSize == "small" && tw`text-xs px-6 py-3`}
`

/*
 * This should never be used directly in the product, instead, you should use the components
 * that build off of this, like PrimaryButton or SecondaryButton.
 */
const BaseButton = ({ className, buttonSize, children, onClick }: ButtonProps) => (
  <StyledButton
    className={className}
    buttonSize={buttonSize}
    onClick={onClick}
  >
    {children}
  </StyledButton>
)

BaseButton.defaultProps = {
  buttonSize: "default",
} as Partial<ButtonProps>

export { BaseButton as default, BaseButton }