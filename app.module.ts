import { ChartModule, AccumulationChartModule } from '@syncfusion/ej2-angular-charts';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { Ng2OrderModule } from 'ng2-order-pipe';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';

import {
  FontAwesomeModule,
  FaIconLibrary,
} from '@fortawesome/angular-fontawesome';
import { faSquare, faCheckSquare } from '@fortawesome/free-solid-svg-icons';
import {
  faSquare as farSquare,
  faCheckSquare as farCheckSquare,
} from '@fortawesome/free-regular-svg-icons';
import {
  faStackOverflow,
  faGithub,
  faMedium,
} from '@fortawesome/free-brands-svg-icons';
import { NgxMaskModule, IConfig } from 'ngx-mask';
import { ProductsComponent } from './products/products.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { RouterModule } from '@angular/router';
import { FilterPipe } from './pipes/filter-pipe';

import { HashLocationStrategy, LocationStrategy } from '@angular/common';
// import {
//   AreaSeriesService, BarSeriesService, RangeAreaSeriesService, StepAreaSeriesService, StackingAreaSeriesService, MultiColoredAreaSeriesService,
//   CategoryService, DateTimeService, ScrollBarService, ColumnSeriesService, ChartAnnotationService, RangeColumnSeriesService, StackingColumnSeriesService, LegendService, TooltipService
// } from '@syncfusion/ej2-angular-charts';

// import {
//   PieSeriesService, DataLabelService, FunnelSeriesService, LineSeriesService, AccumulationLegendService, AccumulationTooltipService, AccumulationAnnotationService,
//   AccumulationDataLabelService
// } from '@syncfusion/ej2-angular-charts';
import { FooterComponent } from './footer/footer.component';
import { ProductComponent } from './product/product.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { ConfirmationComponent } from './confirmation/confirmation.component';

export const options: Partial<IConfig> | (() => Partial<IConfig>) = {};

@NgModule({
  declarations: [
    AppComponent,
    ProductsComponent,
    ProductComponent,
    ShoppingCartComponent,
    CheckoutComponent,
    ConfirmationComponent,
    FilterPipe,
    FooterComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FontAwesomeModule,
    NgxPaginationModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgxMaskModule.forRoot(options),
    RouterModule.forRoot([], { useHash: true }),
    ToastrModule.forRoot(),
    Ng2SearchPipeModule,
    Ng2OrderModule,
    ChartModule,
    AccumulationChartModule
  ],
  providers: [
    // AreaSeriesService, BarSeriesService, RangeAreaSeriesService, StepAreaSeriesService, StackingAreaSeriesService, MultiColoredAreaSeriesService,
    // CategoryService, DataLabelService, DateTimeService, ScrollBarService, LineSeriesService, ColumnSeriesService, ChartAnnotationService, FunnelSeriesService,
    // RangeColumnSeriesService, StackingColumnSeriesService, LegendService, TooltipService, AccumulationTooltipService, AccumulationDataLabelService,
    // PieSeriesService, AccumulationLegendService, AccumulationAnnotationService
    {provide: LocationStrategy, useClass:HashLocationStrategy}
  ],
  bootstrap: [AppComponent],
})
export class AppModule {
  constructor(private library: FaIconLibrary) {
    library.addIcons(
      faSquare,
      faCheckSquare,
      farSquare,
      farCheckSquare,
      faStackOverflow,
      faGithub,
      faMedium
    );
  }
}
