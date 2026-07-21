// frontend/src/main.ts
import { createIcons, Mail, Lock, User, Eye, EyeOff } from 'lucide';

// Inicializa apenas os ícones que você importar (melhor para a performance e build)
createIcons({
  icons: {
    Mail,
    Lock,
    User,
    Eye,
    EyeOff
  }
});