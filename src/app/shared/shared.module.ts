import { NgModule } from "@angular/core";
import { ButtonModule } from "primeng/button";
import { MenubarModule } from "primeng/menubar";
import { TableModule } from "primeng/table";
import { ToolbarModule } from "primeng/toolbar";
import { CardModule } from 'primeng/card';
import { SplitButtonModule } from 'primeng/splitbutton';
import { ToastModule } from 'primeng/toast';
import { InputTextModule } from 'primeng/inputtext';
import { CommonModule } from "@angular/common";

@NgModule({
    imports: [
        ButtonModule,
        MenubarModule,
        ToolbarModule,
        TableModule,
        CardModule,
        SplitButtonModule,
        ToastModule,
        InputTextModule,
        CommonModule
    ],
    exports: [
        ButtonModule,
        MenubarModule,
        ToolbarModule,
        TableModule,
        CardModule,
        SplitButtonModule,
        ToastModule,
        InputTextModule,
        CommonModule
    ]
})
export class SharedModule {

}