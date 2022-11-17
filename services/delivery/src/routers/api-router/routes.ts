
const AUTH_ROUTES = {
    SIGNUP: '/signup',
    SIGNIN: '/signin',
    LOGOUT: '/logout',
};


export const ROUTES = {
    API: '/api',
    ID: '/:id',
    ...AUTH_ROUTES,
};