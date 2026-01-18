import { defineStore } from 'pinia';

export const useMenuStore = defineStore('menu', {
    state: () => ({
        menuList: [],
        editItem: null,
        showModal: false,
        storegeKey: 'menuList',
    }),
    actions: {
        loadFromStorage() {
            const data = localStorage.getItem(this.storegeKey);
            this.menuList = data ? JSON.parse(data) : [];
        },
        saveToStorage() {
            localStorage.setItem(this.storegeKey, JSON.stringify(this.menuList));
        },
        setMenuList(list) {
            this.menuList = list;
            this.saveToStorage();
        },
        addMenuItem(item) {
            this.menuList.push(item);
            this.saveToStorage();
        },
        removeItem(item) {
            const idx = this.menuList.indexOf(item);
            if (idx > -1) {
                this.menuList.splice(idx, 1);
                this.saveToStorage();
            }
        },
        editMenuItem(item) {
            const idx = this.menuList.indexOf(item);
            this.editItem = {
                index: idx,
                item: item,
                cache: { ...item },
            };
        },
        toggleModal() {
            this.showModal = !this.showModal;
        },
    },
});
