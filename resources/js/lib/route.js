export function route(name, params = null) {
    const routes = {
        'vehicles.index': '/',
        'vehicles.show': (id) => `/vehicles/${id}`,
        'deals.index': '/deals',
        'deals.store': '/deals',
        'deals.show': (id) => `/deals/${id}`,
        'deals.updateStatus': (id) => `/deals/${id}/status`,
        'compliance.verify': (id) => `/compliance/${id}/verify`,
        'compliance.upload': (id) => `/compliance/${id}/upload`,
        'admin.dashboard': '/admin',
        'dealer.dashboard': '/dealer',
        'dealer.vehicles.create': '/dealer/vehicles/create',
        'dealer.vehicles.store': '/dealer/vehicles',
        'dealer.vehicles.toggleStatus': (id) => `/dealer/vehicles/${id}/status`,
        'dealer.vehicles.updatePrice': (id) => `/dealer/vehicles/${id}/update-price`,
        'dealer.vehicles.edit': (id) => `/dealer/vehicles/${id}/edit`,
        'dealer.vehicles.update': (id) => `/dealer/vehicles/${id}`,
        'dealer.settings': '/dealer/settings',
        'dealer.settings.update': '/dealer/settings',
        'dealer.services': '/dealer/services',
        'dealer.fleetAnalytics': '/dealer/fleet-analytics',
        'auth.switchRole': '/auth/switch-role',
        'login': '/login',
        'register': '/register',
        'logout': '/logout',
        'password.request': '/forgot-password',
        'password.email': '/forgot-password',
        'password.reset': (token) => `/reset-password/${token}`,
        'password.update': '/reset-password',
        'pages.faq': '/faq',
        'pages.privacy': '/privacy-policy',
        'pages.terms': '/terms-and-conditions',
        'pages.cookies': '/cookie-policy',
        'pages.about': '/about',
    };

    if (!name) {
        return {
            current: (pattern) => {
                const currentPath = typeof window !== 'undefined' ? window.location.pathname : '/';
                if (pattern === '' || pattern === 'vehicles.index') return currentPath === '/';
                if (pattern === 'vehicles.*') return currentPath.startsWith('/vehicles') || currentPath === '/';
                if (pattern === 'deals.*') return currentPath.startsWith('/deals');
                if (pattern === 'admin.*') return currentPath.startsWith('/admin');
                if (pattern === 'dealer.*') return currentPath.startsWith('/dealer');
                if (pattern === 'login') return currentPath === '/login';
                if (pattern === 'register') return currentPath === '/register';
                if (pattern === 'pages.*') return ['/faq', '/privacy-policy', '/terms-and-conditions', '/cookie-policy', '/about'].includes(currentPath);
                return false;
            }
        };
    }

    const target = routes[name];
    if (!target) return typeof name === 'string' ? name : '/';

    let baseUrl = typeof target === 'function' ? target(params) : target;

    // Append query params if params is an object and target is not a function
    if (params && typeof params === 'object' && typeof target !== 'function') {
        const query = new URLSearchParams(params).toString();
        if (query) {
            baseUrl += (baseUrl.includes('?') ? '&' : '?') + query;
        }
    }

    return baseUrl;
}

if (typeof window !== 'undefined') {
    window.route = route;
}
