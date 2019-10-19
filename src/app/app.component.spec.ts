import { TestBed, async } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { IssueCountFilterPipe } from './pipe/issuecount-filter.pipe';
import { FormsModule } from '@angular/forms';
import {BrowserModule} from '@angular/platform-browser';
import {User} from './model/User';

describe('AppComponent', () => {
  let component: AppComponent;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        IssueCountFilterPipe
      ],
      imports: [
        BrowserModule,
        FormsModule
      ],
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'csv-viewer'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('csv-viewer');
  });

  it('should render title', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('.container a h5').textContent).toContain(' Csv Viewer ');
  });


  it('getLoadCallback', () => {

    const fixture = TestBed.createComponent(AppComponent);
    component = fixture.debugElement.children[0].componentInstance;

    const mockValue = ['First name","Sur name","Issue count","Date of birth"',
      'Theo","Jansen",5,"1978-01-02T00:00:00"',
      'Fiona","de Vries",7,"1950-11-12T00:00:00"',
      'Petra","Boersma",1,"2001-04-20T00:00:00"'];
    const result = jasmine.createSpyObj('result', ['split']);
    result.split.and.callFake(() => mockValue);
    const mockReader = { result } as FileReader;
    const mockFile = new File([''], 'filename', { type: 'text/csv' });
    const mockEvt = { target: { files: [mockFile] } };

    const callback: () => void = component.getLoadCallback(mockEvt, mockReader);
    callback();
  });

  it('functions should be called', () => {
    const mockFile = new File([''], 'filename', { type: 'text/csv' });
    const mockEvt = { target: { files: [mockFile] } };
    const mockReader: FileReader = jasmine.createSpyObj('FileReader', ['readAsText', 'onload']);
    spyOn(AppComponent, 'validate').and.returnValue(true);
    spyOn(window as any, 'FileReader').and.returnValue(mockReader);

    component.parseCsv(mockEvt as any);
    expect((window as any).FileReader).toHaveBeenCalled();
    expect(mockReader.readAsText).toHaveBeenCalledWith(mockFile);
  });
});

describe('parseCsv', () => {
  const testCsv = `"First name","Sur name","Issue count","Date of birth"
"Theo","Jansen",5,"1978-01-02T00:00:00"
"Fiona","de Vries",7,"1950-11-12T00:00:00"
"Petra","Boersma",1,"2001-04-20T00:00:00"`;

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

  it('Data list length should match', () => {
    const returnedUsers: any[] = AppComponent.getUsers((testCsv as string).split(/\r\n|\n/), 4);
    expect(returnedUsers.length).toEqual(users.length);
  });

  it('File should have a .csv extension', () => {
    const mockFile = new File([''], 'filename', { type: 'text/csv' });
    expect(AppComponent.validate(mockFile)).toEqual(false);
  });
});
