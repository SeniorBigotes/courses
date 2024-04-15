import { Component } from '@angular/core';
import { VideoComponent } from '../../components/video/video/video.component';
import { VideoListComponent } from '../../components/video-list/video-list/video-list.component';

@Component({
  selector: 'app-view',
  standalone: true,
  imports: [VideoComponent, VideoListComponent],
  templateUrl: './view.component.html',
  styleUrl: './view.component.scss'
})
export class ViewComponent {

}
