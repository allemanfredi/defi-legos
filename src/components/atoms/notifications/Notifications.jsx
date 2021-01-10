import React from 'react'
import ReduxToastr from 'react-redux-toastr'

const Notifications = () => {
  return (
    <ReduxToastr
      timeOut={7000}
      newestOnTop={false}
      preventDuplicates
      position="bottom-right"
      getState={state => state.toastr}
      transitionIn="fadeIn"
      transitionOut="fadeOut"
      progressBar
      closeOnToastrClick
    />
  )
}

export default Notifications
