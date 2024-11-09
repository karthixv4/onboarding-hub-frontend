import React from 'react';
import { Navigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { isAuth, loggedInUser } from '../recoil/atom/user/userAtoms'; // Adjust import as necessary

const PrivateRoute = ({ children, requiredRole }) => {
    const isAuthenticated = useRecoilValue(isAuth);
    const currentUser = useRecoilValue(loggedInUser);
console.log("CUrrent user: ", currentUser);
    if (!isAuthenticated ||!currentUser) {
        return <Navigate to="/login" />;
    }

    if (requiredRole && currentUser.role !== requiredRole) {
        return <Navigate to="/unauthorized" />;
    }

    return children;
};

export default PrivateRoute;
