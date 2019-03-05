<template>
  <Layout :show-logo="false">
    <!-- Author intro -->
    <Header :show-title="true" />
    
    <!-- List posts -->
    <div class="posts">
      <PostCard v-for="edge in $page.posts.edges" :key="edge.node.id" :post="edge.node"/>
    </div>

  </Layout>
</template>

<page-query>
{
  posts: allPost {
    edges {
      node {
        id
        title
        path
        tags
        date (format: "D. MMMM YYYY")
        excerpt,
        coverImage,
        readingTime
      }
    }
  }
}
</page-query>

<script>
import Header from '~/components/Header.vue'
import PostCard from '~/components/PostCard.vue'

export default {
  components: {
    Header,
    PostCard
  },
  metaInfo: {
    titleTemplate: '%s'
  }
}
</script>
