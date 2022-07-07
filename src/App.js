import ReactPixel from 'react-facebook-pixel'
import TagManager from 'react-gtm-module'
import { hot } from 'react-hot-loader/root'
import { ThemeProvider } from 'styled-components'
import { hotjar } from 'react-hotjar'

import { AppRoutes } from './routes'
import { GlobalStyle } from './themes/GlobalStyle'
import { theme } from './themes/theme'

import { SearchDataProvider } from './context/SearchDataContext'

hotjar.initialize(process.env.HOTJAR_HJID, process.env.HOTJAR_HJSV)
hotjar.identify(process.env.HOTJAR_USER_ID, { userProperty: 'value' })
hotjar.event('button-click')
hotjar.stateChange('/')

const tagManagerArgs = {
  gtmId: process.env.GTM_ID,
}

TagManager.initialize(tagManagerArgs)

const options = {
  autoConfig: true,
  debug: true,
}

ReactPixel.init(process.env.PIXEL_ID, undefined, options)
ReactPixel.pageView()
ReactPixel.track('ViewContent')

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <SearchDataProvider>
        <GlobalStyle />
        <AppRoutes />
      </SearchDataProvider>
    </ThemeProvider>
  )
}

export default hot(App)
