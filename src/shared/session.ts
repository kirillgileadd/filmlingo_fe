import { useSyncExternalStore } from 'react';
import { parseJwt } from './lib/jwt';
import { BroadcastEvents } from './lib/boardcast-events';
import Cookies from 'js-cookie';
import { ACCESS_TOKEN } from '@/src/shared/lib/const';

type Session = {
  userId: number;
  username: string;
};

class SessionStore {
  public updateSessionSteam = new BroadcastEvents<
    | {
        type: 'update';
        token: string;
      }
    | { type: 'remove' }
  >(ACCESS_TOKEN);

  getSessionToken() {
    return Cookies.get(ACCESS_TOKEN) ?? null;
  }

  setSessionToken(token: string) {
    Cookies.set(ACCESS_TOKEN, token, {
      expires: 1 / 24,
      secure: process.env.NODE_ENV === 'production',
    });
    this.updateSessionSteam.emit({ type: 'update', token });
  }

  removeSession() {
    Cookies.remove(ACCESS_TOKEN);
    this.updateSessionSteam.emit({ type: 'remove' });
  }

  getSession() {
    return tokenToSession(this.getSessionToken());
  }

  isSessionExpired() {
    const session = this.getSession();
    return !session || Date.now() > session.exp * 1000;
  }

  useSession = () => {
    const token = useSyncExternalStore(
      this.updateSessionSteam.listen,
      () => this.getSessionToken(),
      () => null,
    );

    return tokenToSession(token);
  };
}

const tokenToSession = (token: string | null) => {
  if (!token) return null;
  return parseJwt<Session>(token);
};

export const appSessionStore = new SessionStore();
