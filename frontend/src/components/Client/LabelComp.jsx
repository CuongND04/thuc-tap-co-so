import React from 'react'

const LabelComp = ({title, htmlFor}) => {
  return (
    <label htmlFor={htmlFor} className="block text-lg mt-5 leading-6">{title}</label>
  )
}

export default LabelComp