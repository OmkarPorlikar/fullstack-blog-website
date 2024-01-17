import React from 'react'
import { getSinglePost } from '../utils/api'
import { useQuery } from 'react-query'
export const useGetSinglePost = (id , username)  => {

    const {data , isLoading , isError} = useQuery({
        queryKey:["singlePost"],
        queryFn: ()=> getSinglePost(id , username)
      })
      
    return (
{data,isLoading , isError}
    )
}
