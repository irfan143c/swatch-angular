import {Component, OnInit, Input, forwardRef} from '@angular/core';
import {FormControl, NG_VALUE_ACCESSOR, ControlValueAccessor} from '@angular/forms';
import {Observable} from 'rxjs/Observable';
import {startWith} from 'rxjs/operators/startWith';
import {map} from 'rxjs/operators/map';
import { isNullOrUndefined } from 'util';
@Component({
  selector: 'app-autocomplete',
  templateUrl: './autocomplete.component.html',
  styleUrls: ['./autocomplete.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => AutocompleteComponent),
      multi: true
    }
  ]
})
export class AutocompleteComponent implements OnInit, ControlValueAccessor {

  private _selectValue: any = '';
  private _onTouchedCallback: () => {};
  private _onChangeCallback: (_:any) => {};

  myControl: FormControl = new FormControl();
  @Input() placeholder : string;
  @Input() options : any;
  filteredOptions: Observable<string[]>;

  ngOnInit() {
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(val => this.filter(val))
    );
    
  }

  filter(val: string): string[] {
    if(!isNullOrUndefined(this.options)) {
      return this.options.filter(option => option.toLowerCase().indexOf(val.toLowerCase()) !== -1);
    }
  }

  get value(): any {
    return this._selectValue;
  }
  set value(value: any) {

    if (value !== this._selectValue) {
      this._selectValue = value;
      this._onChangeCallback(value);
    }

     this._onTouchedCallback();
  }


  //From ControlValueAccessor interface
  writeValue(value: any) {
    this._selectValue = value;
  }

  //From ControlValueAccessor interface
  registerOnChange(fn: any) {
    this._onChangeCallback = fn;
  }

  //From ControlValueAccessor interface
  registerOnTouched(fn: any) {
    this._onTouchedCallback = fn;
  }
}
