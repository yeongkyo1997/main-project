import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { FilesService } from './files.service';
import { FileUpload, GraphQLUpload } from 'graphql-upload';

@Resolver()
export class FilesResolver {
  constructor(private readonly filesService: FilesService) {}

  @Mutation(() => [String])
  uploadFile(
    @Args('files', { type: () => [GraphQLUpload] })
    files: FileUpload[], //
  ) {
    return this.filesService.upload({ files });
  }
}
