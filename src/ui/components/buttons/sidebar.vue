<script setup lang="ts">
import { ref } from 'vue';
import { ButtonDefinition } from '../../buttons/button';
import buttonComp  from './sidebarButtons.vue';
interface Props {
  domId: string,
  buttonProps: ButtonDefinition[]
}
const props = defineProps < Props > ();
const buttonProps = props.buttonProps;
const domId = props.domId;
const getId = (str: string) => `${domId}-${str}`;
const getClasses = (btnProps: ButtonDefinition) => `${btnProps.icon} ${btnProps.classes}`;
const imageLoc = '../../../styles/images/logo.png';
</script>
<template>
   <div class="side-brand">
     <img :src="imageLoc" width="24" height="24">
     <span>Smoosic</span>
  </div>
  <div class="side-group" role="group" :id="domId">
    <buttonComp v-for="props in buttonProps" :buttonProps="props" :domId="getId(props.id)" :key="props.id">
    </buttonComp>
  </div>
</template>