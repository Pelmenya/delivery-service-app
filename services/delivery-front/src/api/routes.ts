
const AUTH_ROUTES = {
    SIGNUP: '/signup',
    SIGNIN: '/signin',
    LOGOUT: '/logout',
};

const ADVERTISEMENTS_ROUTES = {
    ADVERTISEMENTS: '/advertisements',
};

export const ROUTES = {
    API: '/api',
    ID: '/:id',
    ...AUTH_ROUTES,
    ...ADVERTISEMENTS_ROUTES,
};