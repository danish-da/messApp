import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommentsView } from './comments-view';

describe('CommentsView', () => {
  let component: CommentsView;
  let fixture: ComponentFixture<CommentsView>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommentsView],
    }).compileComponents();

    fixture = TestBed.createComponent(CommentsView);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
