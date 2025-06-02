import { createContext, useContext, useEffect, useState } from 'react';
import { AuthModal } from '@/src/widgets/auth';
import { appSessionStore } from '@/src/shared/session';

type AuthModalContextType = {
  openAuth: () => Promise<void>;
};

const AuthModalContext = createContext<AuthModalContextType | undefined>(
  undefined,
);

export const AuthModalProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const session = appSessionStore.useSession();
  const [modalProps, setModalProps] = useState<{ onClose: () => void }>();

  const modal = modalProps ? <AuthModal {...modalProps} /> : undefined;

  useEffect(() => {
    if (session) {
      setModalProps(undefined);
    }
  }, [session]);

  const openAuth = () => {
    return new Promise<undefined>(() => {
      setModalProps({
        onClose: () => {
          setModalProps(undefined);
        },
      });
    });
  };

  return (
    <AuthModalContext.Provider value={{ openAuth }}>
      {children}
      {modal}
    </AuthModalContext.Provider>
  );
};

export const useAuthModal = () => {
  const ctx = useContext(AuthModalContext);
  if (!ctx)
    throw new Error('useAuthModal must be used within AuthModalProvider');
  return ctx;
};
