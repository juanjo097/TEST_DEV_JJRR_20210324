import { Component, OnInit, TemplateRef } from '@angular/core';
import { ToastService } from '../../_services/toast.service';


@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.css'],
  host: { '[class.ngb-toasts]': 'true' }
})
export class ToastComponent implements OnInit {

  constructor(public toast_service: ToastService) { }

  ngOnInit()
  {
  }

  isTemplate(toast)
  {
    return toast.textOrTpl instanceof TemplateRef;
  }


}
