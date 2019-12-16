import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { RestUser } from 'src/app/api/rest-user.service';
import { User } from 'src/app/shared/api.dto';
import { environment } from 'src/environments/environment';
import { NzMessageService } from 'ng-zorro-antd';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {
  loading = true;
  validateForm: FormGroup;
  currentUser: User;
  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private restUser: RestUser,
    private notification: NzMessageService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.currentUser = JSON.parse(window.localStorage.getItem('user'));
    this.validateForm = this.fb.group({
      first_name: [this.currentUser.first_name, [Validators.required]],
      last_name: [this.currentUser.last_name, [Validators.required]],
      password: [null],
      checkPassword: [null],
      city: [this.currentUser.locations.city, [Validators.required]],
      country: [this.currentUser.locations.country, [Validators.required]],
      postal_code: [this.currentUser.locations.postal_code, [Validators.required]]
    });
    this.loading = false;
  }

  submitForm(): void {
    // tslint:disable-next-line: forin
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
    }
    if (this.validateForm.valid) {
      const queryAddress = `${this.validateForm.value.city} ${this.validateForm.value.country} ${this.validateForm.value.postal_code}`;
      this.http
        .get(
          `https://maps.googleapis.com/maps/api/geocode/json?address=${queryAddress}&key=${environment.googleApiKey}`
        )
        .subscribe(
          (googleResponse: any) => {
            const { results } = googleResponse;
            const [firstResponse] = results;
            const { geometry } = firstResponse;
            const { location } = geometry;
            const formData = new FormData();
            formData.append('first_name', this.validateForm.value.first_name);
            formData.append('last_name', this.validateForm.value.last_name);
            formData.append('city', this.validateForm.value.city);
            formData.append('country', this.validateForm.value.country);
            formData.append('postal_code', this.validateForm.value.postal_code);
            formData.append('lat', location.lat);
            formData.append('lng', location.lng);
            formData.append(`spare_rooms`, '1');
            this.restUser.updateProfile(formData).subscribe(
              res => {
                this.notification.create(`success`, 'Profile successfully updated');
              },
              err => this.notification.create(`err`, err.message)
            );
          },
          err => this.notification.create(`err`, err.message)
        );
    }
  }

  updateConfirmValidator(): void {
    Promise.resolve().then(() => this.validateForm.controls.checkPassword.updateValueAndValidity());
  }

  confirmationValidator = (control: FormControl): { [s: string]: boolean } => {
    if (!control.value) {
      return { required: true };
    } else if (control.value !== this.validateForm.controls.password.value) {
      return { confirm: true, error: true };
    }
    return {};
  };

  logout() {
    window.localStorage.clear();
    this.router.navigateByUrl('auth/login');
  }
}
