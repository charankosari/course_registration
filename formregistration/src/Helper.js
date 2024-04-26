import axios from 'axios';

export default function requestDetails() {
    const userToken = localStorage.getItem('user'); // Retrieve the user token from localStorage

    // If userToken exists, make a POST request to /details with the token
    if (userToken) {
        return axios.post('http://localhost:9999/details', { userId: userToken })
            .then(response => {
                // Return the response directly
                return response;
            })
            .catch(error => {
                console.error('Error fetching user details:', error);
                // Throw the error to be caught by the caller
                throw error;
            });
    } else {
        console.log('User token not found in localStorage.');
        // Throw an error indicating that the user token is not found
        throw new Error('User token not found in localStorage.');
    }
}
