function Input({type, placeholder, value, onChange,onKeyDown}) {
  return (
    < input 
    type={type}
    placeholder={placeholder}
    value={value}
    onChange={onChange}
    onKeyDown={onKeyDown}
    className='border border-gray-300 rounded px-3 py-2 
    focus:outline-none focus:ring-2 focus:ring-blue-500
    block w-full mb-3 mt-5'
    />
  );
}

export default Input