import { Component, OnInit, Input  } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { ApiService } from '../../../../../_services/api.service';
import { ToastService } from '../../../../../_services/toast.service';
import { isNullOrUndefined } from 'util';

@Component({
  selector: 'app-update-persona',
  templateUrl: './update-persona.component.html',
  styleUrls: ['./update-persona.component.css']
})
export class UpdatePersonaComponent implements OnInit {

  form_update: FormGroup;
  submitted = false;

  @Input() fromParent;

  constructor(public activeModal: NgbActiveModal,
              private form_group: FormBuilder,
              private api: ApiService,
              public toast: ToastService) { }

  ngOnInit() {
    console.log(this.fromParent);

    this.form_update = this.form_group.group({
      Nombre: ['', Validators.required],
      ApellidoPaterno: [''],
      ApellidoMaterno: [''],
      RFC: ['', Validators.required,],
      FechaNacimiento: ['', Validators.required],
      UsuarioAgrega: [1]
    });

    let date_string = null;
    let final_date = null;
    // parse string date to date object
    if (!isNullOrUndefined(this.fromParent.fechaNacimiento)) {
      let date_string = new Date(this.fromParent.fechaNacimiento);
      final_date = date_string.toISOString().split('T')[0]
    }

    let usuario_agrega = null;
    if (!isNullOrUndefined(this.fromParent.usuarioAgrega)) {
        usuario_agrega = this.fromParent.usuarioAgrega.toString()
    }
          

    this.form_update.patchValue({
      Nombre: this.fromParent.nombre,
      ApellidoPaterno: this.fromParent.apellidoPaterno,
      ApellidoMaterno: this.fromParent.apellidoMaterno,
      RFC: this.fromParent.rfc,
      FechaNacimiento: final_date,
      UsuarioAgrega: usuario_agrega
    });
  }

  updateData() {
    this.submitted = true;
    // return invalid form rsp
    if (this.form_update.invalid)
      return;

    this.api.updatePersonaFisica(this.fromParent.idPersonaFisica,
                                 this.form_update.value ).subscribe(
      _rsp => {
        let status = _rsp[0]['estatus'];
        let msj = _rsp[0]['mensaje'];

        if (status != -50000) {
          this.toast.show(msj,
            {
              classname: 'bg-success text-light',
              delay: 4000,
              autohide: true,
              headertext: 'Success at Update Persona'
            });
          this.closeModal();
        }
        else {
          this.toast.show(msj,
            {
              classname: 'bg-danger text-light',
              delay: 4000,
              autohide: true,
              headertext: 'Error at Update Persona'
            });
        }
      },
      _err => {
        this.toast.show('Error at update Persona',
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
  get f() {
    return this.form_update.controls;
  }

  closeModal()
  {
    this.activeModal.close();
  }

}
