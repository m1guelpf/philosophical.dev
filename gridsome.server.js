// Server API makes it possible to hook into various parts of Gridsome
// on server-side and add custom data to the GraphQL data layer.
// Learn more: https://gridsome.org/docs/server-api

// Changes here requires a server restart.
// To restart press CTRL + C in terminal and run `gridsome develop`
const config = require('./gridsome.config');

const GhostContentAPI = require('@tryghost/content-api')
const { readingTime } = require('@tryghost/helpers')


module.exports = function (api) {
  api.loadSource(async store => {
    store.addMetaData('siteDescription', config.siteDescription)
    store.addMetaData('author', config.author)
  })

  api.loadSource(async store => {
    const api = new GhostContentAPI(config.ghost);

    const posts = store.addContentType({
      typeName: 'Post',
      route: '/:slug',
    })
    
    const tagStore = store.addContentType({
      typeName: 'Tag',
      route: '/tag/:slug'
    })

    const lists = ['meta', 'og', 'twitter', 'tags']

    lists.forEach(item => {
      posts.addSchemaField(item, ({ graphql }) => ({
        type: graphql.GraphQLJSON,
        resolve(node) {
          return node.fields[item]
        }
      }))
    })

    const strings = ['coverImage', 'template']

    strings.forEach(item => {
      posts.addSchemaField(item, ({ graphql }) => ({
        type: graphql.GraphQLString,
        resolve(node) {
          return node.fields[item]
        }
      }))
    })

    posts.addSchemaField('readingTime', ({ graphql }) => ({
      type: graphql.GraphQLJSON,
      resolve(node) {
        return readingTime({html: node.content, feature_image: node.fields.coverImage})
      }
    }))

    tagStore.addSchemaField('posts', ({ graphql }) => ({
      type: graphql.GraphQLJSON,
      resolve(node) {
        return node.fields.posts
      }
    }))
    let articles = await api.posts.browse({limit: 'all', include: 'tags,authors'})
    
    articles = articles.filter(post => {
        return post.tags.map(tag => {
          return tag.name
        }).includes('#philosophy')
    })

    articles.forEach(post => {
      posts.addNode({
        title: post.title,
        id: post.id,
        slug: post.slug,
        date: post.published_at,
        content: post.html,
        excerpt: post.excerpt,
        fields: {
          tags: post.tags.filter(tag => {
            return ! tag.name.startsWith('#')
          }).map(tag => {
            return {
              title: tag.name,
              id: tag.id,
              slug: tag.slug,
              content: tag.description,
              path: '/tag/' + tag.slug
            }
          }),
          coverImage: post.feature_image,
          meta: {
            title: post.meta_title,
            description: post.meta_description,
          },
          inject: {
            head: post.codeinjection_head,
            footer: post.codeinjection_foot,
          },
          og: {
            title: post.og_title,
            description: post.og_description,
            image: post.og_image,
          },
          twitter: {
            title: post.twitter_title,
            description: post.twitter_description,
            image: post.twitter_image,
          },
          template: post.custom_template
        }
      })

      api.tags.browse({limit: 'all', include: 'posts,authors'}).then(tags => {
      tags.forEach(tag => {
        tagStore.addNode({
          title: tag.name,
          id: tag.id,
          slug: tag.slug,
          content: tag.description,
          fields: {
            posts: articles.filter(article => {
              return article.tags.map(postTag => {
                return postTag.slug
              }).includes(tag.slug)
            }).map(post => ({
              title: post.title,
              id: post.id,
              slug: post.slug,
              date: post.published_at,
              excerpt: post.excerpt,
              path: `/${post.slug}`,
              tags: post.tags.filter(tag => {
                return !tag.name.startsWith('#')
              }).map(tag => {
                return {
                  title: tag.name,
                  id: tag.id,
                  slug: tag.slug,
                  content: tag.description,
                  path: '/tag/' + tag.slug
                }
              }),
              coverImage: post.feature_image,
              template: post.custom_template
            }))
          }
        })
      })
    })
    })
  })
}