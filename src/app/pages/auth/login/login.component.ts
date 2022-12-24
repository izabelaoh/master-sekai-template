import { Component, OnInit, OnDestroy } from '@angular/core';
import { ConfigService } from '../../../service/app.config.service';
import { AppConfig } from '../../../api/appconfig';
import { firstValueFrom, Subscription } from 'rxjs';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { Message, MessageService } from 'primeng/api';
import { AngularFirestore } from '@angular/fire/compat/firestore';

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
        private firestore: AngularFirestore,
        private router: Router
    ) { }

    loginForm = new FormGroup({
        email: new FormControl('admin@sakai.com', [Validators.required, Validators.email]),
        password: new FormControl('admin@sakai.com', [Validators.required]),
    });

    ngOnInit(): void {
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
            .then(async (user) => {
                let userData = await firstValueFrom(
                    this.firestore.doc(`users/${user.user.uid}`).get()
                );

                return {
                    ...user,
                    UserData: userData.data(),
                };
            })
            .then((user) => {
                this.router.navigate(['/main/dashboard']);

                const userName: string = user.user.email.split('@')[0].split('.').reduce((acc, curr, ind, arr) => {
                    return `${acc} ${curr.charAt(0).toUpperCase()}${curr.slice(1)}`;
                }, '').trim();

                user.additionalUserInfo.username = userName;

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
