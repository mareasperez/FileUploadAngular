import { Component, OnInit } from '@angular/core';
import { FileUploadService } from './file-upload.service';
import { FileToUpload } from './file-to-upload';
const MAX_SIZE: number = 1048576;
@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.css']
})
export class FileUploadComponent implements OnInit {
  theFile: any = null;
  messages: string[] = [];
  constructor(private uploadService: FileUploadService) { }

  ngOnInit(): void {
  }
  onFileChange(event: any) {
    this.theFile = null;
    if (event.target.files && event.target.files.length > 0) {
      // Don't allow file sizes over 1MB
      if (event.target.files[0].size < MAX_SIZE) {
        // Set theFile property
        this.theFile = event.target.files[0];
      }
      else {
        // Display error message
        this.messages.push("File: " + event.target.files[0].name + " is too large to upload.");
      }
    }
  }
  private readAndUploadFile(theFile: any) {
    let file = new FileToUpload();

    // Set File Information
    file.fileName = theFile.name;
    // file.fileSize = theFile.size;
    file.fileType = theFile.type;
    file.lastModifiedTime = theFile.lastModified;
    file.lastModifiedDate = theFile.lastModifiedDate;

    // Use FileReader() object to get file to upload
    // NOTE: FileReader only works with newer browsers
    let reader = new FileReader();

    // Setup onload event for reader
    reader.onload = () => {
      // Store base64 encoded representation of file
      // @ts-ignore: Object is possibly 'null'.
      file.fileAsBase64 = reader.result.toString();

      // POST to server
      this.uploadService.uploadFile(file).subscribe(resp => {
        console.log(resp);
        this.messages.push("Upload complete");
      });
    }

    // Read the file
    reader.readAsDataURL(theFile);
  }
  uploadFile(): void {
    this.readAndUploadFile(this.theFile);
  }

}
