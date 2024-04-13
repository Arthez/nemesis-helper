import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'imageUrl',
    standalone: true,
})
export class ImageUrlPipe implements PipeTransform {

    public transform(imageName: string, prefix?: string, extension?: string): string {
        return `assets/images/${prefix || ''}${imageName || 'INVALID_IMAGE_NAME'}.${extension || 'jpg'}`;
    }

}
