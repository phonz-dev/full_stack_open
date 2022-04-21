const Input = props => {
  const {
    type,
    text,
    value,
    name,
    handleChange,
    placeholder
  } = props

  return (
    <div>
      {text}
      <input
        type={type}
        value={value}
        name={name}
        onChange={handleChange}
        placeholder={placeholder}
      />
    </div>
  )
}

export default Input