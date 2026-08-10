const isLocalDesignPreview = process.env.LOCAL_DESIGN_PREVIEW === `1`

const nativeImagePlugins = isLocalDesignPreview
  ? []
  : [
      `gatsby-transformer-sharp`,
      `gatsby-plugin-sharp`,
      {
        resolve: `gatsby-plugin-manifest`,
        options: {
          name: `gatsby-starter-default`,
          short_name: `starter`,
          start_url: `/`,
          background_color: `#663399`,
          theme_color: `#663399`,
          display: `minimal-ui`,
          icon: `src/images/icon_512.png`, // This path is relative to the root of the site.
        },
      },
      `gatsby-plugin-sass`,
    ]

module.exports = {
  siteMetadata: {
    title: `【公式】ラムダ技術部`,
    description: `yoidea-portfolio`,
    author: `@yoidea`,
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    ...nativeImagePlugins,
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // 'gatsby-plugin-offline',
  ],
}
