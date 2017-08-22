import { Component, OnInit } from '@angular/core';
import { ClientService } from '../../services/client.service'; 
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Client } from '../../models/Client';

@Component({
  selector: 'app-edit-client',
  templateUrl: './edit-client.component.html',
  styleUrls: ['./edit-client.component.css']
})
export class EditClientComponent implements OnInit {
  id:string;
  client:Client = {
    firstName:'',
    lastName: '',
    email:'',
    phone:'',
    balance:0
  }

  disableBalanceOnEdit:boolean = true;

  constructor(
    public clientService:ClientService,
    public router:Router,
    public route:ActivatedRoute,
    public flashMessagesService:FlashMessagesService
  ) { }

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];

    // Get Client
    this.clientService.getClient(this.id).subscribe(client => {
      this.client = client;
    });
  }

  onSubmit({value, valid}:{value:Client, valid:boolean}){
    if(!valid){
      this.flashMessagesService.show('Please fill in all fields', {cssClass:'alert-danger', timeout: 4000});
      this.router.navigate(['edit-client/'+this.id]);
    } else {
      // Update client
      this.clientService.updateClient(this.id, value);
      this.flashMessagesService.show('Client updated', {cssClass:'alert-success', timeout: 4000});
      this.router.navigate(['/client/'+this.id]);
    }
  }

}
