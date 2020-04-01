import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { SchoolService } from './../../school/school.service';
import { ProgrammeService } from './../programme.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { School } from 'src/app/models/school';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-programme-form',
  templateUrl: './programme-form.component.html',
  styleUrls: ['./programme-form.component.css']
})
export class ProgrammeFormComponent implements OnInit {
  form: FormGroup;
  schools: School[];

  constructor(
    private router: Router,
    private programmeService: ProgrammeService,
    private schoolService: SchoolService,
    private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    const id = +this.activatedRoute.snapshot.paramMap.get('id');
    if (id) {
      this.editProgramme(id);
    }

    this.getAllSchools();
    this.programmeForm();
  }

  programmeForm() {
    this.form = this.formBuilder.group({
      Id: new FormControl(),
      Name: this.formBuilder.control('', Validators.required),
      SchoolId: this.formBuilder.control('', Validators.required)
    });
  }

  createOrUpdateProgramme() {
    const data = this.form.value;
    this.programmeService.createOrUpdate(data).subscribe(response => {
      if (response.Success) {
        this.router.navigateByUrl('programmes');

        Swal.fire({
          title: 'Successful',
          text: 'Programme Created',
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

  editProgramme(id: number) {
    this.programmeService.getOneProgramme(id).subscribe(response => {
      if (response.Success) {
        this.form.patchValue(response.Data);
      }
    });
  }

  cancel() {
    this.router.navigateByUrl('programmes');
  }

  getAllSchools() {
    this.schoolService.getSchools().subscribe(response => {
      if (response.Success) {
        this.schools = response.Data;
      }
    });
  }

}
