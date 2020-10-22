import { useEffect, useState } from 'react';

const gql = String.raw;
const info = `
  name
  _id
  image {
    asset {
      url
      metadata {
        lqip
      }
    }
  }
`;

const useLatestData = () => {
  const [hotSlices, setHotSlices] = useState();
  const [sliceMasters, setSliceMasters] = useState();

  useEffect(() => {
    fetch(process.env.GATSBY_GRAPHQL_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: gql`
          query {
            StoreSettings(id: "downtown") {
              name
              slicemaster {
                ${info}
              }
              hotSlices {
                ${info}
              }
            }
          }
        `,
      }),
    })
      .then((r) => r.json())
      .then((res) => {
        setHotSlices(res.data.StoreSettings.hotSlices);
        setSliceMasters(res.data.StoreSettings.slicemaster);
      })
      .catch(console.error);
  }, []);
  return {
    hotSlices,
    sliceMasters,
  };
};

export default useLatestData;
