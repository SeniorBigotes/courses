import { Component } from '@angular/core';
import { FormComponent } from '../../components/form/form.component';
import { PreviewComponent } from '../../components/preview/preview.component';

@Component({
  selector: 'app-upload',
  standalone: true,
  imports: [FormComponent, PreviewComponent ],
  templateUrl: './upload.component.html',
  styleUrl: './upload.component.scss'
})
export class UploadComponent {

}
