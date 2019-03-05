import firebase from "nativescript-plugin-firebase";
import config from "./shared/firebase-config";

import Vue from "nativescript-vue";

import RadListView from "nativescript-ui-listview/vue";

Vue.use(RadListView);

Vue.config.silent = (TNS_ENV === 'production');
import Home from './components/Home.vue';

new Vue({

    template: `
        <Frame>
            <Home  />
        </Frame>`,

    components: {
      Home
    },

    data: {
        cars: []
    },

    created() {
        firebase.init(config).then(
            instance => {
                console.log("firebase.init done");
                // cars.load().then((data) => {
                //     this.cars = Object.values(data);
                // })
            },
            error => {
                console.log(`firebase.init error: ${error}`);
            }
        );
    }
}).$start();
