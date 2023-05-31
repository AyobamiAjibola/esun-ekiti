import React, { useState, useEffect } from 'react';
import { getChief } from './api';

const useChief = (pageNum = 1) => {
  const [results, setResults] = useState<any>([])
  const [isLoading, setIsLoading] = useState(false)
  const [isError, setIsError] = useState(false)
  const [error, setError] = useState({})
  const [hasNextPage, setHasNextPage] = useState(false)

  useEffect(() => {
    setIsLoading(true)
    setIsError(false)
    setError({})

    const controller = new AbortController()
    const { signal } = controller

    getChief(pageNum, { signal })
      .then(data => {
        setResults((prev: any) => [...prev, ...data])
        setHasNextPage(Boolean(data.length))
        setIsLoading(false)
      })
      .catch(e => {
        setIsLoading(false)
        if (signal.aborted) return
        setIsError(true)
        setError({ message: e.message })
      })

    return () => controller.abort()
  }, [pageNum])

  return { isLoading, isError, error, results, hasNextPage }
}

export default useChief
