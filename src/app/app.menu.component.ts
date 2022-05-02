import { Component, OnInit } from '@angular/core';
import { MainComponent } from './pages/main/main.component';

@Component({
    selector: 'app-menu',
    template: `
        <div class="layout-menu-container">
            <button
                pButton
                pRipple
                type="button"
                label="New Patient +"
                class="p-button-help mr-2 mb-2"
            ></button>

            <ul class="layout-menu" role="menu" (keydown)="onKeydown($event)">
                <li
                    app-menu
                    class="layout-menuitem-category"
                    *ngFor="let item of model; let i = index"
                    [item]="item"
                    [index]="i"
                    [root]="true"
                    role="none"
                >
                    <div
                        class="layout-menuitem-root-text"
                        [attr.aria-label]="item.label"
                    >
                        {{ item.label }}
                    </div>
                    <ul role="menu">
                        <li
                            app-menuitem
                            *ngFor="let child of item.items"
                            [item]="child"
                            [index]="i"
                            role="none"
                        ></li>
                    </ul>
                </li>
            </ul>
        </div>
    `,
})
export class AppMenuComponent implements OnInit {
    model: any[];

    constructor(public appMain: MainComponent) {}

    ngOnInit() {
        this.model = [
            {
                label: 'Home',
                items: [
                    {
                        label: 'Dashboard',
                        icon: 'pi pi-fw pi-home',
                        routerLink: ['/'],
                    },
                ],
            },
            {
                label: 'UI Patients',
                items: [
                    {
                        label: 'Search Patients',
                        icon: 'pi pi-search',
                        routerLink: ['/uikit/formlayout'],
                    },
                    {
                        label: 'COVID-19 Statistics',
                        icon: 'pi pi-chart-bar',
                        routerLink: ['/uikit/input'],
                    },
                    {
                        label: 'Vaccinations Statistics',
                        icon: 'pi pi-chart-pie',
                        routerLink: ['/uikit/input'],
                    },
                ],
            },
        ];
    }

    onKeydown(event: KeyboardEvent) {
        const nodeElement = <HTMLDivElement>event.target;
        if (event.code === 'Enter' || event.code === 'Space') {
            nodeElement.click();
            event.preventDefault();
        }
    }
}
