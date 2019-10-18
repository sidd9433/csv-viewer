import { Component } from '@angular/core';
import {User} from './User';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'csv-viewer';
  public records: any[] = [];

  static validate(file: any) {
    return file.name.endsWith('.csv');
  }

  static getHeaders(csvRecordsArr: any) {
    const headers = (csvRecordsArr[0] as string).split(',');
    const headerArray = [];
    for (const header of headers) {
      headerArray.push(header);
    }
    return headerArray;
  }


  static getUsers(csvRecordsArray: any, headerLength: any) {
    const users = [];

    for (let i = 1; i < csvRecordsArray.length; i++) {
      const record = (csvRecordsArray[i] as string).split(',');
      if (record.length === headerLength) {
        const user: User = new User();
        user.firstName = record[0].trim().replace(/"/g, '');
        user.surName = record[1].trim().replace(/"/g, '');
        user.issueCount = parseInt(record[2]);
        user.dob = record[3].replace(/"/g, '');
        users.push(user);
      }
    }
    return users;
  }

  parseCsv($event: any): void {

    const text = [];
    const files = $event.srcElement.files;

    if (AppComponent.validate(files[0])) {

      const input = $event.target;
      const reader = new FileReader();
      reader.readAsText(input.files[0]);

      reader.onload = () => {
        const data = (reader.result as string).split(/\r\n|\n/);

        const headers = AppComponent.getHeaders(data);
        this.records = AppComponent.getUsers(data, headers.length);
      };

      reader.onerror = () => {
        console.log('error is occurred while reading file!');
      };

    } else {
      alert('Please import valid .csv file.');
      // this.fileReset();
    }
  }
}
