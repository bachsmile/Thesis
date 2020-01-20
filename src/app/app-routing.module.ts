import { ManageFundPublicComponent } from './page/manage-fund-public/manage-fund-public.component';
import { ShippingGuard } from './../service/Guard/shipping.guard';
import { InforUserPageComponent } from './page/infor-user-page/infor-user-page.component';
import { UpdateComponent } from './page/salers-page/product-management/update/update.component';
import { FormAddComponent } from './page/salers-page/product-management/add-products/form-add/form-add.component';
import { BagGuard } from './../service/Guard/bag.guard';
import { AdminGuard } from './../service/Guard/admin.guard';
import { InfoItemComponent } from './page/shop-page/info-item/info-item.component';
import { ShopMallComponent } from './page/shop-page/shop-mall/shop-mall.component';
import { SalerAddPlaceComponent } from './page/salers-page/charity-place-management/saler-add-place/saler-add-place.component';
import { AddPlaceComponent } from './page/admin-page/chatity-place-admin/add-place/add-place.component';
import { EventAdminComponent } from './page/admin-page/event-admin/event-admin.component';
import { ProductsAdminComponent } from './page/admin-page/products-admin/products-admin.component';
import { DashboardAdminComponent } from './page/admin-page/dashboard-admin/dashboard-admin.component';
import { UserAdminComponent } from './page/admin-page/user-admin/user-admin.component';
import { ChatityPlaceAdminComponent } from './page/admin-page/chatity-place-admin/chatity-place-admin.component';
import { CharityFundAdminComponent } from './page/admin-page/charity-fund-admin/charity-fund-admin.component';
import { ShopPageComponent } from './page/shop-page/shop-page.component';
import { AdminPageComponent } from './page/admin-page/admin-page.component';
import { DashboardManagementComponent } from './page/salers-page/dashboard-management/dashboard-management.component';
import { CustomerManagementComponent } from './page/salers-page/customer-management/customer-management.component';
import { CharityPlaceManagementComponent } from './page/salers-page/charity-place-management/charity-place-management.component';
import { CharityMoneyManagementComponent } from './page/salers-page/charity-money-management/charity-money-management.component';
import { CategorySallerManagementComponent } from './page/salers-page/category-saller-management/category-saller-management.component';
import { AuctionManagementComponent } from './page/salers-page/auction-management/auction-management.component';
import { LoginPageComponent } from './page/login-page/login-page.component';
import { OrdersManagementComponent } from './page/salers-page/orders-management/orders-management.component';
import { DesignNowComponent } from "./page/home-page/design-now/design-now.component";
import { ChatUserComponent } from "./chat-user/chat-user.component";
import { ErrorPageComponent } from "./page/error-page/error-page.component";
import { AppComponent } from "./app.component";
import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { ChatComponent } from "./chat-room/chat/chat.component";
import { ChatRoomComponent } from "./chat-room/chat-room.component";
import { HomePageComponent } from "./page/home-page/home-page.component";
import { HomeComponent } from "./page/home-page/home/home.component";
import { SalersPageComponent } from './page/salers-page/salers-page.component';
import { SellsAccountGuardGuard } from 'src/service/Guard/sells-account-guard.guard';
import { ProductManagementComponent } from './page/salers-page/product-management/product-management.component';
import { StockManagementComponent } from './page/salers-page/stock-management/stock-management.component';
import { ShopHomeComponent } from './page/shop-page/shop-home/shop-home.component';
import { ShopAccordingToGenderComponent } from './page/shop-page/shop-according-to-gender/shop-according-to-gender.component';
import { ShopItemComponent } from './page/shop-page/shop-item/shop-item.component';
import { BagPageComponent } from './page/bag-page/bag-page.component';
import { CategotyAdminComponent } from './page/admin-page/categoty-admin/categoty-admin.component';
import { AuctionAdminComponent } from './page/admin-page/auction-admin/auction-admin.component';
import { UpdateProductComponent } from './page/admin-page/products-admin/update-product/update-product.component';
import { AddProductsComponent } from './page/salers-page/product-management/add-products/add-products.component';
import { InfoProductComponent } from './page/salers-page/product-management/info-product/info-product.component';
import { ContactComponent } from './page/home-page/contact/contact.component';
import { ShippingPageComponent } from './page/shipping-page/shipping-page.component';

