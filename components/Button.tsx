import { VariantProps, cva } from 'class-variance-authority'
import { FC } from 'react'

const buttonClasses = cva(
  // default classes that apply to every button
  [
    'rounded-3xl',
    'font-bold',
    'hover:scale-110',
    'active:scale-100',
    'transition',
    'duration-200',
    'ease-in-out'
  ],
  {
    variants: {
      // Create variant styles of the button
      intent: {
        // prop called intent
        primary: [
          // if value of intent is prim apply this classes
          'bg-violet-500',
          'text-white',
          'border-transparent',
          'hover:bg-violet-600'
        ],

        secondary: [
          // if secondary apply this classes
          'bg-white',
          'text-black',
          'border-gray-400',
          'hover:bg-gray-100',
          'border-solid',
          'border-2',
          'border-gray-800'
        ],
        text: ['bg-transparent', 'text-black', 'hover:bg-gray-100'] // if text apply this classes
      },
      size: {
        // prop called size
        small: ['text-md', 'py-1', 'px-2'],
        medium: ['text-lg', 'px-6', 'py-2'],
        large: ['text-xlg', 'px-8', 'py-4']
      }
    },
    defaultVariants: {
      // default variant if someone does not pass variants
      intent: 'primary',
      size: 'medium'
    }
  }
)

// deriving a type based on the buttonClasses
export interface ButtonProps
  extends React.HTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonClasses> {}

const Button: FC<ButtonProps> = ({
  children,
  intent,
  size,
  className,
  ...props
}) => {
  return (
    <button className={buttonClasses({ intent, size, className })} {...props}>
      {children}
    </button>
  )
}

export default Button
