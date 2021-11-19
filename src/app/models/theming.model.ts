export interface ApplicationTheme {
    appTitle: { name: string; url: string; };
    backgroundColor: string;
    logo: 'judicial' | 'myhmcts' | 'default' | 'none';
    showFindCase: boolean;
}

export type FlagDefinition = string | { flagName: string; value: string; };

export interface NavigationItem {
    text: string;
    href: string;
    active: boolean;
    roles?: string[];
    flags?: FlagDefinition[];
    notRoles?: string[];
    notFlags?: FlagDefinition[];
    ngClass?: string;
    align?: 'right' | 'left';
}
