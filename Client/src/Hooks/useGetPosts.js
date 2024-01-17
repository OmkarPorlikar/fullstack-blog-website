import React from 'react'
import { useQuery } from 'react-query'
import { getPost } from '../utils/api'
const useGetPosts = () => {
const {data , isLoading , isError} = useQuery({
  queryKey:["post"],
  queryFn: ()=> getPost()
})

  return (
  {
    data ,
    isLoading,
    isError
  }
  )
}

export default useGetPosts