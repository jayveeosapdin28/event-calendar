

require('./bootstrap');
import { createApp} from  'vue'
import VueAxios from 'vue-axios'
import store from "./Store";

import Calendar from "./Pages/Calendar";


createApp(Calendar)
    .use(store)
    .mount("#app");
