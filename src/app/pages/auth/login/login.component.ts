import { Component, OnInit, OnDestroy } from '@angular/core';
import { ConfigService } from '../../../service/app.config.service';
import { AppConfig } from '../../../api/appconfig';
import { Subscription } from 'rxjs';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { Message, MessageService } from 'primeng/api';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
    styles: [
        `
            :host ::ng-deep .p-password input {
                width: 100%;
                padding: 1rem;
            }

            :host ::ng-deep .pi-eye {
                transform: scale(1.6);
                margin-right: 1rem;
                color: #883cae !important;
            }

            :host ::ng-deep .pi-eye-slash {
                transform: scale(1.6);
                margin-right: 1rem;
                color: #883cae !important;
            }
        `,
    ],
    providers: [MessageService],
})
export class AppLoginComponent implements OnInit, OnDestroy {
    valCheck: string[] = ['remember'];
    password: string;
    config: AppConfig;
    subscription: Subscription;
    msgs: Message[] = [];

    constructor(
        public configService: ConfigService,
        private angularAuth: AngularFireAuth,
        private router: Router
    ) {}

    loginForm = new FormGroup({
        email: new FormControl('', [Validators.required, Validators.email]),
        password: new FormControl('', [Validators.required]),
    });

    ngOnInit(): void {
        debugger;
        this.config = this.configService.config;
        this.subscription = this.configService.configUpdate$.subscribe(
            (config) => {
                this.config = config;
            }
        );
    }

    ngOnDestroy(): void {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }

    onLogin() {
        if (!this.loginForm.valid) {
            let errorMessage: string = '';
            if (
                !this.loginForm.controls.email.valid &&
                !this.loginForm.controls.password.valid
            ) {
                errorMessage =
                    'Invalid credentials. Please enter valid password and email.';
            } else if (
                !this.loginForm.controls.email.valid &&
                this.loginForm.controls.password.valid
            ) {
                errorMessage = 'Invalid Email. Please enter valid email.';
            } else {
                errorMessage = 'Passworid is reqried. Please enter password.';
            }

            if (errorMessage) {
                this.showVlidationError(errorMessage);
                return;
            }
        }

        this.angularAuth
            .signInWithEmailAndPassword(
                this.loginForm.controls.email.value,
                this.loginForm.controls.password.value
            )
            .then((user) => {
                this.router.navigate(['/main/dashboard']);
                localStorage.setItem('LoggedUser', JSON.stringify(user));
            })
            .catch((err) => {
                let message: string = err.message;
                let parsedMessage = message.split(':')[1].trim();
                parsedMessage = parsedMessage.split('(')[0].trim();

                this.showVlidationError(parsedMessage);
            });
    }

    showVlidationError(message: string) {
        this.msgs = [];
        this.msgs.push({
            severity: 'error',
            summary: 'Error Message',
            detail: message,
        });
    }

    showInfoViaMessage() {
        this.msgs = [];
        this.msgs.push({
            severity: 'info',
            summary: 'Info Message',
            detail: 'Seek support assistance',
        });
        return this.msgs;
    }
}
