export interface ApplicationTheme {
    appTitle: { name: string; url: string;};
    backgroundColor: string;
    logo: 'judicial' | 'myhmcts' | 'default' | 'none';
    showFindCase: boolean;
}
  
export interface NavigationItem {
    text: string;
    href: string;
    active: boolean;
    roles?: string[];
    flags?: string[];
    ngClass?: string;
    align?: 'right' | 'left';
}