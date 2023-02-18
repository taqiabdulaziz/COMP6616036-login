import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Navigate, useNavigate } from 'react-router-dom';
import styles from './Register.module.css';
import { useRegister } from './Register.hooks';
import useUserStore from '../../database/store';
import { hasCapital, hasDigit, hasLowercase, hasSufficientLength, hasSymbol } from './Register.util';
import FormWarningTextComponent from '../../components/FormWarningText/FormWarningTextComponent';
import LoadingComponent from '../../components/Loading/LoadingComponent';

function Register() {
  const {
    register, handleSubmit, formState: { errors },
  } = useForm();
  const registerMutation = useRegister();
  const navigate = useNavigate()
  const [email, setEmail] = useState()
  const [password, setPassword] = useState()
  const token = useUserStore(state => state.token)

  if (token) {
    return <Navigate to={'/'} replace />
  }

  if (registerMutation.isSuccess) {
    navigate('/login')
  }

  const onSubmit = () => {
    registerMutation.mutate({
      email, password
    });
  };

  const handleUsernameChange = (e) => setEmail(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);

  return (
    <div className={styles.container}>
      <div>
        <div className="input-group mb-3" onSubmit={handleSubmit(onSubmit)}>
          <form>
            <div className={styles['form-group']}>
              {registerMutation.error && (
                <div className="alert alert-danger" role="alert">
                  {registerMutation.error.message}
                </div>
              )}

              <h1>Register</h1>
              <div>
                <p>Email</p>
                <input placeholder="" type="text" className={errors.email ? 'form-control is-invalid' : 'form-control'} id="validationServerUsername" aria-describedby="inputGroupPrepend3 validationServerUsernameFeedback" {...register('email', { required: true })} onChange={handleUsernameChange} />
              </div>
              <div>
                <p>Password</p>
                <input placeholder="" type="text" className={errors.password ? 'form-control is-invalid' : 'form-control'} id="validationServerPassword" aria-describedby="inputGroupPrepend3 validationServerUsernameFeedback" {...register('password', {
                  required: true, validate: {
                    hasCapital,
                    hasLowercase,
                    hasDigit,
                    hasSymbol,
                    hasSufficientLength,
                  }
                })} onChange={handlePasswordChange} />
                {errors.password && <FormWarningTextComponent text={errors.password.message} />}
              </div>
              {
                registerMutation.isLoading
                  ? <LoadingComponent />
                  : <button type="submit" className='btn btn-primary'>Submit</button>
              }
              <p>Already have an account? <a className={styles.link} onClick={() => navigate('/login')}>Login</a></p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Register;
