import {Pipe, PipeTransform} from '@angular/core';
import {User} from '../model/User';

@Pipe({
  name: 'issueCountFilter'
})
export class IssueCountFilterPipe implements PipeTransform {

  transform(users: User[], searchTerm: string): User[] {
    if (!users || !searchTerm) {
      return users;
    }
    return users.filter(user => user.issueCount.toString() === searchTerm);
  }
}
