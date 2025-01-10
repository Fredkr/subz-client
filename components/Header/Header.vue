<template>
  <AsideLayout
    layout-class="min-h-[--header-height]"
    aside-class="h-full"
    content-class="h-full"
  >
    <template #aside>
      <div class="border-b-2 border-main h-full p-5">test</div>
    </template>

    <template #content>
      <div
        class="border-b-2 border-mainDark h-full p-5 flex justify-end items-end"
      >
        <HeaderNav />
      </div>
    </template>
  </AsideLayout>
</template>
