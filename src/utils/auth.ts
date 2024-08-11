import axios from 'axios';
import Cookies from 'js-cookie';

// Função de login
export const loginUser = async (email: string, password: string) => {
  try {
    const response = await axios.post('http://localhost:8000/auth/login', { email, password }, { withCredentials: true });
    
    if (response.status === 200) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.error('Erro ao fazer login:', error);
    return false;
  }
};



// Função de registro
export const registerUser = async (formData: any) => {
  const data = new FormData();
  Object.keys(formData).forEach(key => {
    data.append(key, formData[key]);
  });

  const response = await axios.post('/api/auth/register', data);

  // O token JWT será automaticamente armazenado como cookie no backend
  if (response.data.message === 'Registration successful') {
    return true;
  } else {
    return false;
  }
};

// Função para verificar se o usuário está autenticado
export const verifyAuth = async (): Promise<boolean> => {
  try {
    const response = await axios.get('/api/auth/profile', {
      withCredentials: true, // Certifique-se de que as credenciais (cookies) sejam enviadas com a solicitação
    });
    return response.status === 200;
  } catch (error) {
    return false;
  }
};

// Função para verificar se o usuário é admin ou owner
export const verifyAdminAuth = async (): Promise<boolean> => {
  try {
    const response = await axios.get('/api/auth/profile', {
      withCredentials: true,
    });

    // Verifica se o usuário é admin ou owner
    if (response.status === 200 && (response.data.role === 'admin' || response.data.role === 'owner')) {
      return true;
    }

    return false;
  } catch (error) {
    return false;
  }
};

// Função para logout
export const logoutUser = async () => {
  await axios.post('/api/auth/logout', {}, {
    withCredentials: true,
  });
  Cookies.remove('token'); // Remove o token armazenado nos cookies
};
