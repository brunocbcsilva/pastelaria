/* eslint-disable */
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
            state.menuList.unshift(payload.list);
        }
    },
    actions: {
        async storageFetch({state}) {
            return await JSON.parse(state.storegeDisk.getItem(state.storegeKey));
        },
        async storageSave({state}, payload) {
            await state.storegeDisk.setItem(state.storegeKey, JSON.stringify(payload.obj));
        },
        async initMenu ({state, commit, dispatch}) {
            console.log("initMenu()");
            const menuList = await dispatch('storageFetch');
            if(! menuList) {
                dispatch('storageSave', {
                    obj: []
                });
                return true;
            } else if(Array.isArray(menuList)) {
                commit('SET_MENU_LIST', {
                    list: menuList
                })
                return true;
            } else {
                return false;
            }
        },
        async createItem ({state, commit, dispatch}, payload) {
            console.log("createItem()");
            let menuList = await dispatch('storageFetch');

            if(Array.isArray(menuList)) {
                menuList.push(payload.item);
                await dispatch('storageSave', {
                    obj: menuList
                });
                commit('ADD_MENU_LIST', {
                    list: payload.item
                });

                return true;
            }
            return;
        }
    }
});
