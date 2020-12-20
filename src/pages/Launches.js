import { useState, useEffect } from 'react';
import axios from 'axios'; // Import the axios library
import { Link } from 'react-router-dom';

// Import components
import Loading from '../components/Loading';

const Launches = () => {
  // Create a state for the launches data
  const [launches, setLaunches] = useState([]);

  // To be more accurate, make a loading state
  const [loading, setLoading] = useState(true);

  // and an error state
  const [error, setError] = useState(undefined);

  // Call the SpaceX launches API when the Launches component mounts
  useEffect(() => {
    console.log('Launches component mounts');

    // To prevent flickers, you want your app to set a minimum load time
    window.setTimeout(() => {
      // Call the launches API
      axios.get('https://api.spacexdata.com/v4/launches/past')
      .then((response) => {
        // Handle the successful response
        // console.log(response);
        const { data } = response;

        // You need to make this data available to the Component's JSX
        // When we get the API response with the appropriate data
        // update the state, the component will re-render with the state data saved (temp)
        setLaunches(data);

        // setLaunches([]); // Use this to pretend you get no data

        // Because the loading portion of the application is done
        setLoading(false);
      })
      .catch((error) => {
        // Handle any errors
        console.log(error.response);

        const { status, data } = error.response;

        // Set an error message in state
        setError(`${status} ${data}`);

        // The loading portion is done even in error
        setLoading(false);
      }).then(() => {
        console.log('More!');
      });
    }, 1500); // time is set in milliseconds
  }, []); // Put an empty dependency array to simulate mounting

  console.log(launches);

  return (
    <div>
      {loading && (
        <Loading />
      )}
      {!loading && !error && launches.length === 0 && (
        <p className="lead text-center">There are currently no launches.</p>
      )}
      {!loading && error && (
        <p className="lead text-center">{error}</p>
      )}
      {!loading && !error && launches.length > 0 && (
        <table className="table">
          <thead>
            <tr>
              <th>Flight Number</th>
              <th>Name</th>
              {/* <th>Details</th> */}
              <th>Success</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {launches.map(launch => (
              <tr key={launch.id}>
                <td>{launch.flight_number}</td>
                <td>{launch.name}</td>
                {/* <td>{launch.details}</td> */}
                <td>{launch.success ? 'Yes' : 'No'}</td>
                <td>{launch.date_local}</td>
                <td>
                  <Link to={`launch/${launch.id}`}>Details</Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Launches;
