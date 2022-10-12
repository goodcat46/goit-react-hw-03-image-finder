import React from 'react'
import PropTypes from 'prop-types'
import css from './button.module.css'

const Button = props => {
  return (
    <button className={css.Button} type='button'>Load more</button>
  )
}

Button.propTypes = {}

export default Button