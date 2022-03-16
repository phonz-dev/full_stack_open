const Notification = ({ message }) => {
  if (message === null) {
    return null;
  }

  const messageStyle = {
    padding: 10,
    border: '3px solid green',
    background: '#ddd',
    borderRadius: 5,
    color: 'green',
    marginBottom: 10,
    fontSize: 20,
  }

  return (
    <div style={messageStyle}>
      {message}
    </div>
  )
}

export default Notification;