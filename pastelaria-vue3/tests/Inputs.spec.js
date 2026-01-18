import { mount } from '@vue/test-utils';
import { describe, it, expect } from 'vitest';
import Inputs from '../src/components/Inputs.vue';

describe('Inputs.vue', () => {
  it('deve exibir o input', () => {
    const wrapper = mount(Inputs, {
      props: { label: 'Teste', index: 'test', value: '' }
    });
    expect(wrapper.find('input').exists()).toBe(true);
  });
});
