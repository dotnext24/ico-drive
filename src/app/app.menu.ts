export interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}

export const Public_ROUTES: RouteInfo[] = [
   
    { path: 'login', title: 'Login',  icon: 'ti-arrow-circle-right', class: ''  },
    { path: 'signup', title: 'Register',  icon: 'ti-user', class: ''  }
];


export const Dashboard_ROUTES: RouteInfo[] = [
    // { path: 'dashboard', title: 'Dashboard',  icon: 'ti-panel', class: '' },
    
   
    { path: 'my-wallet', title: 'My-Wallet',  icon: 'ti-wallet', class: '' },
   
    { path: 'affiliate', title: 'Affiliate',  icon: 'ti-panel', class: '' },
    { path: 'coming-soon', title: 'Coming-Soon',  icon: 'ti-bell', class: '' },
    { path: 'whitepaper', title: 'Whitepaper',  icon: 'ti-download', class: '' },
    { path: 'support',title: 'Support',  icon: 'ti-help', class: '' },
    { path: 'profile', title: 'Profile',  icon: 'ti-user', class: '' },
    { path: 'settings', title: 'Settings',  icon: 'ti-settings', class: '' },
    
    { path: 'logout',title: 'Logout',  icon: 'ti-arrow-circle-right', class: '' }
];