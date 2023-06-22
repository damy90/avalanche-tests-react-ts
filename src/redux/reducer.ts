import { combineReducers } from 'redux'

import authReducer from './features/auth/authApiSlice'
import testsReducer from './features/tests-api-slice'

const rootReducer = combineReducers({
  auth: authReducer,
  tests: testsReducer,
})

export default rootReducer