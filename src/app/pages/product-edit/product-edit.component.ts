import { Component, Input, Output } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { BackendService } from '../../core/backend/backend.service';
import { EventBusService } from '../../core/event-bus/event-bus.service';
import { TranslateService } from '../../shared/translation/services/translate.service';
import { ErrorHandlerService } from '../../core/error-handler/error-handler.service';

import { AuthService } from '../../services/auth/auth.service';
import { UtilsService } from '../../services/utils/utils.service';
import { ProductsService } from '../../services/products/products.service';
import { CategoriesService } from '../../services/categories/categories.service';

import { ProductModel } from '../../services/products/product.model';
import { CategoryModel } from '../../services/categories/category.model';
import { ParamsModel } from '../../services/utils/params.model';

const sharredOptions = {
	header: true,
	footer: true
};

@Component({
    selector: 'product-edit',
    styleUrls: ['./product-edit.component.scss'],
    templateUrl: './product-edit.component.html'
})

export class ProductEditComponent {

    public product: ProductModel;
    public categories: Array<CategoryModel>;

    public disableSubmit = false;

    private mainImage = '';
    private otherImages = []

    constructor(
        private router: Router,
        private authService: AuthService,
        private backendService: BackendService,
        private activatedRoute: ActivatedRoute,
        private productsService: ProductsService,
        private eventBusService: EventBusService,
        private translateService: TranslateService,
        private categoriesService: CategoriesService,
        private errorHandlerService: ErrorHandlerService,
    ) {
        this.categories = this.categoriesService.getCategories();
        this.eventBusService.productsUpdate.subscribe(data => this.productUpdated(data));

        let routes = this.router.url.split('/');
        this.updateProduct(routes[routes.length - 1]);
    };

    private updateProduct(id) {
        let object = this.productsService.getProductById(id);
        if(object) {
            if(!Array.isArray(object.params['bg'])) {
                object.params['bg'] = [''];
            }
            if(!Array.isArray(object.params['en'])) {
                object.params['en'] = [''];
            }
            if(!Array.isArray(object.otherImages)) {
                object.otherImages = [];
            }
            if(!object.otherImages.length) {
                object.otherImages = [''];
            }
            if(object.otherImages[object.otherImages.length - 1].length) {
                object.otherImages.push('');
            }
        }
        this.product = object || new ProductModel();
    }

    public addMoreImages() {
        this.product.otherImages.push('');
    }
    
    public fileSelected(file, param, index?) {
        var reader = new FileReader();
        reader.readAsDataURL(file);
        this.disableSubmit = true;
        reader.onload = () => {
            if(param === 'mainImage') {
                this.mainImage = reader.result
            }
            if(param === 'otherImages') {
                this.otherImages[index] = reader.result
            }
            this.disableSubmit = false;
        };
    }

    private productUpdated(product) {
        this.router.navigate(['/products']);
    }
    
    public addParamsField() {
        for(let param in this.product.params) {
            this.product.params[param].push(new ParamsModel());
        }
    }
    
    public removeParamsField(index) {
        for(let param in this.product.params) {
            this.product.params[param].splice(index, 1);
        }
    }
    
    public getLanguage() {
        return this.translateService.getLanguage();
    }

    public getProducts() {
        this.backendService.getProducts().subscribe(
            data => {
              this.productsService.setProducts(data.json())
              this.eventBusService.emitProductsUpdate(data.json())
            },
            err => this.errorHandlerService.handleRequestError(err)
        );
    }

    public deleteProduct() {
        let loginData = this.authService.getLoginData();
        let request = Object.assign(
            {
                product: this.product,
                username: loginData['username'],
                password: loginData['password']
            }, {
                'type': 'delete'
            }
        );
        this.backendService.updateProduct(request).subscribe(
            response => this.getProducts(),
            err => this.errorHandlerService.handleRequestError(err)
        );
    }

    public saveProduct() {
        let loginData = this.authService.getLoginData();
        let request = {
            product: this.product,
            username: loginData['username'],
            password: loginData['password'],
            mainImage: this.mainImage,
            otherImages: this.otherImages
        };
        if(this.product.id) {
            request = Object.assign(request, {'type': 'update'});
        } else {
            request = Object.assign(request, {'type': 'create'});
        }
        this.backendService.updateProduct(request).subscribe(
            response => this.getProducts(),
            err => this.errorHandlerService.handleRequestError(err)
        );
    }
}
