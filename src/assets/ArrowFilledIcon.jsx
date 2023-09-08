export const ArrowFilledIcon = ({
  fill = 'currentColor',
  filled,
  size,
  height,
  width,
  label,
  ...props
}) => (
  <svg
    width={size || width || 24}
    height={size || height || 24}
    viewBox="0 0 24 24"
    fill={filled ? fill : 'none'}
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M6 12V9.32998C6 6.01998 8.35 4.65998 11.22 6.31998L13.53 7.65998L15.84 8.99998C18.71 10.66 18.71 13.37 15.84 15.03L13.53 16.37L11.22 17.71C8.35 19.34 6 17.99 6 14.67V12Z"
      stroke={fill}
      strokeWidth={1.5}
      strokeMiterlimit="10"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)
