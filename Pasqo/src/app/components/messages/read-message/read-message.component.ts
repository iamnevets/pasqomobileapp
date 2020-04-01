import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ContactUsService } from '../../contact-us/contact-us.service';
import { ContactUs } from 'src/app/models/contact-us';

@Component({
  selector: 'app-read-message',
  templateUrl: './read-message.component.html',
  styleUrls: ['./read-message.component.css']
})
export class ReadMessageComponent implements OnInit {
  contact: ContactUs = {
    Id: null,
    Name: '',
    Phone: '',
    Email: '',
    SchoolId: null,
    School: null,
    Message: '',
    Date: null
  };

  faChevronLeft = faChevronLeft;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private contactUsService: ContactUsService
  ) {}

  ngOnInit() {
    const id = +this.activatedRoute.snapshot.paramMap.get('id');
    if (id) {
      this.getOneMessage(id);
    }
  }

  getOneMessage(id: number) {
    this.contactUsService.getOne(id).subscribe(response => {
      if (response.Success) {
        this.contact = response.Data;
      }
    });
  }

  back() {
    this.router.navigateByUrl('messages');
  }

}
