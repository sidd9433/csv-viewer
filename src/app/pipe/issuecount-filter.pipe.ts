import {Pipe, PipeTransform} from '@angular/core';
import {User} from '../model/User';

@Pipe({
  name: 'issueCountFilter'
})
export class IssueCountFilterPipe implements PipeTransform {

  transform(users: User[], searchTerm: number): User[] {
    if (!users || !searchTerm) {
      return users;
    }
    // tslint:disable-next-line:triple-equals
    return users.filter(user => user.issueCount.valueOf() == searchTerm);
  }
}
