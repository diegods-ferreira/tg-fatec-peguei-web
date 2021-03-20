import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import React, { useCallback, useRef } from 'react';
import { useLocation } from 'react-router';
import logoImg from './assets/logo.svg';
import { useToast } from './hooks/toast';
import Button from './components/Button';
import Input from './components/Input';
import { Container } from './styles';
import * as Yup from 'yup';
import api from './services/api';
import getValidationErrors from './utils/getValidationErrors';
import { FiLock } from 'react-icons/fi';

interface ResetPasswordFormData {
  password: string;
  password_confirmation: string;
}

const App = () => {
  const formRef = useRef<FormHandles>(null);

  const { addToast } = useToast();
  const location = useLocation();

  const handleSubmit = useCallback(
    async (data: ResetPasswordFormData) => {
      console.log(data);
      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          password: Yup.string().required('Senha obrigatória'),
          password_confirmation: Yup.string().oneOf(
            [Yup.ref('password'), undefined],
            'Confirmação de senha incorreta',
          ),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        const { password, password_confirmation } = data;
        const token = location.search.replace('?token=', '');

        if (!token) {
          throw new Error();
        }

        await api.post('/password/reset', {
          password,
          password_confirmation,
          token,
        });

        addToast({
          type: 'success',
          title: 'Senha alterada com sucesso!',
          description: 'Quando for logar na aplicação novamente utilize a nova senha.',
        });

        formRef.current?.clearField('password');
        formRef.current?.clearField('password_confirmation');
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);

          formRef.current?.setErrors(errors);

          return;
        }

        addToast({
          type: 'error',
          title: 'Erro ao resetar senha',
          description: 'Ocorreu um erro ao resetar sua senha, tente novamente.',
        });
      }
    }, [addToast, location.search]
  );

  return (
    <Container>
      <img src={logoImg} alt="Peguei"/>

      <h1>Redefinir a senha</h1>

      <Form ref={formRef} onSubmit={handleSubmit}>
        <Input
          type="password"
          icon={FiLock}
          name="password"
          placeholder="Nova senha"
        />

        <Input
          type="password"
          icon={FiLock}
          name="password_confirmation"
          placeholder="Confirmar senha"
        />

        <Button type="submit">Resetar senha</Button>
      </Form>
    </Container>
  );
}

export default App;