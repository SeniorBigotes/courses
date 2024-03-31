import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SideMainComponent } from './side-main.component';

describe('SideMainComponent', () => {
  let component: SideMainComponent;
  let fixture: ComponentFixture<SideMainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SideMainComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SideMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
