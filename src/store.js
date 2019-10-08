import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        storegeKey: 'menuItens',
        menuItens: []
    },
    mutations: {
        SET_MENU_ITEM(stage, {menuItens}) {
            stage.menuItens = JSON.stringify(menuItens);
        },
        ADD_MENU_ITENS(stage, payload) {
          stage.menuItens.push(payload.form)
        }
    },
    actions: {
        initMenu({commit, state}) {
            const STOREGE_KEY = state.storegeKey;
            const APP_STORAGE = window.localStorage;
            const GET_MENU = APP_STORAGE.getItem(STOREGE_KEY);

            if (GET_MENU) {
                commit('SET_MENU_ITEM', {menuItens: GET_MENU})
            } else {
                APP_STORAGE.setItem(STOREGE_KEY, "[]");
            }
        },
        addStorage({commit, state}, {form}) {
            let local = window.localStorage;
            let getStorage = local.getItem(state.storegeKey);
            let itens = JSON.parse(getStorage);

            itens.push(form);
            local.setItem(state.storegeKey, JSON.stringify(itens))

            commit('ADD_MENU_ITENS', { form: form })
        }
    }
});
