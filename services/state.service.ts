import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { State } from '../interfaces/state';
import * as states from '../json/states.json';

@Injectable({
  providedIn: 'root',
})
export class StateService {
  constructor() {}

  states: State[];

  getStates() {
    this.states = (states as any).default;
  }
}
