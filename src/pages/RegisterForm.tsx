import { Navigate } from "react-router-dom"
import { StyledButton } from "../styles/common/Button.styled"
import { StyledForm } from "../styles/common/Form.styled"
import { StyledInput } from "../styles/common/Input.styled"
import { useAuth } from "../hooks/useAuth"
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as Yup from 'yup'

function Register() {
    const { signup, userHasRole } = useAuth()
    const formSchema = Yup.object().shape({
        email: Yup.string()
            .required('User name is mandatory')
            .min(3, 'User name must be at 3 char long'),
        password: Yup.string()
            .required('Password is mandatory')
            .min(3, 'Password must be at 3 char long'),
        confirmPwd: Yup.string()
            .required('Password confirmation is mandatory')
            .oneOf([Yup.ref('password')], 'Passwords does not match'),
    })
    const formOptions = { resolver: yupResolver(formSchema) }
    const { register, handleSubmit, formState } = useForm(formOptions)
    const { errors } = formState

    if (userHasRole('Registered')) return <Navigate to="/" />

    const onSubmit = handleSubmit((data) => {
        if (signup.isLoading) return

        const username = data.email
        const password = data.password

        signup.mutate({ username, password })

        return false;
    })
    return (
        <StyledForm method="post" onSubmit={onSubmit}>
            <div className="box">
                <h1>Register</h1>

                <StyledInput type="email" placeholder="email"  $validationError={!!errors.email} {...register('email')}/>
                <div className="invalid-feedback">{errors.email?.message?.toString()}</div>

                <StyledInput type="password" placeholder="password" $validationError={!!errors.password} {...register('password')} />
                <div className="invalid-feedback">{errors.password?.message?.toString()}</div>

                <StyledInput type="password" placeholder="repeat password" $validationError={!!errors.confirmPwd} {...register('confirmPwd')} />
                <div className="invalid-feedback">{errors.confirmPwd?.message?.toString()}</div>

                <StyledButton type="submit" >
                    Register
                </StyledButton>

            </div>

        </StyledForm>
    )
}

export default Register