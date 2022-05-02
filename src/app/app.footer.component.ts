import { Component } from '@angular/core';
import { MainComponent } from './pages/main/main.component';

@Component({
    selector: 'app-footer',
    templateUrl: './app.footer.component.html',
})
export class AppFooterComponent {
    constructor(public appMain: MainComponent) {}
}
