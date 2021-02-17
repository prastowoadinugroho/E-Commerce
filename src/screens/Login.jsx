import React, { useState } from 'react'
import { toast } from 'react-toastify';
import { connect } from 'react-redux';

import Container from '../components/container/container.component';
import FormInput from '../components/inputs/form.input.component';
import Button from '../components/buttons/button.component';
import { login } from '../data/reducers/auth';
import './loading.css';
import { Redirect } from 'react-router-dom';

const Login = ({login,isAuth,isLoading,user}) => {
    const [data, setData] = useState({
        email: '',
        password: ''
    })

    const { email, password } = data

    const handleChange = (name) => event => {
        setData({...data, [name]: event.target.value})
    }

    const onSubmit = async(e) => {
        e.preventDefault();
        login({email, password})
    }
    
    if(isAuth && user){
        const { name, role } = user;
        toast.success(`Welcome ${name}`)
        if(role === 0 ) return <Redirect to='/dashboard/user'/>
        if(role === 1 ) return <Redirect to='/dashboard/admin'/>
    }
    
    return (
        <Container>
           <form
        className='flex flex-col p-5 mx-auto my-16 overflow-hidden bg-white rounded-lg shadow-2xl md:w-1/2 lg:w-1/3'
        onSubmit={onSubmit}
      >
                <h2 className="mb-5 text-2xl font-bold text-center">
                    Login
                </h2>
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
                {isLoading && <div 
                    id='loading'
                    className='self-center mb-3'
                ></div>}
                {!isLoading && <Button
                    title='SignIn'
                    moreStyle='bg-primary text-white w-full mb-3'
                    type='submit'
                />}

                <div className="flex justify-end w-full">
                    <Button
                    isButton={false}
                    title='did you need new account ?'
                    href='/register'
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
export default connect(mapStateToStateProps, {login})(Login)
