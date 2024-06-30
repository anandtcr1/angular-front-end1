import {
    Directive,
    HostBinding,
    HostListener,
    Output,
    EventEmitter
} from "@angular/core";
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

export interface FileHandle {
    file: File,
    url: SafeUrl
}

@Directive({
    selector: "[appDrag]"
})
export class DragDirective {
    @Output() files: EventEmitter<FileHandle[]> = new EventEmitter();

    @HostBinding("style.background") private background = "#F3F3F3";

    constructor(private sanitizer: DomSanitizer) { }

    @HostListener("dragover", ["$event"]) public onDragOver(evt: DragEvent) {
        evt.preventDefault();
        evt.stopPropagation();
        this.background = "#F3F3F3";
    }

    @HostListener("dragleave", ["$event"]) public onDragLeave(evt: DragEvent) {
        evt.preventDefault();
        evt.stopPropagation();
        this.background = "#F3F3F3";
    }

    @HostListener('drop', ['$event']) public onDrop(evt: DragEvent) {
        evt.preventDefault();
        evt.stopPropagation();
        this.background = '#F3F3F3';

        let files: FileHandle[] = [];
        if (evt && evt.dataTransfer && evt.dataTransfer.files && evt.dataTransfer.files.length)
            for (let i = 0; i < evt.dataTransfer.files.length; i++) {
                const file = evt.dataTransfer.files[i];
                const url = this.sanitizer.bypassSecurityTrustUrl(window.URL.createObjectURL(file));
                files.push({ file, url });
            }
        if (files && files.length > 0) {
            this.files.emit(files);
        }
    }
}
