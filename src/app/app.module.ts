import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
/* Angular material */
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularMaterialModule } from './materialModule/angular-material.module';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { MyModalComponent } from './pages/my-modal/my-modal.component';
import { BoardComponent } from './pages/board/board.component';

// import { StudentModel } from './studentRepository.model';
// import { SimpleDataSource } from './datasource.model';
import {DragDropModule} from '@angular/cdk/drag-drop';
import { AddTodoComponent } from './pages/add-todo/add-todo.component';


@NgModule({
  declarations: [
    AppComponent,
    MyModalComponent,
    BoardComponent,
    AddTodoComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AngularMaterialModule,
    FormsModule,
    DragDropModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  entryComponents: [MyModalComponent]
})
export class AppModule { }