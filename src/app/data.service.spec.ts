import { TestBed } from '@angular/core/testing';
import { DataService } from './data.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpModule } from '@angular/http';
import {HttpClientModule} from '@angular/common/http';


describe('DataService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      HttpModule,
      HttpClientModule,
      HttpClientTestingModule
    ],
    providers: [DataService]
  }));

  it('should be created', () => {
    const service: DataService = TestBed.get(DataService);
    expect(service).toBeTruthy();
  });
});
