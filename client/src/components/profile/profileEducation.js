import React from 'react'
import PropTypes from 'prop-types'

const profileEducation = ({ education:{school , degree , fieldofStudy , from , to ,current , description}}) => {
    return (
        <div class="profile-edu bg-white p-2">
        <h2 class="text-primary">Education</h2>
        <div>
          <h3>{school}</h3>
          <p>{from} - {to}</p>
          <p><strong>Degree: </strong>{degree}</p>
          <p><strong>Field Of Study: </strong>{fieldofStudy}</p>
          <p>
            <strong>Description: </strong>{description}
          </p>
        </div>
      </div>
    )
}

profileEducation.propTypes = {
    education:PropTypes.object.isRequired,

}

export default profileEducation
