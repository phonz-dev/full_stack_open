const Input = props => {
  const {
    id,
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
        id={id}
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