import React, { Fragment } from 'react'

const FormInput = ({title, type, placeholder, value, handleChange}) => {
    return (
       <Fragment>
           <label htmlFor={`form-${title}`} className="block mb-2 text-xs font-bold tracking-wide text-gray-700 uppercase">
               {title}
           </label>
           <input
           className='block w-full px-4 py-3 mb-3 leading-tight text-gray-700 bg-gray-100 border border-gray-400 rounded appearance-none focus:outline-none focus:bg-white'
           id={`form-${title}`}
           type={type}
           placeholder={placeholder}
           onChange={handleChange}
           value={value}
           />
       </Fragment>
    )
}

export default FormInput
