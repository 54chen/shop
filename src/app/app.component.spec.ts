import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProductListComponent } from './product/product-list.component';
import { TopBarComponent } from './top-bar/top-bar.component';
import { CartComponent } from './cart/cart.component';

import { AdminModule } from './admin/admin.module';
import { AuthModule } from './auth/auth.module';

import { HttpErrorHandler } from './http-error-handler.service';
import { MessageService } from './message.service';

import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService } from './in-memory-data.service';
import { MessagesComponent } from './messages/messages.component';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';


describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        RouterTestingModule,
        AdminModule,
        AuthModule,
        AppRoutingModule,
        HttpClientInMemoryWebApiModule.forRoot(
          InMemoryDataService, {
            dataEncapsulation: false,
            passThruUnknownUrl: true,
            put204: false // return entity after PUT/update
          }
        )
      ],
      providers: [ 
        { provide: InMemoryDataService, useClass: InMemoryDataService },
        HttpErrorHandler,
        MessageService,],


      declarations: [
        AppComponent,
        ProductListComponent,
        TopBarComponent,
        CartComponent,
        MessagesComponent,
      ],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'shop'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('shop');
  });

  it('should render title', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h1')?.textContent).toContain('SHOP');
  });
});
