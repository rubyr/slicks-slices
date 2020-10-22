import React from 'react';
import ItemGrid from '../components/ItemGrid';
import LoadingGrid from '../components/LoadingGrid';
import { HomePageGrid } from '../styles/Grids';
import useLatestData from '../utils/useLatestData';

const CurrentlySlicing = ({ sliceMasters }) => (
  <div>
    <h2 className="center">
      <span className="mark tilt">Slicemasters On</span>
    </h2>
    <p>Standing by, ready to slice you up!</p>
    {!sliceMasters && <LoadingGrid count={4} />}
    {sliceMasters && !sliceMasters?.length && (
      <p>Nobody is currently working</p>
    )}
    {sliceMasters?.length && <ItemGrid items={sliceMasters} />}
  </div>
);
const HotSlices = ({ hotSlices }) => (
  <div>
    <h2 className="center">
      <span className="mark tilt">Hot slices</span>
    </h2>
    <p>Come on by and grab a bite!</p>
    {!hotSlices && <LoadingGrid count={4} />}
    {hotSlices && !hotSlices?.length && <p>Nothing in the case.</p>}
    {hotSlices?.length && <ItemGrid items={hotSlices} />}
  </div>
);
export default function HomePage() {
  const { sliceMasters, hotSlices } = useLatestData();

  return (
    <>
      <div className="center">
        <h1>The best pizza downtown!</h1>
        <p>Open 11am to 11pm every day</p>
        <HomePageGrid>
          <CurrentlySlicing sliceMasters={sliceMasters} />
          <HotSlices hotSlices={hotSlices} />
        </HomePageGrid>
      </div>
    </>
  );
}
