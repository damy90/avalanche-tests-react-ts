import { NavLink } from "react-router-dom";
import { useTestsList } from "../hooks/useTestsList.js";

function MyReports(){
    const { tests } = useTestsList()

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
                    <Data tests={tests}></Data>
                </tbody>
            </table>
        </>
    )
}

function Data({tests}) {
    return tests.map(test => {
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