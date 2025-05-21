import { jwtDecode } from 'jwt-decode';

function getToken() {
    return localStorage.getItem('token');
}

function removeToken() {
    localStorage.removeItem('token');
};

function decodeAuthToken(token) {
    try {
        return jwtDecode(token);
    } catch (error) {
        console.error('Decoding Error:', error);
        return null;
    }
}

function isTokenExpired(decodedToken) {
    if (!decodedToken || !decodedToken.exp) {
        return true;
    }
    const currentTime = Math.floor(Date.now() / 1000);
    return decodedToken.exp < currentTime;
}

export function getLoggedInUserId() {
    const token = getToken();

    if (!token) return null;

    const decodedToken = decodeAuthToken(token);
    if (decodedToken && !isTokenExpired(decodedToken)) {
        // 'sub' contains the user ID
        return decodedToken.sub;
    }
    else {
        removeToken();

        return null;
    }
}

export function checkOwner(authorId) {
    const loggedInUserId = getLoggedInUserId();
    return loggedInUserId === authorId;
}