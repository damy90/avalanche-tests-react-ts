import { Navigate, useNavigate } from "react-router-dom"
import { StyledButton } from "../styles/common/Button.styled"
import { StyledForm } from "../styles/common/Form.styled"
import { StyledInput } from "../styles/common/Input.styled"
import { useAuth } from "../hooks/useAuth"
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as Yup from 'yup'
import Map from '../common/Map';
import { useState } from "react"
import { useTestsList } from "../hooks/useTestsList"
import { TestDetails } from "../types/reports"
import { useAppSelector } from "../redux/hooks"
//import { usePostTestMutation } from "../redux/features/tests-api-slice"

function SubmitReport() {
    //const { userHasRole } = useAuth()
    //const { postTest} = useTestsList();
    const token = useAppSelector((state) => state.auth.token);
    //const [ postTest, { isLoading, isError, error, isSuccess } ] = usePostTestMutation()
    const roles =  useAppSelector((state) => state.auth.roles);
    const [myPos, setMyPosition] = useState({lng:0, lat:0});
    const navigate = useNavigate();

    const formSchema = Yup.object().shape({
        place: Yup.string()
            .required('Place name is mandatory')
            .min(3, 'Place name must be at 3 char long'),
        dangerLevel: Yup.number()
            .required('Danger level name is mandatory')
    })
    const formOptions = { resolver: yupResolver(formSchema) }
    const { register, handleSubmit, reset, formState } = useForm(formOptions)
    const { errors } = formState

    if(!roles?.includes('Registered')) return <Navigate to="/"/>

    const onSubmit = handleSubmit((data) => {
        //if (isLoading) return

        const testData = {
            ...data,
            lat: myPos.lat,
            lon: myPos.lng
        } as TestDetails
        if(token) {
            //postTest({payload: testData, token: token})
        }
        
        navigate("/", { replace: true });

        return false;
    })
    return (
        <StyledForm method="post" onSubmit={onSubmit}>
            <div className="box">
                <h1>Submit Report</h1>

                {/* <StyledInput type="number" name="latitude" className="hidden" value={myPos.lat}/>
                <StyledInput type="number" name="longitude" className="hidden" value={myPos.lng}/> */}

                <label htmlFor="place">Place</label>
                <Map  setMyPosition={setMyPosition} className="submit-test"></Map>
                <StyledInput type="text" $validationError={!!errors.place} {...register('place')} />
                <div className="invalid-feedback">{errors.place?.message?.toString()}</div>
                <div>
                    <label htmlFor="dangerLevel">Danger Level: </label>
                    <select className="danger-option" id="dangerLevel" {...register('dangerLevel')}>
                        <option value=""></option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                    </select>
                </div>

                <label htmlFor="content">Details</label>
                <StyledInput type="text" {...register('content')}/>

                {/* TODO: limit date */}
                <StyledInput type="datetime-local" {...register('dateCreated')}/>

                <StyledButton type="submit" >
                    Submit
                </StyledButton>

            </div>

        </StyledForm>
    )
}

export default SubmitReport