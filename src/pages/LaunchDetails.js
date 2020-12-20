import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

import Loading from '../components/Loading';

const LaunchDetails = () => {
  // We want to capture the launchId from the URL
  const { launchId } = useParams();

  // Setup the states
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(undefined);
  const [launch, setLaunch] = useState(undefined);

  useEffect(() => {

    setTimeout(() => {

      axios.get(`https://api.spacexdata.com/v4/launches/${launchId}`)
        .then((response) => {
          const { data } = response;
          console.log(data);
          setLaunch(data);
          setLoading(false);
        })
        .catch((error) => {
          console.log(error.response);
          const { status, data } = error.response;
          setLoading(false);
          setError(`${status} ${data}`);
        });

    }, 1500);

  }, []); // Empty dependency array for mounting effects

  console.log(launch);

  return (
    <div>
      {loading && (
        <Loading />
      )}
      {!loading && error && (
        <div className="text-center">
          <p className="lead">{error}</p>
          <Link to="/" className="btn btn-primary">Go Back</Link>
        </div>
      )}
      {!loading && !error && launch && (
        <div>
          <h3>{launch.name}</h3>
          {/* <p>{launch.details ? launch.details : '--'}</p> */}
          <p>{launch.details || '--'}</p>
          <Link to="/" className="btn btn-primary">Go Back</Link>
        </div>
      )}
    </div>
  );
};

export default LaunchDetails;
