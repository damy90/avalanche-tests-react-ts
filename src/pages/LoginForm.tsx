import { StyledButton } from "../styles/common/Button.styled"
import { StyledForm } from "../styles/common/Form.styled"
import { FormEvent, useRef } from "react"
import { Navigate } from "react-router-dom"
import { useAuth } from "../hooks/useAuth"
import { StyledInput } from "../styles/common/Input.styled"

function Login() {
    const { login, userHasRole } = useAuth()
    const usernameRef = useRef<HTMLInputElement>(null)
    const passwordRef = useRef<HTMLInputElement>(null)

    if (userHasRole('Registered')) return <Navigate to="/" />

    function handleSubmit(e: FormEvent) {
        e.preventDefault()
        if (login.isLoading) return

        const username = usernameRef.current?.value
        const password = passwordRef.current?.value
        if (username == null || username === '' || password == null || password === '') {
            return
        }

        login.mutate({username, password})
    }
    return (
        <StyledForm method="post" onSubmit={handleSubmit}>
            <div className="box">
                <h1>Log In</h1>

                <StyledInput type="email" required name="email" placeholder="email" ref={usernameRef} />

                <StyledInput type="password" required name="password" placeholder="password" ref={passwordRef} />

                <StyledButton type="submit">
                    Log In
                </StyledButton>

            </div>

        </StyledForm>
    )
}

export default Login