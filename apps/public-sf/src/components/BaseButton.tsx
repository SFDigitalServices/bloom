import * as React from "react"
import tw, { styled } from 'twin.macro'

export type ButtonSize = "default" | "regular" | "small"

export interface ButtonProps {
  className?: string
  buttonSize?: ButtonSize
  children: React.ReactNode
  onClick?: (e: React.MouseEvent) => void
}

const defaultProps = {
  buttonSize: "default",
} as Partial<ButtonProps>


const UnstyledButton = ({ className, children, onClick }: ButtonProps) => (
  <button
    className={className}
    onClick={onClick}
  >
    {children}
  </button>
)

/*
 * This should never be used directly in the product, instead, you should use the components
 * that build off of this, like PrimaryButton or SecondaryButton.
 */
const BaseButton = styled(UnstyledButton)<ButtonProps>`
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

BaseButton.defaultProps = defaultProps

export { BaseButton as default, BaseButton }