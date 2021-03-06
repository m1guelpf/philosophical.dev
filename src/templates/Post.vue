<template>
  <Layout>
    <div class="post-title">
      <h1 class="post-title__text">
        {{ $page.post.title }}
      </h1>
      
      <PostMeta :post="$page.post" />

    </div>
    
    <div class="post content-box">
      <div class="post__header">
        <g-image alt="Cover image" v-if="$page.post.coverImage" :src="$page.post.coverImage" />
      </div>

      <div class="post__content" v-html="$page.post.content" />

      <div class="post__footer">
        <PostTags :post="$page.post" />
      </div>
    </div>

    <div class="post-comments">
      <!-- Add comment widgets here -->
    </div>

    <Author class="post-author" showTitle="true" />
  </Layout>
</template>

<script>
import PostMeta from '~/components/PostMeta'
import PostTags from '~/components/PostTags'
import Author from '~/components/Author.vue'

export default {
  components: {
    Author,
    PostMeta,
    PostTags
  },
  mounted() {
    var links = document.links;

    for (var i = 0, linksLength = links.length; i < linksLength; i++) {
      if (links[i].hostname != window.location.hostname) {
        links[i].target = '_blank';
        links[i].rel = 'noopener noreferer'
      }
    }
  },
  metaInfo () {
    return {
      title: this.$page.post.title,
      meta: [
        {
          key: 'description',
          name: 'description',
          content: this.$page.post.meta.description !== null ? this.$page.post.meta.description : this.$page.post.description
        },
        {
          key: 'title',
          name: 'title',
          content: this.$page.post.meta.title !== null ? this.$page.post.meta.title : this.$page.post.title
        },
        {
          key: 'og:title',
          name: 'og:title',
          content: this.$page.post.og.title !== null ? this.$page.post.og.title : this.$page.post.title
        },
        {
          key: 'og:description',
          name: 'og:description',
          content: this.$page.post.og.description !== null ? this.$page.post.og.description : this.$page.post.description
        },
        {
          key: 'og:image',
          name: 'og:image',
          content: this.$page.post.og.image !== null ? this.$page.post.og.image : this.$page.post.coverImage
        },
        {
          key: 'twitter:title',
          name: 'twitter:title',
          content: this.$page.post.twitter.title !== null ? this.$page.post.twitter.title : this.$page.post.title
        },
        {
          key: 'twitter:description',
          name: 'twitter:description',
          content: this.$page.post.twitter.description !== null ? this.$page.post.twitter.description : this.$page.post.description
        },
        {
          key: 'twitter:image',
          name: 'twitter:image',
          content: this.$page.post.twitter.image !== null ? this.$page.post.twitter.image : this.$page.post.coverImage
        },
      ]
    }
  }
}
</script>

<page-query>
query Post ($path: String!) {
  post: post (path: $path) {
    title
    path
    date (format: "D. MMMM YYYY")
    tags
    excerpt
    content
    coverImage
    readingTime
    meta
    og
    twitter
  }
}
</page-query>

<style lang="scss">
.post-title {
  padding: calc(var(--space) / 2) 0 calc(var(--space) / 2);
  text-align: center;
}

.post {

  &__header {
    width: calc(100% + var(--space) * 2);
    margin-left: calc(var(--space) * -1);
    margin-top: calc(var(--space) * -1);
    margin-bottom: calc(var(--space) / 2);
    overflow: hidden;
    border-radius: var(--radius) var(--radius) 0 0;
    
    img {
      width: 100%;
    }

    &:empty {
      display: none;
    }
  }

  &__content {
    h2:first-child {
      margin-top: 0;
    }

    p:first-of-type {
      font-size: 1.2em;
      color: var(--title-color);
    }

    img {
      width: calc(100% + var(--space) * 2);
      margin-left: calc(var(--space) * -1);
      display: block;
      max-width: none;
    }
  }
}

.post-comments {
  padding: calc(var(--space) / 2);
  
  &:empty {
    display: none;
  }
}

.post-author {
  margin-top: calc(var(--space) / 2);
}
</style>