import { AllWorkHomeComponent } from './all-work-home.component';

describe('AllWorkHomeComponent', () => {
    let component: AllWorkHomeComponent;

    beforeEach( () => {
        component = new AllWorkHomeComponent();
    });

    it('Is Truthy', () => {
        expect(component).toBeTruthy();
    });

    it('Nav items initialised', () => {
        expect(component.subNavigationItems).not.toBeNull();
        expect(component.subNavigationItems.find((navItem) => navItem.text === 'Tasks')).not.toBeNull();
        expect(component.subNavigationItems.find((navItem) => navItem.text === 'Cases')).not.toBeNull();
    });
});
