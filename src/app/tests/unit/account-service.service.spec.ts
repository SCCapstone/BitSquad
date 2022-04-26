import { TestBed } from '@angular/core/testing';
import { AppModule } from 'src/app/app.module';

import { AccountService } from '../../services/account-service.service';

describe('AccountServiceService', () => {
  let service: AccountService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AppModule]
    });
    service = TestBed.inject(AccountService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  
  it('should get email', () =>{
    service.setCurrentUser("1145191919@gmail.com")
    expect(service.getCurrentUserEmail()).toContain("1145191919@gmail.com")
  })
  
  it('should set through local storage', ()=> {
    localStorage.setItem('email',"test")
    localStorage.setItem('uid',"testID")
    service.setViaLocalStorage()
    expect(service.getCurrentUserEmail()).toContain("test")
    expect(service.getUID()).toContain("testID")
  })
});
