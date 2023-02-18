import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Navigate, useNavigate } from 'react-router-dom';
import styles from './ForgetPassword.module.css';
import { useForgetPassword } from './ForgetPassword.hooks';
import useUserStore from '../../database/store';
import { hasCapital, hasDigit, hasLowercase, hasSufficientLength, hasSymbol } from '../Register/Register.util';
import FormWarningTextComponent from '../../components/FormWarningText/FormWarningTextComponent';
import LoadingComponent from '../../components/Loading/LoadingComponent';

function ForgetPassword() {
  const {
    register, handleSubmit, formState: { errors },
  } = useForm();
  const forgetPasswordMutation = useForgetPassword();
  const navigate = useNavigate()
  const [email, setEmail] = useState()
  const [password, setPassword] = useState()
  const [newPassword, setNewPassword] = useState()
  const token = useUserStore(state => state.token)

  if (forgetPasswordMutation.isSuccess) {
    navigate('/')
  }

  const onSubmit = () => {
    forgetPasswordMutation.mutate({
      email, password, newPassword
    });
  };

  const handleUsernameChange = (e) => setEmail(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);
  const handleNewPasswordChange = e => setNewPassword(e.target.value);

  return (
    <div className={styles.container}>
      <div>
        <div className="input-group mb-3" onSubmit={handleSubmit(onSubmit)}>
          <form>
            <div className={styles['form-group']}>
              {forgetPasswordMutation.error && (
                <div className="alert alert-danger" role="alert">
                  {forgetPasswordMutation.error.message}
                </div>
              )}

              <h1>Forget Password</h1>
              <div>
                <p>Email</p>
                <input placeholder="" type="text" className={errors.email ? 'form-control is-invalid' : 'form-control'} id="validationServerUsername" aria-describedby="inputGroupPrepend3 validationServerUsernameFeedback" {...register('email', { required: true })} onChange={handleUsernameChange} />
              </div>
              <div>
                <p>Old Password</p>
                <input placeholder="" type="text" className={errors.password ? 'form-control is-invalid' : 'form-control'} id="validationServerPassword" aria-describedby="inputGroupPrepend3 validationServerUsernameFeedback" {...register('password', {
                  required: true
                })} onChange={handlePasswordChange} />
                {errors.password && <FormWarningTextComponent text={errors.password.message} />}
              </div>
              <div>
                <p>New Password</p>
                <input placeholder="" type="text" className={errors.password ? 'form-control is-invalid' : 'form-control'} id="validationServerPassword" aria-describedby="inputGroupPrepend3 validationServerUsernameFeedback" {...register('newPassword', {
                  required: true, validate: {
                    hasCapital,
                    hasLowercase,
                    hasDigit,
                    hasSymbol,
                    hasSufficientLength,
                  }
                })} onChange={handleNewPasswordChange} />
                {errors.newPassword && <FormWarningTextComponent text={errors.newPassword.message} />}
              </div>
              {
                forgetPasswordMutation.isLoading
                  ? <LoadingComponent />
                  : <button type="submit" className='btn btn-primary'>Submit</button>
              }
              <a className={styles.link} onClick={() => navigate('/')}>Back</a>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ForgetPassword;
