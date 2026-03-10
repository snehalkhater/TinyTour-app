function Input({type, placeholder, value, onChange}) {
  return (
    < input 
    type={type}
    placeholder={placeholder}
    value={value}
    onChange={onChange}
    className='border border-gray-300 rounded px-3 py-2 
    focus:outline-none focus:ring-2 focus:ring-blue-500
    block w-full'
    />
  );
}

export default Input