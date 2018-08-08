import {Injectable} from '@angular/core';
import { BmobService } from '../../../shared/services/bmob.service';


@Injectable({
  providedIn: 'root'
})
export class DutyRosterService extends BmobService {

  constructor() {
    super();
  }

}
