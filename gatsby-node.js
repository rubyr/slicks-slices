import path from 'path';
import fetch from 'isomorphic-fetch';

const turnPizzasIntoPages = async ({ graphql, actions }) => {
  const pizzaTemplate = path.resolve('./src/templates/Pizza.js');
  const { data } = await graphql(`
    query {
      pizzas: allSanityPizza {
        nodes {
          name
          slug {
            current
          }
        }
      }
    }
  `);
  data.pizzas.nodes.forEach((pizza) => {
    console.log(`creating page for ${pizza.name}`);
    actions.createPage({
      path: `/pizza/${pizza.slug.current}`,
      component: pizzaTemplate,
      context: {
        slug: pizza.slug.current,
      },
    });
  });
};

const turnToppingsIntoPages = async ({ graphql, actions }) => {
  const toppingTemplate = path.resolve('./src/pages/pizzas.js');
  const { data } = await graphql(`
    query {
      toppings: allSanityTopping {
        nodes {
          name
          id
        }
      }
    }
  `);
  data.toppings.nodes.forEach((topping) => {
    console.log(`creating page for ${topping.name}`);
    actions.createPage({
      path: `/topping/${topping.name}`,
      component: toppingTemplate,
      context: {
        topping: topping.name,
      },
    });
  });
};

const fetchBeersAndTurnIntoNodes = async ({
  actions,
  createNodeId,
  createContentDigest,
}) => {
  const beers = await fetch('https://sampleapis.com/beers/api/ale').then((r) =>
    r.json()
  );
  beers.forEach((beer) => {
    const nodeMeta = {
      id: createNodeId(`beer-${beer.name}`),
      parent: null,
      children: [],
      internal: {
        type: 'Beer',
        mediaType: 'application/json',
        contentDigest: createContentDigest(beer),
      },
    };
    actions.createNode({
      ...beer,
      ...nodeMeta,
    });
  });
};

const turnSliceMastersIntoPages = async ({ graphql, actions }) => {
  const { data } = await graphql(`
    query {
      sliceMasters: allSanityPerson {
        totalCount
        nodes {
          name
          id
          slug {
            current
          }
        }
      }
    }
  `);

  data.sliceMasters.nodes.forEach((sliceMaster) => {
    actions.createPage({
      path: `/slicemaster/${sliceMaster.slug.current}`,
      component: path.resolve('./src/templates/SliceMaster.js'),
      context: {
        slug: sliceMaster.slug.current,
      },
    });
  });

  const pageSize = parseInt(process.env.GATSBY_PAGE_SIZE);
  const pageCount = Math.ceil(data.sliceMasters.totalCount / pageSize);
  Array.from({ length: pageCount }).forEach((_, i) => {
    console.log(`Creating SliceMaster page ${i}`);
    actions.createPage({
      path: `/slicemasters/${i + 1}`,
      component: path.resolve('./src/pages/slicemasters.js'),
      context: {
        skip: i * pageSize,
        currentPage: i + 1,
        pageSize,
      },
    });
  });
};

export const sourceNodes = async (params) => {
  await Promise.all([fetchBeersAndTurnIntoNodes(params)]);
};

export const createPages = async (params) => {
  await Promise.all([
    turnPizzasIntoPages(params),
    turnToppingsIntoPages(params),
    turnSliceMastersIntoPages(params),
  ]);
};
