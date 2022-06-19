import { useEffect, useRef, useState } from "react";
import "./loader.scss"

interface FetchState<T> {
  loading?: boolean
  error?: Error
  data?: T
}

function useFetch<T>(fetcher: () => Promise<T>): FetchState<T> {
  const cancel = useRef(false)
  const [state, setState] = useState<FetchState<T>>({
    loading: true,
  })

  useEffect(() => {
    cancel.current = false
    setState({
      loading: true
    })
    const runFetcher = async () => {
      try {
        const data = await fetcher()
        if (cancel.current) {
          return
        }
        setState({
          loading: false,
          data: data,
        })
      } catch (error) {
        if (cancel.current) {
          return
        }
        setState({
          loading: false,
          error: error as Error,
        })
      }
    }
    runFetcher()
    return () => {
      // set this to true when the component unmounts to prevent any further
      // state updates triggered by requests finishing
      cancel.current = true
    }
  }, [fetcher])

  return state
}

function Spinner() {
  return (
    <div className="lds-ring">
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  )
}

interface LoaderProps<T> {
  fetcher: () => Promise<T>
  render: (data: T) => JSX.Element
}

// Loader will attempt to fetch some data using the fetcher method
// and pass it to the render prop component. While fetching the data
// it will display a loading spinner.
export function Loader<T>({ fetcher, render }: LoaderProps<T>) {
  const { loading, error, data } = useFetch<T>(fetcher);

  if (error) {
    return (
      <div>Error: {error.message}</div>
    )
  }
  if (loading) {
    return (
      <div className="loading">
        <Spinner />
      </div>
    )
  }
  if (!data) {
    return null
  }

  return render(data)
}
