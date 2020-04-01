import { ProgrammeService } from './programme.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Programme } from 'src/app/models/Programme';
import { faEye, faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-programme',
  templateUrl: './programme.component.html',
  styleUrls: ['./programme.component.css']
})
export class ProgrammeComponent implements OnInit {
  faEye = faEye;
  faEdit = faEdit;
  faTrashAlt = faTrashAlt;

  programmes: Programme[] = [];
  programmeFilter: any = {
    Id: null,
    Name: '',
    SchoolId: null,
    School: {Id: null, Name: ''}
  };
  pageNumber = 1;

  constructor(private router: Router, private programmeService: ProgrammeService) { }

  ngOnInit() {
    this.getAllProgrammes();
  }

  createProgramme() {
    this.router.navigateByUrl('programmeform');
  }

  updateProgramme(id: number) {
    this.router.navigateByUrl('programmeform/' + id);
  }

  // getOneProgramme(id: number) {
  //   this.programmeService.getOneProgramme(id).subscribe(response => {
  //     if (response.Success) {
  //       // not implemented yet
  //     }
  //   });
  // }

  getAllProgrammes() {
    this.programmeService.getAllProgrammes().subscribe(response => {
      if (response.Success) {
        this.programmes = response.Data;
      }
    });
  }

  delete(id: number) {
    Swal.fire({
      title: 'Confirm',
      text: 'Are you sure?',
      type: 'warning',
      showConfirmButton: true,
      showCancelButton: true,
      confirmButtonColor: '#40844e',
      cancelButtonColor: '#d33',
      confirmButtonText: 'delete it'
    }).then(result => {
      if (result.value) {
        this.programmeService.delete(id).subscribe(response => {
          if (response.Success) {
            // this.router.navigateByUrl('programmes');
            this.ngOnInit();

            Swal.fire({
              title: 'Successful',
              text: 'Programme deleted',
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
    });
  }

}
