import React from 'react'
import PropTypes from 'prop-types'

const profileExperience = ({
    experience: { company, title, location, current, to, from, description }
}) => {
    return (
        <div>
        <h3 className="text-dark">{company}</h3>
        <p>
          {from} - {to}
        </p>
        <p>
          <strong>Position: </strong> {title}
        </p>
        <p>
          <strong>Location: </strong> {location}
        </p>
        <p>
          <strong>Description: </strong> {description}
        </p>
      </div>
    )
}

profileExperience.propTypes = {
    experience:PropTypes.object.isRequired,

}

export default profileExperience
