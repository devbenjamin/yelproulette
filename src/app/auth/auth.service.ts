import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
private token: string='lHbbGBZNC0LpTIrfg29i_biR6RCoYXBNMirgW8gSYOamzQCMP8C4iWeclURizZ7UFJQ_vZkhnXBmHJCGXVpOonNb828YDV_pFE7D-jT8WaIzSlf7gGEEpRLaNSrrW3Yx'

  constructor() { }

  getToken() {
    return this.token;
  }
}
