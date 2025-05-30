import { FC } from 'react';

import clsx from 'clsx';
import { RegisterUserForm } from './register-user-form';
import { useRegisterUser } from '../api/use-register-user';
import { useStepper } from '@/src/shared/lib/useStepper';
import { RegisterUserReq } from '../model/types';
import { ConfirmEmail } from './confirm-email';

type RegistrerUserProps = {
  className?: string;
};

export const RegistrerUser: FC<RegistrerUserProps> = ({ className }) => {
  const { active, next } = useStepper(2, null);
  const registerMutation = useRegisterUser();

  const handleRegister = async (data: RegisterUserReq) => {
    await registerMutation.mutateAsync(data);
    next();
  };

  return (
    <div className={clsx('', className)}>
      {active === 0 && (
        <RegisterUserForm
          onSubmit={handleRegister}
          isLoading={registerMutation.isPending}
          error={registerMutation.error?.response?.data.message}
        />
      )}
      {active === 1 && <ConfirmEmail />}
    </div>
  );
};
