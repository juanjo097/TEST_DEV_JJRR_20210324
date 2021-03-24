import { Component, OnInit } from '@angular/core';

//services
import { ApiService } from '../../../_services/api.service';
import { ToastService } from '../../../_services/toast.service';
import { ExcelService } from '../../../_services/excel.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';


//modals
import { UpdatePersonaComponent } from './modals/update-persona/update-persona.component';
import { DeletePersonaComponent } from './modals/delete-persona/delete-persona.component';
import { AddPersonaComponent } from './modals/add-persona/add-persona.component';


@Component({
  selector: 'app-personas',
  templateUrl: './personas.component.html',
  styleUrls: ['./personas.component.css']
})
export class PersonasComponent implements OnInit {
  personas: Array<any>;
  p: any;
  fileName = 'PersonasFisicas.xlsx';  

  constructor(private api: ApiService,
    private modal: NgbModal,
    private toast: ToastService,
    private excel: ExcelService  ) { }

  ngOnInit()
  {
    this.api.getPersonaFisica().subscribe(
      _rsp => {
        console.log(_rsp);
        this.personas = _rsp;
      },
      _err => {
        console.error(_err);
      });
  }

  openAddModal() {
    const modal_ref = this.modal.open(AddPersonaComponent,
      {
        scrollable: true,
        backdrop: 'static'
      });

    modal_ref.result.then(
      (_rsp) => {
        console.log(_rsp);
        this.api.getPersonaFisica().subscribe(
          _rsp => {
            this.personas = _rsp;
          },
          _err => {
            console.error(_err);
          }
        );
      },
      (_err) => {
      }
    );
  }

  openEditModal(persona_data)
  {
    const modal_ref = this.modal.open(UpdatePersonaComponent,
      {
        scrollable: true,
        backdrop: 'static'
      });

    let data = persona_data;

    modal_ref.componentInstance.fromParent = data;
    modal_ref.result.then(
      (_rsp) => {
        console.log(_rsp);
      },
      (_err) => {
      }
    );
  }


  openDeleteModal(id)
  {
    const modal_ref = this.modal.open(DeletePersonaComponent,
      {
        scrollable: true,
        backdrop: 'static'
      });

    let data = id;

    modal_ref.componentInstance.fromParent = data;

    //after close modal update list
    modal_ref.result.then(
      (_rsp) => {
        this.api.getPersonaFisica().subscribe(
          _rsp => {
            this.personas = _rsp;
          },
          _err => {
            console.error("Error");
          }
        );
      },
      (_err) => {
      }
    );
  }

  exportExcel()
  {
    this.excel.exportAsExcelFile(this.personas, 'personas_fisicas');
  }

}
