# SafeTask — Configuration Supabase

## 1. Créer votre projet Supabase

1. Rendez-vous sur [supabase.com](https://supabase.com) et créez un nouveau projet
2. Notez votre **Project URL** et votre **anon/public key** (dans Settings → API)

## 2. Créer le fichier `.env`

Créez un fichier `.env` à la racine du projet avec vos identifiants :

```env
VITE_SUPABASE_URL=https://votre-projet.supabase.co
VITE_SUPABASE_ANON_KEY=votre-cle-anon-publique
```

## 3. Exécuter le schéma de base de données

1. Dans votre dashboard Supabase, allez dans **SQL Editor**
2. Copiez et collez le contenu du fichier `supabase/schema.sql`
3. Cliquez sur **Run** pour créer toutes les tables, politiques RLS, et buckets de stockage

## 4. Configurer l'authentification

Dans **Authentication → Settings** :
- Activez **Email Auth**
- Désactivez "Confirm email" pour le développement (ou configurez votre SMTP pour la production)

## 5. Lancer l'application

```bash
npm run dev
```

L'application sera disponible sur **http://localhost:3000**

---

## Architecture de sécurité

| Fonctionnalité | Implémentation |
|---|---|
| Auth | Supabase Auth (JWT) |
| Vérification identité | Upload → Storage `kyc-documents` (privé) |
| Charte Safe Space | Colonne `charter_signed` dans `profiles` |
| Signalement | Table `reports` avec RLS |
| Blocage chat | Colonne `frozen` dans `messages` |
| RLS | Activé sur toutes les tables |
