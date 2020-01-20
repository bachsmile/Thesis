import { WINDOW_PROVIDERS } from './../service/window.service';

import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ChatUserComponent } from './chat-user/chat-user.component';
import { ErrorPageComponent } from './page/error-page/error-page.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HeaderComponent } from './component/header/header.component';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { HttpClientModule } from '@angular/common/http';
import { HomePageComponent } from './page/home-page/home-page.component';
import { SalersPageComponent } from './page/salers-page/salers-page.component';
import { AdminPageComponent } from './page/admin-page/admin-page.component';
import { BagPageComponent } from './page/bag-page/bag-page.component';
import { ShopPageComponent } from './page/shop-page/shop-page.component';
import { InfoProductPageComponent } from './page/info-product-page/info-product-page.component';
import { InforUserPageComponent } from './page/infor-user-page/infor-user-page.component';
import { LoginPageComponent } from './page/login-page/login-page.component';
import { ButtonNowComponent } from './tools/button-now/button-now.component';
import { ButtonNowWhiteComponent } from './tools/button-now-white/button-now-white.component';
import { FooterComponent } from './component/footer/footer.component';
import { Load1Component } from './tools/load1/load1.component';
import { Layout1Component } from './page/home-page/Theme/layout1/layout1.component';
import { DesignNowComponent } from './page/home-page/design-now/design-now.component';
import { HomeComponent } from './page/home-page/home/home.component';
import { MenuLeftSalesComponent } from './component/component-seller/menu-left-sales/menu-left-sales.component';
import { AuctionManagementComponent } from './page/salers-page/auction-management/auction-management.component';
import { CharityMoneyManagementComponent } from './page/salers-page/charity-money-management/charity-money-management.component';
import { CharityPlaceManagementComponent } from './page/salers-page/charity-place-management/charity-place-management.component';
import { CustomerManagementComponent } from './page/salers-page/customer-management/customer-management.component';
import { DashboardManagementComponent } from './page/salers-page/dashboard-management/dashboard-management.component';
import { OrdersManagementComponent } from './page/salers-page/orders-management/orders-management.component';
import { ProductManagementComponent } from './page/salers-page/product-management/product-management.component';
import { StockManagementComponent } from './page/salers-page/stock-management/stock-management.component';
import { CategorySallerManagementComponent } from './page/salers-page/category-saller-management/category-saller-management.component';
import { AllOrdersComponent } from './page/salers-page/orders-management/all-orders/all-orders.component';
import { BatchProcessingComponent } from './page/salers-page/orders-management/batch-processing/batch-processing.component';
import { HeaderAdminComponent } from './component/header-admin/header-admin.component';
import { FormRegisterComponent } from './tools/form-register/form-register.component';
import { ToastrModule } from 'ngx-toastr';
import { InfoProductComponent } from './page/salers-page/product-management/info-product/info-product.component';
import { AddProductsComponent } from './page/salers-page/product-management/add-products/add-products.component';
import { FormAddComponent } from './page/salers-page/product-management/add-products/form-add/form-add.component';
import { ShopHomeComponent } from './page/shop-page/shop-home/shop-home.component';
import { MenuModule } from '@progress/kendo-angular-menu';
import { DashboardAdminComponent } from './page/admin-page/dashboard-admin/dashboard-admin.component';
import { MenuLeftComponent } from './component/component-admin/menu-left/menu-left.component';
import { CategotyAdminComponent } from './page/admin-page/categoty-admin/categoty-admin.component';
import { UserAdminComponent } from './page/admin-page/user-admin/user-admin.component';
import { ProductsAdminComponent } from './page/admin-page/products-admin/products-admin.component';
import { AuctionAdminComponent } from './page/admin-page/auction-admin/auction-admin.component';
import { CharityFundAdminComponent } from './page/admin-page/charity-fund-admin/charity-fund-admin.component';
import { ChatityPlaceAdminComponent } from './page/admin-page/chatity-place-admin/chatity-place-admin.component';
import { CategoryListComponent } from './component/category-list/category-list.component';
import { FormLoginComponent } from './tools/form-login/form-login.component';
import { FormUpdateComponent } from './tools/form-update/form-update.component';
import { FormAddBrandComponent } from './tools/form-add-brand/form-add-brand.component';
import { ShopAccordingToGenderComponent } from './page/shop-page/shop-according-to-gender/shop-according-to-gender.component';
import { ShopItemComponent } from './page/shop-page/shop-item/shop-item.component';
import { LayoutModule } from '@progress/kendo-angular-layout';
import { DialogsModule } from '@progress/kendo-angular-dialog';
import { UpdateProductComponent } from './page/admin-page/products-admin/update-product/update-product.component';
import { EventAdminComponent } from './page/admin-page/event-admin/event-admin.component';
import { AddPlaceComponent } from './page/admin-page/chatity-place-admin/add-place/add-place.component';
import { SalerAddPlaceComponent } from './page/salers-page/charity-place-management/saler-add-place/saler-add-place.component';
import { ShopMallComponent } from './page/shop-page/shop-mall/shop-mall.component';
import { InfoItemComponent } from './page/shop-page/info-item/info-item.component';
import { UpdateComponent } from './page/salers-page/product-management/update/update.component';
import { ContactComponent } from './page/home-page/contact/contact.component';
import { ShippingPageComponent } from './page/shipping-page/shipping-page.component';
import { ManageFundPublicComponent } from './page/manage-fund-public/manage-fund-public.component';

