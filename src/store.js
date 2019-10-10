/* eslint-disable */
import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        storegeDisk: window.localStorage,
        storegeKey: 'menuList',
        menuList: [],
        editItem: null,
        showModal: false
    },
    mutations: {
        SET_MENU_LIST(state, payload) {
            state.menuList = payload.list;
        },
        ADD_MENU_LIST(state, payload) {
            state.menuList.push(payload.list);
        },
        REMOVE_ITEM(state, payload) {
            let index = state.menuList.indexOf(payload.item);
            state.menuList.splice(index, 1);
        },
        EDIT_ITEM(state, payload) {
            let index = state.menuList.indexOf(payload.item);

            state.editItem = {
                index: index,
                item: payload.item,
                cache: payload.item
            }
        },
        SHOW_MODAL(state) {
            state.showModal = !state.showModal;
        }
    },
    actions: {
        async storageFetch({state}) {
            return await JSON.parse(state.storegeDisk.getItem(state.storegeKey));
        },
        storageSave({state}, payload) {
            state.storegeDisk.setItem(state.storegeKey, JSON.stringify(payload.obj));
        },
        async createItem({state, commit, dispatch}) {
            console.log("createItem()");
            if (!Array.isArray(state.menuList))
                return false;

            dispatch('storageSave', {
                obj: state.menuList
            });

            return true;
        },
    }
});
