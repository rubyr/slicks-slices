import dotenv from 'dotenv';

dotenv.config({
  path: '.env',
});

export default {
  siteMetadata: {
    title: "Slick's Slices",
    siteUrl: 'https://www.slick.pizza',
    description: 'The best pizza',
    twitter: '@slicksSlices',
  },
  plugins: [
    'gatsby-plugin-styled-components',
    'gatsby-plugin-react-helmet',
    {
      resolve: 'gatsby-source-sanity',
      options: {
        projectId: 'bdqv34nb',
        dataset: 'production',
        watchMode: true,
        token: process.env.SANITY_TOKEN,
      },
    },
  ],
};
