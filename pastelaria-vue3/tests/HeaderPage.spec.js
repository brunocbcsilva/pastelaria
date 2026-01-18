import { mount } from '@vue/test-utils';
import { describe, it, expect } from 'vitest';
import HeaderPage from '../src/components/HeaderPage.vue';

describe('HeaderPage.vue', () => {
  it('deve exibir o cabeçalho', () => {
    const wrapper = mount(HeaderPage);
    expect(wrapper.find('#header-page').exists()).toBe(true);
  });
});
