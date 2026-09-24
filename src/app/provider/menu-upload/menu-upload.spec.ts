import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuUpload } from './menu-upload';

describe('MenuUpload', () => {
  let component: MenuUpload;
  let fixture: ComponentFixture<MenuUpload>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MenuUpload],
    }).compileComponents();

    fixture = TestBed.createComponent(MenuUpload);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
