import { LightningElement, wire, api, track} from 'lwc';
import { NavigationMixin } from 'lightning/navigation';
//import communityPath from '@salesforce/community/basePath';


import findOpp from '@salesforce/apex/OppController.findOpp';

const DELAY = 300;

export default class searchComponentLWC extends LightningElement {
    
   @api recordId;
   @track contacts;
   searchKey = '';
   //contacts;
   //error;
   linkrecord = window.location.origin;
   

   viewRecord(event) {
    event.preventDefault();
    event.stopPropagation();
    let url = this.linkrecord+"/"+event.target.dataset.recordId;
    window.location = url;
}

    changehandle(event) {
    findOpp({ accId: this.recordId, searchKey: this.searchKey })
		.then(result => {
			this.contacts = result;
            //console.log("id"+this.contacts.data.id);
            //let idOpp = this.contacts.id;
			this.error = undefined;
		})
		.catch(error => {
			this.error = error;
			this.contacts = undefined;
		})
       // Debouncing this method: Do not update the reactive property as long as this function is
       // being called within a delay of DELAY. This is to avoid a very large number of Apex method calls.
       window.clearTimeout(this.delayTimeout);
       const searchKey = event.target.value;
       // eslint-disable-next-line @lwc/lwc/no-async-operation
       this.delayTimeout = setTimeout(() => {
           this.searchKey = searchKey;
       }, DELAY);
   }

   }

}