import React from 'react'
import { Fragment } from 'react';


const notfound = props => {
    return (
        <Fragment>
        <h1 className='x-large text-primary'>
          <i className='fas fa-exclamation-triangle' /> Page Not Found
        </h1>
        <p className='large'>Sorry, this page does not exist</p>
      </Fragment>
    )
}



export default notfound;
