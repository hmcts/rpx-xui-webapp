export interface Helper {
    heading: string;
    email: { address: string; text: string; };
    phone: { text: string; };
    opening: { text: string; };
    probate: { text: string };
    otherContact: { text: string };
}
export interface NavigationItems {
    text: string; href: string;
}
export interface Navigation {
    items: NavigationItems[];
}
