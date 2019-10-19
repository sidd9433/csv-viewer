import {IssueCountFilterPipe} from './issuecount-filter.pipe';
import {User} from '../model/User';

describe('IssueCountFilterPipe', () => {
  let pipe: IssueCountFilterPipe;
  const users: User[] = [
    {
      firstName: 'Theo',
      surName: 'Jansen',
      issueCount: 5,
      dob: '1978-01-02T00:00:00'
    },
    {
      firstName: 'Fiona',
      surName: 'de Vries',
      issueCount: 7,
      dob: '1950-11-12T00:00:00'
    },
    {
      firstName: 'Petra',
      surName: 'Boersma',
      issueCount: 1,
      dob: '2001-04-20T00:00:00'
    }
  ];

  beforeEach(() => {
    pipe = new IssueCountFilterPipe();
  });

  it('Should create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should filter based on issue count 7', () => {
    expect(pipe.transform(users, '7')[0].firstName).toEqual('Fiona');
  });

  it('should not filter if searchTerm is not defined', () => {
    expect(pipe.transform(users, undefined).length).toEqual(3);
  });

});
