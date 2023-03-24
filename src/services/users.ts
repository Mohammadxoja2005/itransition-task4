import { createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import { gql } from "@apollo/client";
import { graphqlRequestBaseQuery } from '@rtk-query/graphql-request-base-query';


export const usersApi = createApi({
    reducerPath: "usersApi",

    baseQuery: fetchBaseQuery({ baseUrl: 'https://itransition-task4-backend-production.up.railway.app' }),

    endpoints: (builder: any) => ({
        getUsers: builder.query({
            query: () => '/auth'
        }) 
        
    })
})

export const { useGetUsersQuery } = usersApi;



