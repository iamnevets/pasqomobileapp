import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { ContactUs } from 'src/app/models/contact-us';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ContactUsService } from '../contact-us/contact-us.service';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit {
  contacts: ContactUs[];

  faTrashAlt = faTrashAlt;

  constructor(private router: Router, private contactUsService: ContactUsService) { }

  ngOnInit() {
    this.getAllMessages();
  }

  getAllMessages() {
    this.contactUsService.getAll().subscribe(response => {
      if (response.Success) {
        this.contacts = response.Data;
      }
    });
  }

  truncateMessage(contactId: number) {
    const contact: ContactUs = this.contacts.find(x => x.Id === contactId);
    let message = contact.Message;

    if (message.length > 65) {
      message = message.slice(0, 60) + '...';
    }

    return message;
  }

  readMessage(id: number) {
    this.router.navigate(['/readmessage/' + id]);
  }

  delete(id: number) {
    this.contactUsService.delete(id).subscribe(response => {
      if (response.Success) {
        this.ngOnInit();
      }
    });
  }

}
