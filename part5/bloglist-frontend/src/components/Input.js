const Input = props => {
  const {
    type,
    text,
    value,
    name,
    handleChange
  } = props

  return (
    <div>
      {text}
      <input
        type={type}
        value={value}
        name={name}
        onChange={handleChange}
      />
    </div>
  )
}

export default Input