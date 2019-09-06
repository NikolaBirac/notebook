import { Component, OnInit, OnDestroy } from '@angular/core';
import { ContactsService } from '../contact.service';
import { Subscription } from 'rxjs';
import { Contact } from '../contact.model';

@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.css']
})
export class ContactListComponent implements OnInit, OnDestroy {
  loading = true;
  error = false;
  contacts: Contact[];
  private subscription: Subscription;

  constructor(private contactService: ContactsService) { }

  ngOnInit() {
    this.subscription = this.contactService.getContacts().subscribe(response => {      
      response.sort((a, b) => (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0));
      this.contacts = response;
      this.loading = false;
    },
    error => this.error = true
    )
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
