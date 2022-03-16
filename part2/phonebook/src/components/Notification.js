const Notification = ({ message, isError }) => {
  if (message === null) {
    return null;
  }

  const color = isError ? "error" : "success";

  return (
    <div className={`message ${color}`}>
      {message}
    </div>
  )
}

export default Notification;