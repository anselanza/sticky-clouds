# Sticky Clouds, a Proof of Concept

## Notes
Removed TailwindCSS, using CSS modules aka "Scoped Traditional CSS" instead. To make this play nice with IDE+TypeScript, I installed the [CSS Modules Toolkit](https://github.com/mizdra/css-modules-kit) which includes an LSP to allow TypeScript to include `*.module.css` as "modules". I also needed to add `"**/*.module.css"` into the "include" section of `tsconfig.json`.

When nesting CSS (you can [do this now without preprocessors like Sass](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_nesting)!) you can refer to the **nested** class directly for CSS Modules, keeping the scoped class name, i.e. use `styles.logo` rather than `styles.header.logo` which will in fact not exist. And completion/type-checking works as expected.

Favicon created using imagemagick. Simple:
```
convert -resize x16 -gravity center -crop 16x16+0+0 favicon.png -colors 256 -background transparent favicon.ico
```

Manually added dummy data to store via `addSticky` function:

```
curl -i http://localhost:8888/.netlify/functions/addSticky -X POST '-d {"id":"one","title":"First","body":"This is some **test** content","position":{"x":0,"y":0}}'
```

## TODO
- [x] Use TanStack Query
- [ ] Use ~~Auth0~~ [Clerk](https://clerk.com/) to implement authentication+authorisation for this application (in this case we are doing server-side because of TanStack Start)
- [ ] Use TanStack Forms for some fancy add/edit forms (with proper validation, etc.)
- [ ] Actually use positions - maybe this requires the canvas?
- [ ] Implement "linking" between stickies
- [ ] Implement "grouping" (draw a box)
- [ ] Use a "proper" DB (Netlify DB or external)
