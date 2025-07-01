import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LendingMain } from './lending-main';

describe('LendingMain', () => {
  let component: LendingMain;
  let fixture: ComponentFixture<LendingMain>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LendingMain]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LendingMain);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
