import React, { useState } from 'react'
import { toast } from 'react-toastify';
import { connect } from 'react-redux';

import Container from '../components/container/container.component';
import FormInput from '../components/inputs/form.input.component';
import Button from '../components/buttons/button.component';
import { register } from '../data/reducers/auth';
import './loading.css';

const Register = ({register,isAuth,isLoading,user}) => {
    const [data, setData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
    })

    const { name, email, password, confirmPassword } = data

    const handleChange = (name) => event => {
        setData({...data, [name]: event.target.value})
    }

    const onSubmit = async(e) => {
        e.preventDefault();
        if(password !== confirmPassword){
            toast.error('Password do not match');
        } else {
            register({name, email, password})
        }
    }
    return (
        <Container>
           <form
        className='flex flex-col p-5 mx-auto my-16 overflow-hidden bg-white rounded-lg shadow-2xl md:w-1/2 lg:w-1/3'
        onSubmit={onSubmit}
      >
                <h2 className="mb-5 text-2xl font-bold text-center">
                    Register
                </h2>
                <FormInput
                    title='Name'
                    placeholder='Example'
                    value={name}
                    handleChange={handleChange('name')}
                    type='text'
                />
                <FormInput
                    title='Email'
                    placeholder='example@gmail.com'
                    value={email}
                    handleChange={handleChange('email')}
                    type='email'
                />
                <FormInput
                    title='Password'
                    placeholder='********'
                    value={password}
                    handleChange={handleChange('password')}
                    type='password'
                />
                <FormInput
                    title='Confirm Password'
                    placeholder='********'
                    value={confirmPassword}
                    handleChange={handleChange('confirmPassword')}
                    type='password'
                />
                {isLoading && <div 
                    id='loading'
                    className='self-center mb-3'
                ></div>}
                {!isLoading && <Button
                    title='SignUp'
                    moreStyle='bg-primary text-white w-full mb-3'
                    type='submit'
                />}

                <div className="flex justify-end w-full">
                    <Button
                    isButton={false}
                    title='already have an account ?'
                    href='/login'
                    moreStyle='text-small text-gray-700'
                    />
                </div>
            </form>
        </Container>
    )
}

const mapStateToStateProps = state => ({
    isAuth: state.auth.isAuthenticated,
    isLoading: state.auth.loading,
    user: state.auth.user
})
export default connect(mapStateToStateProps, {register})(Register)
