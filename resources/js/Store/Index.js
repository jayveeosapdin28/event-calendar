import { createStore } from 'vuex'

import CalendarIndex from './Modules/Calendar/Index'
import CalendarSingle from './Modules/Calendar/Single'

const store = createStore({
    modules: {
        CalendarIndex,
        CalendarSingle
    }
})

export default store;
