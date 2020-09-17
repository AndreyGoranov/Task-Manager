import { HttpClientModule } from '@angular/common/http';
import { TestBed, async } from '@angular/core/testing';
import { TaskManipulationService } from './task-manipulation.service';

describe('TaskManipulationService', () => {
  let service: TaskManipulationService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule]
    });
    service = TestBed.inject(TaskManipulationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('getTasks should retrieve all tasks', (done: DoneFn) => {
    service.getTasks().subscribe(value => {
      expect(value.length).toBeGreaterThan(0);
      done();
    });
  });

});
