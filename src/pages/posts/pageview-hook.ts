import { useState } from 'react'
import IPost from '~/interfaces/post-interface'
import { createPageViewAction } from '~/store/posts/create-pageview-action'
import { useAppDispatch } from '~/store/store-config'

const usePageView = () => {
  const dispatch = useAppDispatch()

  const [pageViewState, setPageViewState] = useState(true)
  const pageView = (post: IPost) => {
    if (pageViewState) {
      setPageViewState(false)
      dispatch(createPageViewAction(post))
    }
  }

  return pageView
}

export default usePageView