// import { ChatRoomModule } from '../app/chat-room/chat-room.module'
// import { ChatRoomComponent } from './chat-room/chat-room.component';
// import { SharedModule } from './chat-room/shared/shared.module';
@NgModule({
  declarations: [
    AppComponent,
   // ChatUserComponent,
    ErrorPageComponent,
    HeaderComponent,
    HomePageComponent,
    SalersPageComponent,
    AdminPageComponent,
    BagPageComponent,
    InfoProductPageComponent,
    InforUserPageComponent,
    LoginPageComponent,
    ButtonNowComponent,
    ButtonNowWhiteComponent,
    FooterComponent,
    Load1Component,
    Layout1Component,
    DesignNowComponent,
    HomeComponent,
    MenuLeftSalesComponent,
    AuctionManagementComponent,
    CharityMoneyManagementComponent,
    CharityPlaceManagementComponent,
    CustomerManagementComponent,
    DashboardManagementComponent,
    OrdersManagementComponent,
    ProductManagementComponent,
    StockManagementComponent,
    CategorySallerManagementComponent,
    AllOrdersComponent,
    BatchProcessingComponent,
    HeaderAdminComponent,
    FormRegisterComponent,
    InfoProductComponent,
    AddProductsComponent,
    FormAddComponent,
    FormLoginComponent,
    FormAddBrandComponent,
    ShopPageComponent,
    ShopHomeComponent,
    DashboardAdminComponent,
    MenuLeftComponent,
    CategotyAdminComponent,
    UserAdminComponent,
    ProductsAdminComponent,
    AuctionAdminComponent,
    CharityFundAdminComponent,
    FormUpdateComponent,
    ChatityPlaceAdminComponent,
    CategoryListComponent,
    ShopAccordingToGenderComponent,
    ShopItemComponent,
    UpdateProductComponent,
    EventAdminComponent,
    AddPlaceComponent,
    SalerAddPlaceComponent,
    ShopMallComponent,
    InfoItemComponent,
    UpdateComponent,
    ContactComponent,
    ShippingPageComponent,
    ManageFundPublicComponent,
    //ChatRoomComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SlickCarouselModule,
    HttpClientModule,
    ToastrModule.forRoot(),
    MenuModule,
    LayoutModule,
    DialogsModule,
    // ChatRoomModule,
    // SharedModule,
  ],
  providers: [WINDOW_PROVIDERS],
  bootstrap: [AppComponent]
})
export class AppModule { }
