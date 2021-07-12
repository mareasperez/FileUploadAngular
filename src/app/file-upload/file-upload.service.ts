import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FileToUpload } from './file-to-upload';


const API_URL = "https://localhost:44397/api/FileUpload";
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};
@Injectable({
  providedIn: 'root'
})
export class FileUploadService {

  constructor(private http: HttpClient) { }
  uploadFile(theFile: FileToUpload): Observable<any> {
    console.log(theFile);
    return this.http.post<FileToUpload>(API_URL, theFile, httpOptions);
  }
}
