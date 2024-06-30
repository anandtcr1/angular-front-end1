import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { HeaderComponent } from './components/header/header.component';
import { DragDirective } from './directives/drag-drop.directive';
import { PopupComponent } from './components/popup/popup.component';
import { MaterialModule } from './modules/material.module';
import { LanguagePipe } from './pipes/language.pipe';
import { LangSelectionPopupComponent } from './components/lang-selection-popup/lang-selection-popup.component';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { PanelComponent } from './components/panel/panel.component';
import { MenuComponent } from './components/menu/menu.component';
import { FormErrorHandelingComponent } from './components/form-error-handeling/form-error-handeling.component';
import { MessagePopupComponent } from './components/message-popup/message-popup.component';
import { LottieContainerComponent } from './components/lottie-container/lottie-container.component';
import { LottieModule } from 'ngx-lottie';
import player from 'lottie-web';
import { FaIconLibrary, FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { fas } from '@fortawesome/free-solid-svg-icons'
import { far } from '@fortawesome/free-regular-svg-icons'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { BreadcrumbComponent } from './components/breadcrumb/breadcrumb.component';
import { HeaderIconsComponent } from './components/header-icons/header-icons.component';
import { HeaderSearchAreaComponent } from './components/header-search-area/header-search-area.component';
import { DirectionDirective } from './directives/direction.directive';
import { CoverComponent } from './components/cover/cover.component';
import { ProjectComponent } from './components/project/project.component';
import { LoaderComponent } from './components/loader/loader.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
export function playerFactory() {
  return player;
}

@NgModule({
  declarations: [
    HeaderComponent,
    DragDirective,
    PopupComponent,
    LangSelectionPopupComponent,
    LanguagePipe,
    PanelComponent,
    MenuComponent,
    FormErrorHandelingComponent,
    MessagePopupComponent,
    LottieContainerComponent,
    BreadcrumbComponent,
    HeaderIconsComponent,
    HeaderSearchAreaComponent,
    DirectionDirective,
    CoverComponent,
    ProjectComponent,
    LoaderComponent,
    NotFoundComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    MaterialModule,
    FormsModule,
    LottieModule.forRoot({ player: playerFactory }),
    FontAwesomeModule,
  ],
  exports: [
    HeaderComponent,
    DragDirective,
    MaterialModule,
    PopupComponent,
    LanguagePipe,
    MenuComponent,
    FormErrorHandelingComponent,
    LottieContainerComponent,
    FontAwesomeModule,
    DirectionDirective,
    CoverComponent,
    ProjectComponent,
    LoaderComponent,
    NotFoundComponent
  ],
  providers: [LanguagePipe]
})
export class SharedModule {
  constructor(library: FaIconLibrary) {
    library.addIconPacks(fas, far, fab)
  }

  static forRoot(): ModuleWithProviders<SharedModule> {
    return { ngModule: SharedModule, providers: [] };
  }
}