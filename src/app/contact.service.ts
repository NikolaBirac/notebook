import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Contact } from './contact.model';

@Injectable()
export class ContactsService {

    constructor(private http: HttpClient) { }

    getContacts() {
        return this.http.get<Array<Contact>>('http://localhost:3000/get');
    }

    getSingleContact(id) {
        return this.http.get<Array<Contact>>(`http://localhost:3000/get/${id}`);
    }

    newContact(contact: Contact) {
        return this.http.post<Contact>('http://localhost:3000/post', contact);
    }

    editContact(contact: Contact) {
        return this.http.put('http://localhost:3000/put', contact);
    }

    deleteContact(id) {
        return this.http.delete<Contact>(`http://localhost:3000/delete/${id}`);
    }
}