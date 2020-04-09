<template>
  <div class="screen">
    <nuxt />
  </div>
</template>

<style>
@import '../assets/styles/variables.css';

html {
  font-family: 'Source Sans Pro', -apple-system, BlinkMacSystemFont, 'Segoe UI',
    Roboto, 'Helvetica Neue', Arial, sans-serif;
  font-size: 16px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
}

*,
*:before,
*:after {
  box-sizing: border-box;
  margin: 0;
}

.screen {
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  padding: 2vh 0;
  justify-content: center;
}

.divider {
  height: 1px;
  width: 100%;
  background-color: var(--color-gallery);
}
</style>
