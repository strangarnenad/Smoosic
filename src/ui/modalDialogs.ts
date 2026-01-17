import { replaceVueRoot } from './common';
import { createApp } from 'vue';
import { default as someApp } from './components/modalSplash.vue';
import { SuiNavigation } from './navigation';

declare var $: any;

export const createModalSplash = (timer: number) => {
  const element = `#bug-modal`;
  const root = replaceVueRoot(element);
  const close = () => {
    SuiNavigation.instance.hideBugModal();
  }
  const app = createApp(someApp as any, { closeFunction: close, timer });
  app.mount('#' + root);
  SuiNavigation.instance.showBugModal();
  return app;
}

