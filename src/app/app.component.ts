import { Component } from '@angular/core';
import {User} from './model/User';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'csv-viewer';
  records: any[] = [];
  searchTerm: string;

  static validate(file: any) {
    return file.name.endsWith('.csv');
  }

  static getUsers(data: any, headerLength: any) {
    const users = [];

    for (let i = 1; i < data.length; i++) {
      const record = (data[i] as string).split(',');
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
    if (AppComponent.validate($event.target.files[0])) {
      const input = $event.target;
      const reader = new FileReader();
      reader.readAsText(input.files[0]);

      reader.onload = this.getLoadCallback($event, reader);

      reader.onerror = () => {
        console.log('Could not read the file');
      };

    } else {
      alert('Only .csv file is allowed');
      this.records = [];
    }
  }

  getLoadCallback(evt: any, fileReader: FileReader): () => void {
    return () => {
      const data = (fileReader.result as string).split(/\r\n|\n/);
      const headers = data[0].split(',');
      this.records = AppComponent.getUsers(data, headers.length);
    };
  }
}
