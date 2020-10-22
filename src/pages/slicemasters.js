import { graphql, Link } from 'gatsby';
import React from 'react';
import Img from 'gatsby-image';
import styled from 'styled-components';
import Pagination from '../components/Pagination';
import SEO from '../components/SEO';

const SliceMasterGrid = styled.div`
  display: grid;
  grid-gap: 2rem;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
`;

const SliceMasterStyles = styled.div`
  a {
    text-decoration: none;
  }
  .gatsby-image-wrapper {
    height: 400px;
  }
  h2 {
    transform: rotate(-2deg);
    text-align: center;
    font-size: 4rem;
    margin-bottom: -2rem;
    position: relative;
    z-index: 2;
  }
  .description {
    background: var(--yellow);
    padding: 1rem;
    margin: 2rem;
    margin-top: -6rem;
    z-index: 2;
    position: relative;
    transform: rotate(1deg);
    text-align: center;
  }
`;

const SliceMasters = ({ data: { slicemasters }, pageContext }) => (
  <>
    <SEO title={`Slicemasters - Page ${pageContext.currentPage || 1}`} />
    <Pagination
      pageSize={parseInt(process.env.GATSBY_PAGE_SIZE)}
      totalCount={slicemasters.totalCount}
      currentPage={pageContext.currentPage || 1}
      skip={pageContext.skip}
      base="slicemasters"
    />
    <SliceMasterGrid>
      {slicemasters.nodes.map((person) => (
        <SliceMasterStyles>
          <Link to={`/slicemaster/${person.slug.current}`}>
            <h2>
              <span className="mark">{person.name}</span>
            </h2>
          </Link>
          <Img fluid={person.image.asset.fluid} />
          <p className="description">{person.description}</p>
        </SliceMasterStyles>
      ))}
    </SliceMasterGrid>
  </>
);

export default SliceMasters;

export const query = graphql`
  query($skip: Int = 0, $pageSize: Int = 3) {
    slicemasters: allSanityPerson(skip: $skip, limit: $pageSize) {
      totalCount
      nodes {
        name
        id
        slug {
          current
        }
        description
        image {
          asset {
            fluid(maxWidth: 410) {
              ...GatsbySanityImageFluid
            }
          }
        }
      }
    }
  }
`;
