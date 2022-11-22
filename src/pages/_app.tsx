import 'antd/dist/antd.css'
import axios from 'axios'
import type { AppProps } from 'next/app'
import { Provider } from 'react-redux'
import store from '~/store/store-config'
import '../styles/globals.css'

export default function App({ Component, pageProps }: AppProps) {
  axios.defaults.baseURL = process.env.NEXT_PUBLIC_NEXT_API_BASE_URL
  axios.defaults.headers.common['Access-Control-Allow-Headers'] = 'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*'
  axios.defaults.headers.common['Authorization'] = 'AUTH TOKEN'
  axios.defaults.headers.post['Content-Type'] = 'application/json'

  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  )
}
