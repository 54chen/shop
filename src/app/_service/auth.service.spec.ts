import { TestBed } from '@angular/core/testing';
import { HttpErrorHandler } from '../http-error-handler.service';
import { AuthService } from '../_service/auth.service';
import { MessageService } from '../message.service';
import { User,Role } from '../_models/user';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { InMemoryDataService } from '../in-memory-data.service';


describe('AuthService', () => {
  let service: AuthService;
  let httpMock: HttpTestingController;
  const user:User = {
    id: 1,
    username: 'admin',
    password: 'qwer4321!',
    role: Role.ROLE_ADMIN
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ],
      providers: [ 
        { provide: InMemoryDataService, useClass: InMemoryDataService },
        HttpErrorHandler,
        MessageService,
      ]

    });

    service = TestBed.inject(AuthService);
    httpMock = TestBed.inject(HttpTestingController);

  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get user from API', () => {

    service.getUsersById(1).subscribe((response) => {
      console.log(response);
      expect(response).toEqual(user);
    });

    const request = httpMock.expectOne('api/users/1');
    expect(request.request.method).toBe('GET');
    request.flush(user);
  });

  it('should get user by name from API', () => {
  
    service.getUsersByUsername("admin").subscribe((response) => {
      console.log(response);
      expect(response).toEqual([user]);
    });

    const request = httpMock.expectOne('api/users?username=admin');
    expect(request.request.method).toBe('GET');
    request.flush([user]);
  });

  it('should update user by name from API', () => {
    service.updateUser(user).subscribe((response) => {
      console.log(response);
      expect(response).toEqual(user);
    });

    const request = httpMock.expectOne('api/users');
    expect(request.request.method).toBe('PUT');
    request.flush(user);
  });


  it('should login user by name and pass successfully from API', () => {
    service.login(user.username, user.password).subscribe((response) => {
      console.log(response);
      expect(response).toEqual(true);
    });

    const request = httpMock.expectOne('api/users?username='+user.username+'&password='+user.password);
    expect(request.request.method).toBe('GET');
    request.flush([user]);
  });

});
