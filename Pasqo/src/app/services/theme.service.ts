import { Injectable, RendererFactory2, Inject } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {

  constructor(private rendererFactory: RendererFactory2, @Inject(Document) private document: Document ) { }
}
