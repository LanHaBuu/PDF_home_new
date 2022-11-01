import { ApiProperty } from '@nestjs/swagger';
import { FileInfoVm } from './FileInfoVM';

export class FileResponseVm {
    @ApiProperty() message: string;

    @ApiProperty({ type: FileInfoVm })
    file: FileInfoVm;
}