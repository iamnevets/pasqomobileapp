import { SchoolService } from './../../school.service';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { School } from 'src/app/models/school';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-school-form',
  templateUrl: './school-form.component.html',
  styleUrls: ['./school-form.component.css']
})
export class SchoolFormComponent implements OnInit {
  form: FormGroup;
  schools: School[];

  constructor(
    private router: Router,
    private schoolService: SchoolService,
    private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    const id = +this.activatedRoute.snapshot.paramMap.get('id');
    if (id) {
      this.editSchool(id);
    }

    this.schoolForm();
  }

  schoolForm() {
    this.form = this.formBuilder.group({
      Id: this.formBuilder.control(''),
      Name: this.formBuilder.control('', Validators.required),
      Location: this.formBuilder.control('', Validators.required)
    });
  }

  createOrUpdateSchool() {
    const data = this.form.value;
    this.schoolService.createOrUpdate(data).subscribe(response => {
      if (response.Success) {
        this.router.navigateByUrl('schools');

        Swal.fire({
          title: 'Successful',
          text: 'User Created',
          type: 'success',
          showConfirmButton: false,
          timer: 1000
        });
      } else {
        Swal.fire({
          title: 'Failed',
          text: response.Message,
          type: 'error',
          showConfirmButton: true
        });
      }
    });
  }

  editSchool(id: number) {
    this.schoolService.getSchoolDetails(id).subscribe(response => {
      if (response.Success) {
        this.form.patchValue(response.Data);
      }
    });
  }

  cancel() {
    this.router.navigateByUrl('schools');
  }

}
