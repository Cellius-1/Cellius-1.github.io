#!/usr/bin/env python3
"""Builds the static site. Edit _src/pages/*.html or _src/site.css, then run: python3 _src/build.py

Each source page: line 1 = <title>, line 2 = meta description, rest = <main> body.
Use {up} for the path prefix to the site root in image srcs.
"""
import hashlib, os, re

SRC = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.dirname(SRC)
NAV = [('index', 'Home'), ('about', 'About'), ('team', 'Team'), ('lessons', 'Courses'), ('contact', 'Contact'),
       ('become_staff', 'Become Staff'), ('blog', 'Blog'), ('hackathon', 'Hackathon')]

css = open(os.path.join(SRC, 'site.css')).read()
css = re.sub(r'\s*\n\s*', '', css)
css = re.sub(r'\s*([{};:,>])\s*', r'\1', css).replace(';}', '}')


def href(page, sub):
    if page == 'index':
        return '../' if sub else './'
    return f'{page}.html' if sub else f'pages/{page}.html'


def picture(m):
    # Serve AVIF where we have one; old browsers fall back to the jpg/png in <img>.
    tag, src = m.group(0), m.group(1)
    img = tag.replace('<img ', '<img decoding="async" ', 1)
    avif = re.sub(r'\.(jpg|png)$', '.avif', src)
    path = os.path.join(ROOT, re.sub(r'^(\.\./)+', '', avif))
    if not os.path.exists(path):
        return img
    return f'<picture><source srcset="{avif}" type="image/avif">{img}</picture>'


def foot(sub):
    links = lambda items: ''.join(f'<li><a href="{href(p, sub)}">{l}</a></li>' for p, l in items)
    return (f'<footer><div class="wrap"><div class="cols">'
            f'<div><p><a class="logo" href="{href("index", sub)}"><b>&lt;COB&gt;</b>Coders Over Borders</a></p>'
            f'<p>Empowering communities worldwide through innovative computer science education and breaking down digital barriers.</p></div>'
            f'<div><h3>Quick Links</h3><ul>{links([("about", "About Us"), ("lessons", "Courses"), ("team", "Our Team"), ("blog", "Blog"), ("ai_agreement", "AI Agreement")])}</ul></div>'
            f'<div><h3>Get Involved</h3><ul>{links([("contact", "Contact Us"), ("become_staff", "Join Our Team"), ("donate", "Donate")])}</ul></div>'
            f'</div><p class="copy">&copy; 2025 Coders Over Borders. All rights reserved.</p></div></footer>')


outputs = []
for f in sorted(os.listdir(os.path.join(SRC, 'pages'))):
    name = f[:-5]
    sub = name != 'index'
    up = '../' if sub else ''
    title, desc, body = open(os.path.join(SRC, 'pages', f)).read().split('\n', 2)
    cur = lambda p: ' aria-current="page"' if p == name else ''
    nav = ''.join(f'<a href="{href(p, sub)}"{cur(p)}>{l}</a>' for p, l in NAV)
    nav += f'<a class="btn" href="{href("donate", sub)}"{cur("donate")}>Donate</a>'
    body = re.sub(r'<img [^>]*src="([^"]+)"[^>]*>', picture, body.replace('{up}', up))
    html = f'''<!doctype html><html lang="en"><head><meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>{title}</title>
<meta name="description" content="{desc}">
<meta name="theme-color" content="#14181c">
<link rel="icon" href="{up}favicon.svg" type="image/svg+xml"><link rel="icon" href="{up}favicon.png" type="image/png">
<style>{css}</style>
<script type="speculationrules">{{"prerender":[{{"where":{{"href_matches":"/*"}},"eagerness":"moderate"}}]}}</script>
</head><body>
<header class="top"><div class="wrap"><a class="logo" href="{href("index", sub)}"><b>&lt;COB&gt;</b>Coders Over Borders</a><nav aria-label="Main">{nav}</nav></div></header>
<main>{body.strip()}</main>
{foot(sub)}
<script>if("serviceWorker"in navigator)addEventListener("load",()=>navigator.serviceWorker.register("/sw.js"))</script>
</body></html>
'''
    html = re.sub(r'>\s*\n\s*<', '><', html)
    out = 'index.html' if not sub else f'pages/{name}.html'
    open(os.path.join(ROOT, out), 'w').write(html)
    outputs.append((out, html))

# Service worker: cache version is a hash of every page + image, so any change busts the cache.
h = hashlib.sha1()
for out, html in outputs:
    h.update(html.encode())
for img in sorted(os.listdir(os.path.join(ROOT, 'img'))):
    h.update(open(os.path.join(ROOT, 'img', img), 'rb').read())
pages = ['/' if o == 'index.html' else '/' + o for o, _ in outputs]
sw = open(os.path.join(SRC, 'sw.js')).read()
sw = sw.replace('__VERSION__', h.hexdigest()[:10]).replace('__PAGES__', repr(pages).replace("'", '"'))
open(os.path.join(ROOT, 'sw.js'), 'w').write(sw)

for out, html in outputs:
    print(f'{len(html):>6}  {out}')