const routes: Routes = [
    {
        path: "",
        pathMatch: "full",
        redirectTo: "home"
    },
    {
        path: "",
        // component: AppComponent,
        children: [
            {
                path: "ChatRoom",
                loadChildren: "./chat-room/chat-room.module#ChatRoomModule"
                // component:ChatComponent
            },
            {
                path: "Auction",
                redirectTo:'ChatRoom'
            },
            {
              path: "Shop",
              pathMatch: "full",
              redirectTo: "Shop/Shop-Home"
            },
            {
              path: "Shop",
              component:ShopPageComponent,
              children:[
                {
                  path:'Shop-Home',
                  component:ShopHomeComponent
                },
                {
                    path:'Shop-Gender/:id',
                    component:ShopAccordingToGenderComponent
                },
                {
                  path:'type/:id',
                  component:ShopItemComponent
                },
                {
                  path:'mall/:id',
                  component:ShopMallComponent
                },
                {
                  path:'info/:id',
                  component:InfoItemComponent
                }
              ]
             },
            {
                path: "home",
                pathMatch: "full",
                redirectTo: "home/home-page"
            },
            {
                path: "home",
                component: HomePageComponent,
                children: [
                    {
                        path: "home-page",
                        component: HomeComponent
                    },
                    {
                        path: "design-now",
                        component: DesignNowComponent
                    }
                ]
            },
            {
              path:'admin',
              redirectTo:'admin/Dashboard-manage',
              pathMatch:'full'
            },
            {
              path:'admin',
              component:AdminPageComponent,
              canActivate:[AdminGuard],
              children:[
                {
                  path:'Auction-manage',
                  component:AuctionAdminComponent,
                },
                {
                  path:'Category-manage',
                  component:CategotyAdminComponent,
                },
                {
                  path:'Charity-Fund-manage',
                  component:CharityFundAdminComponent,
                },
                {
                  path:'Charity-place-manage',
                  component:ChatityPlaceAdminComponent,
                },{
                  path:'Add-place',
                  component:AddPlaceComponent
                },
                {
                  path:'User-manage',
                  component:UserAdminComponent,
                },
                {
                  path:'Dashboard-manage',
                  component:DashboardAdminComponent,
                },
                {
                  path:'Product-manage',
                  component:ProductsAdminComponent,
                },
                {
                  path:'Update-Product/:id',
                  component:UpdateProductComponent
                },
                {
                  path:'Event-manage',
                  component:EventAdminComponent
                }
              ]
            },
            {
              path:'sale-page',
              redirectTo:'sale-page/Dashboard-manage',
              pathMatch:'full'
            },
            {
                path:'sale-page',
                component:SalersPageComponent,
                canActivate:[SellsAccountGuardGuard],
                children:[
                  {
                    path:'Orders-manage',
                    component:OrdersManagementComponent,
                  },
                  {
                    path:'Auction-manage',
                    component:AuctionManagementComponent,
                  },
                  {
                    path:'Charity-money-manage',
                    component:CharityMoneyManagementComponent,
                  },
                  {
                    path:'Charity-place-manage',
                    component:CharityPlaceManagementComponent,
                  },
                  {
                    path:'Add-Place',
                    component:SalerAddPlaceComponent
                  },
                  {
                    path:'Customer-manage',
                    component:CustomerManagementComponent,
                  },
                  {
                    path:'Dashboard-manage',
                    component:DashboardManagementComponent,
                  },
                  {
                    path:'Product-manage',
                    component:ProductManagementComponent,
                  },
                  {
                    path:'New-product',
                    component:AddProductsComponent
                  },
                  {
                    path:'Stock-manage',
                    component:StockManagementComponent,
                  },
                  {
                    path:'new-product',
                    component:AddProductsComponent
                  },
                  {
                    path:'new',
                    component:FormAddComponent
                  },
                  {path:'info/:id',
                    component:InfoProductComponent
                  },
                  {
                    path:'update/:id',
                    component:UpdateComponent
                  }
                ]
            }
        ]
    },
    {
      path:'Shipping-page',
      component:ShippingPageComponent,
      canActivate:[ShippingGuard]
    },
    {
      path:'List-fund-public',
      component:ManageFundPublicComponent
    }
    ,
    {
      path:'login',
      component:LoginPageComponent
    },
    {
      path: 'infor',
      component:InforUserPageComponent
    },
    {
      path:'Contact',
      component:ContactComponent
    }
    ,
    {
      path:'bag',
      component:BagPageComponent,
      canActivate:[BagGuard]
    },
    {
        path: "error",
        component: ErrorPageComponent
    },
    {
        path: "**",
        redirectTo: "error",
        pathMatch: "full"
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {}
