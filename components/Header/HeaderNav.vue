<script setup lang="ts">
import {
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuRoot,
  NavigationMenuViewport,
} from "radix-vue";
import NavigationMenuLink from "./NavigationMenuLink.vue";
</script>

<template>
  <NavigationMenuRoot>
    <NavigationMenuList class="flex h-full items-center gap-x-10">
      <NavigationMenuItem>
        <NavigationMenuLink href="/admin"> Admin </NavigationMenuLink>
      </NavigationMenuItem>

      <NavigationMenuItem>
        <NavigationMenuLink href="/rear"> Rear </NavigationMenuLink>
      </NavigationMenuItem>

      <NavigationMenuIndicator
        class="data-[state=visible]:animate-fadeIn data-[state=hidden]:animate-fadeOut top-full z-[1] flex h-[10px] items-end justify-center overflow-hidden transition-[all,transform_250ms_ease] duration-200 data-[state=hidden]:opacity-0"
      >
        <div
          class="relative top-[70%] h-[10px] w-[10px] rotate-[45deg] rounded-tl-[2px] bg-white"
        />
      </NavigationMenuIndicator>
    </NavigationMenuList>

    <div
      class="perspective-[2000px] absolute left-0 top-full flex w-full justify-center"
    >
      <NavigationMenuViewport
        class="data-[state=open]:animate-scaleIn data-[state=closed]:animate-scaleOut relative mt-[10px] h-[var(--radix-navigation-menu-viewport-height)] w-full origin-[top_center] overflow-hidden rounded-[10px] bg-white transition-[width,_height] duration-300 sm:w-[var(--radix-navigation-menu-viewport-width)]"
      />
    </div>
  </NavigationMenuRoot>
</template>
