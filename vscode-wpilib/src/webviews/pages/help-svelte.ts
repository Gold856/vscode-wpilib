import HelpComponent from '../components/HelpComponent.svelte';
import { mount } from 'svelte';

const app = mount(HelpComponent, {
  target: document.body
});

export default app; 