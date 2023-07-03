import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { TestDetails } from '../../types/reports';
import { getAuthHeaders } from '../../../utils/auth-headers';

export const testsApiSlice = createApi({
    reducerPath: 'testsApi',
    tagTypes: ['Tests'],
    baseQuery: fetchBaseQuery({
        baseUrl: `${import.meta.env.VITE_SERVER_URL}/api/tests/`,
    }),
    endpoints(builder) {
        return {
            fetchTests: builder.query<TestDetails[], string | null>({
                query() {
                    return {
                        url: ``
                    };
                },
            },),
            postTest: builder.mutation<TestDetails,{payload:Partial<TestDetails>, token:string}>({
                query: ({payload, token}) => ({
                    url: ``,
                    method: 'POST',
                    body: payload,
                    headers: getAuthHeaders(token).headers,
                    //credentials: 'include',
                }),
                invalidatesTags: [{ type: 'Tests', id: 'LIST' }],
            }),
        };
    },
});

export const { useFetchTestsQuery, usePostTestMutation } = testsApiSlice;