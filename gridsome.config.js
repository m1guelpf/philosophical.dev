// This is where project configuration and plugin options are located. 
// Learn more: https://gridsome.org/docs/config

// Changes here requires a server restart.
// To restart press CTRL + C in terminal and run `gridsome develop`

module.exports = {
  siteName: 'Philosophical Dev',
  siteDescription: 'Philosophical ramblings & resources from a random teenager on the internet.',

  author: {
    name: 'Miguel Piedrafita',
    description: '16-year-old maker',
  },

  ghost: {
    url: process.env.GHOST_URL,
    key: process.env.GHOST_KEY,
    version: 'v2'
  },

  plugins: [
    // {
    //   // Create posts from markdown files
    //   use: '@gridsome/source-filesystem',
    //   options: {
    //     typeName: 'LocalPost',
    //     path: 'content/posts/*.md',
    //     route: '/local/:slug',
    //     refs: {
    //       // Creates a GraphQL collection from 'tags' in front-matter and adds a reference.
    //       tags: {
    //         typeName: 'Tag',
    //         route: '/local/tag/:id',
    //         create: true
    //       }
    //     }
    //   }
    // }
  ],
}