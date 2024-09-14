# notion isbn db

This is wrapper around a notion database with goal to add a barcode scanner to add entry in batch. The underlying goal is to be able to build fast an isbn library which can be shared without big hassle.

## development

This is Next.js app, deployed on Vercel, so you should be good with them. After that, if you want to contribute you'll need first to create your own integration on the notion's developer portal. choose a public integration with a redirect uri such as `http://localhost:3000` (which is enough for dev). feed those 3 variables to the `.env` var and you should be good to go.

```bash
npm run dev
```

## contribute

Any PRs are welcomed and i'll try to merge them as fast as i can, although this is a very niche side project so i'll be frank that i don't have **much** time to spend on it.
