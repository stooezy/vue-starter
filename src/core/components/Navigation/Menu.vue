<script lang="ts" setup>
import type { IAppMenu } from '~/models'

const { menu } = defineProps<{
  menu: IAppMenu
}>()
</script>

<template>
  <span
    v-if="menu.isActive"
    class="absolute inset-y-0 left-0 w-1 bg-purple-600 rounded-tr-lg rounded-br-lg"
    aria-hidden="true"
  />
  <router-link
    :class="`inline-flex items-center w-full text-sm font-semibold ${menu.isActive ? 'text-gray-800 dark:text-gray-100' : ''} transition-colors duration-150 hover:text-gray-800 dark:hover:text-gray-200`"
    :to="menu.to"
  >
    <svg
      v-if="menu.icon == 'home'"
      class="w-5 h-5"
      aria-hidden="true"
      fill="none"
      stroke-linecap="round"
      stroke-linejoin="round"
      stroke-width="2"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
      />
    </svg>
    <svg
      v-if="menu.icon == 'users'"
      id="SvgjsSvg1014" width="20" height="20" xmlns="http://www.w3.org/2000/svg" version="1.1"
      xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:svgjs="http://svgjs.com/svgjs"
    ><defs id="SvgjsDefs1015" /><g id="SvgjsG1016"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 20">
      <g fill="none" fill-rule="evenodd" stroke="#ffffff" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" transform="translate(1 1)" class="colorStroke000 svgStroke"><path d="M16 18v-2a4 4 0 0 0-4-4H4a4 4 0 0 0-4 4v2" fill="#ffffff" class="color000 svgShape" /><circle cx="8" cy="4" r="4" fill="#ffffff" class="color000 svgShape" /><path d="M22 18v-2a4 4 0 00-3-3.87M15 .13a4 4 0 010 7.75" fill="#ffffff" class="color000 svgShape" /></g></svg></g></svg>
    <span class="ml-4">{{ menu.label }}</span>
  </router-link>
</template>
