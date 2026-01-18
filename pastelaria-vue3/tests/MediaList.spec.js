import { mount } from '@vue/test-utils';
import { describe, it, expect, beforeEach } from 'vitest';
import MediaList from '../src/components/MediaList.vue';
import { createPinia, setActivePinia } from 'pinia';

describe('MediaList.vue', () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  it('deve exibir item na lista', () => {
    const list = [{ title: 'Pastel', taste: 'Carne', amount: 10, drink: false }];
    const wrapper = mount(MediaList, { props: { list } });
    expect(wrapper.find('.media').exists()).toBe(true);
  });

  it('deve remover item da lista', async () => {
    const list = [{ title: 'Pastel', taste: 'Carne', amount: 10, drink: false }];
    const wrapper = mount(MediaList, { props: { list } });
    await wrapper.find('.button_remove').trigger('click');
    expect(wrapper.emitted()).toBeTruthy();
  });
});
