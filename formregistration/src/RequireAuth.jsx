import { useEffect, useState } from 'react';
import { useNavigate, Outlet } from 'react-router-dom';
// import { GetUserDetails } from './Helper';
import  axios  from 'axios';

const RequireAuth = ({ allowedRoles }) => {
    const userToken = localStorage.getItem('user');
    const GetUserDetails=()=>{
    if (userToken) {
                 return axios.post('http://localhost:9999/admin-details', { userId: userToken })
                     .then(response => {
                         // Return the response directly
                         return response;
                     })
                     .catch(error => {
                         console.error('Error fetching admin details:', error);
                         // Throw the error to be caught by the caller
                        throw error;
                     });
             } else {
                 console.log('User token not found in localStorage.');
                 // Throw an error indicating that the user token is not found
                 throw new Error('User token not found in localStorage.');
             }
            }
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await GetUserDetails();
                if (response.status === 200) {
                    const userData = response.data;

                    setUser(userData);
                    // Check if user's role is allowed
                    console.log(userData)
                    if (!allowedRoles.includes(userData)) {
                  
                        // Redirect to unauthorized page if not allowed
                        navigate('/unauthorized');
                    }
                } else {
                    console.log("Failed to fetch user data");
                    setUser(null);
                    navigate('/unauthorized');
                }
            } catch (error) {
                console.error('Error fetching user:', error);
                setUser(null);
                navigate('/unauthorized');
            } finally {
                setLoading(false);
            }
        };
        fetchUser();
    }, []);

   

    // Render Outlet only if the user's role is allowed
    return user && allowedRoles.includes(user) ? <Outlet /> : null;
};

export default RequireAuth;
