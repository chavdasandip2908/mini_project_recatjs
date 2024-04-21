// common.js
// export const BEURL = 'http://localhost:3001';
export const BEURL = 'https://krishi-cash-server.onrender.com';

export const signoutHandler = (navigate) => {
    console.log("signout called....");
    window.localStorage.removeItem('krishi-cash-user-token');
    navigate('/krishi-cash');
}

