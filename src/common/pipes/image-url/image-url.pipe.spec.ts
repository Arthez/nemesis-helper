import { ImageUrlPipe } from './image-url.pipe';

describe('ImageUrlPipe', () => {

    let pipe: ImageUrlPipe;

    beforeEach(() => {
        pipe = new ImageUrlPipe();
    });

    describe('transform', () => {
        it('should return proper path when only imageName is provided as empty string', () => {
            expect(pipe.transform('')).toEqual('assets/images/INVALID_IMAGE_NAME.jpg');
        });

        it('should return proper path when only imageName is provided', () => {
            expect(pipe.transform('imageName')).toEqual('assets/images/imageName.jpg');
        });

        it('should return proper path when only extension is not provided', () => {
            expect(pipe.transform('ImageName', 'prefix')).toEqual('assets/images/prefixImageName.jpg');
        });

        it('should return proper path when all params are provided', () => {
            expect(pipe.transform('ImageName', 'prefix', 'svg')).toEqual('assets/images/prefixImageName.svg');
        });

        it('should return proper path when optional params are same as default', () => {
            expect(pipe.transform('ImageName', '', 'jpg')).toEqual('assets/images/ImageName.jpg');
        });

        it('should return proper path when optional params are empty strings', () => {
            expect(pipe.transform('ImageName', '', '')).toEqual('assets/images/ImageName.jpg');
        });

        it('should return proper path when all params are empty strings', () => {
            expect(pipe.transform('', '', '')).toEqual('assets/images/INVALID_IMAGE_NAME.jpg');
        });
    });

});
