import TestComponent from '../components/TestComponent.svelte';
import { mount } from 'svelte';

const app = mount(TestComponent, {
  target: document.body
});

export default app; 