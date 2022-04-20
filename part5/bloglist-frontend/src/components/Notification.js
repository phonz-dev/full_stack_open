import PropTypes from 'prop-types'

const Notification = ({ notification }) => {
  if (notification === null) {
    return null
  }

  const color = notification.type === 'info'
    ? 'green' : 'red'
  const styles = {
    borderSize: '3px',
    borderStyle: 'solid',
    borderColor: color,
    color: color,
    borderRadius: '5px',
    backgroundColor: '#eee',
    paddingTop: '10px',
    paddingBottom: '10px',
    paddingLeft: '10px',
    paddingRight: '10px',
    fontSize: '1.5em'
  }

  return (
    <p style={styles}>
      { notification.message }
    </p>
  )
}

Notification.propTypes = {
  notification: PropTypes.object.isRequired
}

export default Notification