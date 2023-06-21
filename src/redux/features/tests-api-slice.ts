import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { TestDetails } from '../../types/reports';
import { getAuthHeaders } from '../../../utils/auth-headers';

export const testsApiSlice = createApi({
    reducerPath: 'testsApi',
    tagTypes: ['Tests'],
    baseQuery: fetchBaseQuery({
        baseUrl: `${import.meta.env.VITE_SERVER_URL}/appdata/${import.meta.env.VITE_APP_KEY}`,
    }),
    endpoints(builder) {
        return {
            fetchTests: builder.query<TestDetails[], string | null>({
                query(token) {
                    return {
                        url: `/avalanche-tests/`,
                        headers: getAuthHeaders('kinvey', token).headers,
                    };
                },
            },),
            postTest: builder.mutation<TestDetails,{payload:Partial<TestDetails>, token:string}>({
                query: ({payload, token}) => ({
                    url: `/avalanche-tests/`,
                    method: 'POST',
                    body: payload,
                    headers: getAuthHeaders('kinvey', token).headers,
                    credentials: 'include',
                }),
                invalidatesTags: [{ type: 'Tests', id: 'LIST' }],
            }),
        };
    },
});

export const { useFetchTestsQuery, usePostTestMutation } = testsApiSlice;