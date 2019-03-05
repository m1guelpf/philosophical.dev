<template>
   <div class="post-meta">
      <template v-if="post.readingTime">
        <strong>{{ post.readingTime }}</strong>
      </template>
    </div>
</template>

<script>
export default {
  props: ['post']
}
</script>

<style lang="scss">
.post-meta {
  font-size: .8em;
  opacity: .8;
}
</style>