import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ApiService } from '../../../../../_services/api.service';
import { ToastService } from '../../../../../_services/toast.service';

@Component({
  selector: 'app-delete-persona',
  templateUrl: './delete-persona.component.html',
  styleUrls: ['./delete-persona.component.css']
})
export class DeletePersonaComponent implements OnInit {

  @Input() fromParent;

  constructor(public active_modal: NgbActiveModal,
    private api: ApiService,
    private toast: ToastService) { }

  id: any;

  ngOnInit()
  {
    console.log(this.fromParent);

    this.id = this.fromParent;
    
  }

  deletePersona()
  {
    this.api.deletePersonaFisica(this.id).subscribe(
      _rsp =>
      {

        
        this.toast.show('User deleted succesfully',
          {
            classname: 'bg-success text-light',
            delay: 4000,
            autohide: true,
            headertext: 'Delete Succesful'
          });

        this.closeModal();

      },
      _err =>
      {
        console.error(_err);
        this.toast.show('Error deleting user',
          {
            classname: 'bg-danger text-light',
            delay: 4000,
            autohide: true,
            headertext: 'Delete Error'
          });
      }
    );
  }

  closeModal()
  {
    this.active_modal.close();
  }

}
