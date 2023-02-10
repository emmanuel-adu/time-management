import clsx from 'clsx'

const Input = ({ className, ...props }) => {
  return (
    <input
      className={clsx(
        'border-gray text-lgrounded-3xl w-full border-2 border-solid px-6 py-2',
        className
      )}
      {...props}
    />
  )
}

export default Input
