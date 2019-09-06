import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { NgForm } from '@angular/forms';
import { ContactsService } from '../contact.service';
import { Subscription } from 'rxjs';
import { Contact } from '../contact.model';

@Component({
   selector: 'app-contact-form',
   templateUrl: './contact-form.component.html',
   styleUrls: ['./contact-form.component.css']
})
export class ContactFormComponent implements OnInit, OnDestroy {
   error = false;
   id: string;
   editMode = false;
   @ViewChild('f') contactForm: NgForm;
   private subscription: Subscription;

   constructor(private route: ActivatedRoute,
      private contactService: ContactsService,
      private router: Router) { }

   ngOnInit() {
      this.subscription = this.route.params
         .subscribe(
            (params: Params) => {
               this.id = params['id'];
               this.editMode = params['id'] != null;
               this.initForm();
            }
         )
   }

   onSubmit(form) {
      let tagsArray = form.tags.split(",");
      const newContact = new Contact(this.id, form.name, form.number, form.email, tagsArray);

      if (this.editMode) {
         this.subscription = this.contactService.editContact(newContact).subscribe(res => {
            this.router.navigate(["/"]);
         });
      } else {
         this.subscription = this.contactService.newContact(newContact).subscribe(res => {
            this.router.navigate(["/"]);
         });;
      }
   }

   onDelete() {
      this.subscription = this.contactService.deleteContact(this.id).subscribe(res => {
         this.router.navigate(["/"]);
      });
   }

   private initForm() {
      let name = '';
      let number = '';
      let email = '';
      let tags = '';

      if (this.editMode) {
         this.subscription = this.contactService.getSingleContact(this.id)
            .subscribe(response => {
               const contact = response[0];

               name = contact.name;
               number = contact.number;
               email = contact.email;
               tags = contact.tags.toString();

               setTimeout(() => {
                  this.contactForm.setValue({
                     name: name,
                     number,
                     email,
                     tags
                  })
               });
            },
               error => this.error = true
            );
      } else {
         setTimeout(() => {
            this.contactForm.setValue({
               name: name,
               number,
               email,
               tags
            })
         });
      }
   }

   ngOnDestroy() {
      this.subscription.unsubscribe();
   }
}