import { NavLink } from "react-router-dom";
import { useAppSelector } from "../redux/hooks";
//import { useFetchTestsQuery } from "../redux/features/tests-api-slice";
import {TestDetails} from '../types/reports';
import { useDispatch } from "react-redux";
import { getTests } from "../redux/features/tests-api-slice";
//import { useTestsList } from "../hooks/useTestsList.js";

function MyReports(){
    //const { tests } = useTestsList()
    //const { data = [], isFetching } = useFetchTestsQuery(token)
    const dispatch = useDispatch()
    dispatch(getTests)
    const data = useAppSelector((state) => state.tests.tests)

    return (
        <>
            <h1>Tests administration</h1>
            <table>
                <thead>
                    <tr>
                        <th>Place</th>
                        <th>Date</th>
                        <th>Danger level</th>
                        <th>Details</th>
                        {/* <th>User</th>
                        <th>Actions</th> */}
                    </tr>
                </thead>
                <tbody>
                    <Data tests={data}></Data>
                </tbody>
            </table>
        </>
    )
}

function Data({tests}) {
    return tests.map((test:TestDetails) => {
        return (
            <tr key={test._id}>
                <td>{test.place}</td>
                <td>{test.dateCreated}</td>
                <td>{test.dangerLevel}</td>
                <td>{test.content}</td>
                <td>
                    <button type="button" onClick={() => handleDelete(test._id)}>
                        Delete test
                    </button>
                    &nbsp;
                    <NavLink to={'/report/' + test._id + '/edit'}>
                        Edit test
                    </NavLink>
                    {/* TODO: add show on map */}
                </td>
            </tr>
        )
    });
}

export default MyReports;