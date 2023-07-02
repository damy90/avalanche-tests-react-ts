// var a = { 
//     "_id": "6470c0e08382d600137d5582", 
//     "lat": "23.396352", 
//     "lon": "42.6442752", 
//     "place": "Fake", 
//     "content": "Fake", 
//     "dateCreated": "05/26/2023 5:23 PM", 
//     "dangerLevel": "1", 
//     "_acl": { "creator": "6470bf36efd4fd0012535058" }, 
//     "_kmd": { "lmt": "2023-05-26T14:23:28.965Z", "ect": "2023-05-26T14:23:28.965Z" }
// }

// export type TestsListContext = {
//     postTest: UseMutationResult<TestDetails, unknown, TestDetails, unknown>,
//     getTests: UseMutationResult<TestDetails[], unknown, void, unknown>,
//     tests: TestDetails[]
// }

export type TestDetails = {
    lat: number,
    lon: number,
    dangerLevel: DangerRange
    content?: string,
    place:string
    _id?: string
}

export type DangerRange = 1 | 2 | 3 | 4 | 5

export type MapProps = {
    className?: string,
    setMyPosition?: React.Dispatch<React.SetStateAction<{
        lng: number;
        lat: number;
    }>>
}