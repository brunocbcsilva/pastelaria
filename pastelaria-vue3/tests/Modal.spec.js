import { mount } from '@vue/test-utils';
import { describe, it, expect } from 'vitest';
import Modal from '../src/components/Modal.vue';

describe('Modal.vue', () => {
  it('deve exibir o modal', () => {
    const wrapper = mount(Modal);
    expect(wrapper.find('.modal-mask').exists()).toBe(true);
  });
});
