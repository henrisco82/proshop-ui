import React from 'react'
import PropTypes from 'prop-types'
import { FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa'

const Rating = ({ value, text, color }) => {
    return (
        <div className="rating">
            <span>
                <i style={{ color }} >
                    {value >= 1 ? <FaStar /> : value >= 0.5 ? <FaStarHalfAlt /> : <FaRegStar />}
                </i>
            </span>
            <span>
                <i style={{ color }} >
                    {value >= 2 ? <FaStar /> : value >= 1.5 ? <FaStarHalfAlt /> : <FaRegStar />}
                </i>
            </span>
            <span>
                <i style={{ color }} >
                    {value >= 3 ? <FaStar /> : value >= 2.5 ? <FaStarHalfAlt /> : <FaRegStar />}
                </i>
            </span>
            <span>
                <i style={{ color }} >
                    {value >= 4 ? <FaStar /> : value >= 3.5 ? <FaStarHalfAlt /> : <FaRegStar />}
                </i>
            </span>
            <span>
                <i style={{ color }} >
                    {value >= 5 ? <FaStar /> : value >= 4.5 ? <FaStarHalfAlt /> : <FaRegStar />}
                </i>
            </span>
            <span>{text && text}</span>
        </div>
    )
}

Rating.defaultProps = {
    color: '#f8e825'
}

Rating.propTypes = {
    value: PropTypes.number,
    text: PropTypes.string,
    color: PropTypes.string
}

export default Rating
