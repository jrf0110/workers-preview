# Cloudflare Service Workers Previewer

> Easily preview your workers script projects from npm scripts or the command line.

**Install**

```bash
npm install workers-preview
```

**Usage**

```bash
# Open the script previewer
npm run preview
```

**package.json**

Edit your `package.json` to include the preview script. Pipe the file you want to preview into the `workers-preview` cli.

```javascript
{
  "scripts": {
    "preview": "workers-preview < my-script.js"
  },
  "dependencies": {
    "workers-preview": "^1.0.0"
  }
}
```
