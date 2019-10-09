import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        storegeDisk: window.localStorage,
        storegeKey: 'menuList',
        menuList: []
    },
    mutations: {
        SET_MENU_LIST (state, payload) {
            state.menuList = payload.list;
        },
        ADD_MENU_LIST (state, payload) {
            state.menuList.push(payload.list);
        }
    },
    actions: {
        initMenu ({state, commit}) {
            console.log("initMenu()");
            if(!state.storegeDisk.getItem(state.storegeKey)) {
                state.storegeDisk.setItem(state.storegeKey, "[]");
                return
            }

            const menuList = JSON.parse(state.storegeDisk.getItem(state.storegeKey))

            if (menuList.length > 0) {
                commit('SET_MENU_LIST', {
                    list: menuList
                })
            }
        },

        createItem ({state, commit}, payload) {
            console.log("createItem()");
            let menuList = JSON.parse(state.storegeDisk.getItem(state.storegeKey));

            if(Array.isArray(menuList)) {
                menuList.push(payload.item);
                state.storegeDisk.setItem(state.storegeKey, JSON.stringify(menuList));
                commit('ADD_MENU_LIST', {
                    list: menuList
                });

                return true;
            }

            return;
        }
    }
});
