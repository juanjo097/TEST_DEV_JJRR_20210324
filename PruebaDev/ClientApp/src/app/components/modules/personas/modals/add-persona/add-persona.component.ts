import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { ApiService } from '../../../../../_services/api.service';
import { ToastService } from '../../../../../_services/toast.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-add-persona',
  templateUrl: './add-persona.component.html',
  styleUrls: ['./add-persona.component.css']
})
export class AddPersonaComponent implements OnInit
{
  form_persona: FormGroup;
  submitted = false;

  constructor( private form_builder: FormBuilder,
              private api: ApiService,
              public toast: ToastService,
              public active_modal: NgbActiveModal ) { }

  ngOnInit()
  {
    this.form_persona = this.form_builder.group({
      Nombre: ['', Validators.required],
      ApellidoPaterno: [''],
      ApellidoMaterno: [''],
      RFC: ['', Validators.maxLength(13)],
      FechaNacimiento: ['', Validators.required],
      UsuarioAgrega: [ 1, Validators.required, ]
    });
  }

  sendData(){
    this.submitted = true;
    // return invalid form rsp
    if (this.form_persona.invalid)
      return;

    this.api.addPersonaFisica(this.form_persona.value).subscribe(
      _rsp =>
      {
        let status = _rsp[0]['estatus'];
        let msj = _rsp[0]['mensaje'];

        if (status != -50000) {
          this.toast.show(msj,
            {
              classname: 'bg-success text-light',
              delay: 4000,
              autohide: true,
              headertext: 'Success'
            });
          this.closeModal();
        }
        else
        {
          this.toast.show(msj,
            {
              classname: 'bg-danger text-light',
              delay: 4000,
              autohide: true,
              headertext: 'Error'
            });
        }
          
      },
      _err => {
        this.toast.show('Persona Added Successful',
          {
            classname: 'bg-danger text-light',
            delay: 4000,
            autohide: true,
            headertext: 'Success'
          });
        console.log(_err);

      });
  }

  // helper to get better way to get access to form fields<<
  get f()
  {
    return this.form_persona.controls;
  }

  closeModal()
  {
    this.active_modal.close();
  }

}
