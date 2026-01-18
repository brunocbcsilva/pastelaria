import { mount } from '@vue/test-utils';
import { describe, it, expect, beforeEach } from 'vitest';
import FormPedidos from '../src/components/FormPedidos.vue';
import { createPinia, setActivePinia } from 'pinia';

describe('FormPedidos.vue', () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  it('deve validar campos obrigatórios', async () => {
    const wrapper = mount(FormPedidos);
    await wrapper.find('.cadastra').trigger('click');
    expect(wrapper.vm.form.title).toBe('');
    expect(wrapper.vm.form.taste).toBe('');
    expect(wrapper.vm.form.amount).toBe(0);
  });

  it('deve permitir cadastro com dados válidos', async () => {
    const wrapper = mount(FormPedidos);
    await wrapper.find('[data-testid="input-title"]').setValue('Pastel de Carne');
    await wrapper.find('[data-testid="input-taste"]').setValue('Carne');
    await wrapper.find('[data-testid="input-amount"]').setValue(10);
    await wrapper.find('.cadastra').trigger('click');
    expect(wrapper.vm.form.title).toBe(''); // formulário limpo após envio
  });
});
