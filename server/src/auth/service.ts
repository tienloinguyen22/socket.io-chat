import admin from 'firebase-admin';
import { User, UserRepo } from '../users';

export class AuthService {
  private firebase: admin.app.App;
  private userRepo: UserRepo;

  constructor(firebase: admin.app.App, userRepo: UserRepo) {
    this.firebase = firebase;
    this.userRepo = userRepo;
  }

  public async authenticate(payload: { idToken: string }): Promise<User> {
    const verifyIdToken = await this.firebase.auth().verifyIdToken(payload.idToken);
    
    // Already exist user => Update firebaseId
    const existedUser = await this.userRepo.findByEmail(verifyIdToken.email);
    if (existedUser) {
      if (existedUser.firebaseId !== verifyIdToken.uid) {
        return this.userRepo.update(existedUser._id, {
          firebaseId: verifyIdToken.uid,
        });
      }
      return existedUser;
    }

    // New user => Create user record in mongo
    const firebaseInfo = await admin.auth().getUser(verifyIdToken.uid);
    return this.userRepo.create({
      fullName: firebaseInfo.displayName,
      email: verifyIdToken.email,
      firebaseId: verifyIdToken.uid,
    });
  }
}