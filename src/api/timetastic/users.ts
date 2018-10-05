import moment from 'moment';
import { get } from 'request';

import { IUser } from './user.model';

export class UserService {
  constructor(private authKey: string) { }

  public getTimetasticUsers(): Promise<IUser[]> {
    return new Promise((resolve, reject) => {
      get('https://app.timetastic.co.uk/api/users', {
        headers: {
          Authorization: `Bearer ${this.authKey}`,
        },
        json: true,
      }, (err, response) => {
        if (err) {
          reject(err);
        }

        resolve(response.body);
      });
    });
  }

  public getUsersWithBirthdayToday(): Promise<IUser[]> {
    return new Promise((resolve, reject) => {
      this.getTimetasticUsers()
        .then((users) => {
          const usersWithBirthdayToday = users.filter((user) => this.isBirthdayToday(user.birthday));
          resolve(usersWithBirthdayToday);
        })
        .catch(reject);
    });
  }

  private isBirthdayToday(birthday: string): boolean {
    if (!birthday) {
      return false;
    }
    const today = moment();
    const birthdayMoment = moment(birthday);
    return today.date() === birthdayMoment.date() &&
      today.month() === birthdayMoment.month();
  }
}
