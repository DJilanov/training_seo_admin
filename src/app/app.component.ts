import { Component } from '@angular/core';
import { Router, ActivatedRoute, NavigationStart } from '@angular/router';

import { BackendService } from './core/backend/backend.service';
import { EventBusService } from './core/event-bus/event-bus.service';
import { ErrorHandlerService } from './core/error-handler/error-handler.service';

import { AuthService } from './services/auth/auth.service';
import { OrdersService } from './services/orders/orders.service';
import { ProductsService } from './services/products/products.service';
import { MessagesService } from './services/messages/messages.service';
import { CategoriesService } from './services/categories/categories.service';
import { WarrantiesService } from './services/warranties/warranties.service';

@Component({
  selector: 'app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {

  public options = {
    header: false,
    footer: false
  }

  constructor(
    private router: Router,
    private authService: AuthService,
    private ordersService: OrdersService,
    private backendService: BackendService,
    private productsService: ProductsService,
    private messagesService: MessagesService,
    private eventBusService: EventBusService,
    private categoriesService: CategoriesService,
    private errorHandlerService: ErrorHandlerService,
    private warrantiesService: WarrantiesService
  ) {
    this.eventBusService.loggedIn.subscribe(data => this.onLogin(data));
    this.eventBusService.changeSharedOptions.subscribe(
      (options) => this.updateSharedOptions(options)
    );
    this.router.events.subscribe(
      (event) => {
        if (event instanceof NavigationStart) {
          this.eventBusService.emitChangeRoute(event.url);
        }
      }
    );
  };

  private updateSharedOptions(options) {
    this.options.header = options.header || false;
    this.options.footer = options.footer || false;
  }

  private onLogin(eventData) {
    this.backendService.getAllData(
      this.authService.getLoginData()
    ).subscribe(
      data => this.setData(data.json()),
      err => this.errorHandlerService.handleRequestError(err)
    );
  }

  private setData(result) {
    this.productsService.setProducts(result.products);
    this.messagesService.setMessages(result.messages);
    this.ordersService.setOrders(result.orders);
    this.categoriesService.setCategories(result.categories);
    this.warrantiesService.setWarranties(result.warranties);
  }
}
