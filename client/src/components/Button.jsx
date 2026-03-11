function Button({title, onClick, size,varient = "primary"}) {

  const SIZE_CLASSES = {
    samll : "px-2 py-1 text-xs mx-3",
    medium: "px-4 py-2 text-sm mx-4",
    large: "px-6 py-2 text-lg mx-4",
  }

  const VARIANTS_CLASSES={
    primary:"bg-blue-500 text-white hover:bg-blue-600",
    secondary: "bg-grey-500 text-white hover:bg-gray-600",
    tertiary: "bg-orange-400 text-black hover:bg-organge-600",
  }
  return (
  <button 
  onClick={onClick}
  className={`${VARIANTS_CLASSES[varient]} ${SIZE_CLASSES[size]} rounded `}
  >
    {title}
  </button>
  )
}

export default Button