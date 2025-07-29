# Passo a Passo para Rodar o Front-end

## 1. Clone o repositório

```bash
git clone https://github.com/GChimel/tdl-frontend
cd tdl-frontend
```

## 2. Configure o Ambiente

Copie o arquivo `.env.example` para `.env`:

```bash
cp .env.example .env
```

Se necessário, edite o `.env` para apontar para o backend correto:

```
NEXT_PUBLIC_API_BASE_URL=http://localhost:3000
```

> **Obs:** O valor padrão assume que o backend está rodando localmente na porta 3000. Altere conforme necessário para o IP/porta do seu backend.

## 3. Instale as dependências

```bash
npm install
```

## 4. Rode o Front-end

```bash
npm run dev
```

Acesse [http://localhost:3001](http://localhost:3001) no navegador para visualizar a aplicação.

---

## Observações

- Certifique-se de que o backend esteja rodando e acessível pelo endereço configurado em `NEXT_PUBLIC_API_BASE_URL`.
- O projeto utiliza Next.js 14+, React, TypeScript, TailwindCSS, Zustand, React Query e Axios.
- Para dúvidas sobre variáveis de ambiente, consulte o arquivo `.env.example`.
