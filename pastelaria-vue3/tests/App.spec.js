import { mount } from '@vue/test-utils';
import { describe, it, expect, beforeEach } from 'vitest';
import App from '../src/App.vue';
import HeaderPage from '../src/components/HeaderPage.vue';
import FormPedidos from '../src/components/FormPedidos.vue';
import MediaList from '../src/components/MediaList.vue';
import Modal from '../src/components/Modal.vue';
import Inputs from '../src/components/Inputs.vue';
import { createPinia, setActivePinia } from 'pinia';

describe('App.vue', () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  it('deve renderizar o cabeçalho', () => {
    const wrapper = mount(HeaderPage);
    expect(wrapper.find('#header-page').exists()).toBe(true);
  });

  it('deve renderizar o formulário de pedidos', () => {
    const wrapper = mount(FormPedidos);
    expect(wrapper.find('form').exists() || wrapper.find('.card').exists()).toBe(true);
  });

  it('deve renderizar a lista de produtos', () => {
    const wrapper = mount(MediaList, {
      props: { list: [{ title: 'Teste', taste: 'Carne', amount: 10, drink: false }] }
    });
    expect(wrapper.find('.media').exists()).toBe(true);
  });

  it('deve renderizar o modal', () => {
    const wrapper = mount(Modal);
    expect(wrapper.find('.modal-mask').exists()).toBe(true);
  });

  it('deve renderizar o input customizado', () => {
    const wrapper = mount(Inputs, {
      props: { label: 'Teste', index: 'test', value: '' }
    });
    expect(wrapper.find('input').exists()).toBe(true);
  });
});
