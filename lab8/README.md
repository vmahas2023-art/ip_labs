# Лабораторна робота № 8

**Використання SCSS для створення адаптивних стилів**

Магас Віталій Дмитрович, група ІП-41.

Сторінку скопійовано з `lab7`. Матеріали й локальні зображення попередньої роботи збережено. Стилі перенесено у `scss/styles.scss`, а HTML підключає `css/styles.css`.

## Компіляція

Із кореня репозиторію:

```sh
npm ci
npm run build:lab8
npm run watch:lab8
```

Або в каталозі `lab8` із доступною командою Sass:

```sh
sass --watch scss:css
```

Згенеровані `css/styles.css` і `css/styles.css.map` включено до проєкту. Сайт відкривається без Node.js, оскільки браузер використовує готовий CSS. Карта містить початковий SCSS.

## Реалізовані вимоги

- `$primary-color`, `$secondary-color`, `$text-color` і змінні типографіки.
- Вкладені правила для HTML-ієрархії, `&:hover` і `&:focus-visible`.
- `$breakpoints`: mobile 576px, tablet 768px, desktop 1024px.
- `@mixin respond-to($breakpoint)` та `@include` з `@content`.
- Сучасний модуль `sass:map` із `map.has-key` та `map.get`.
- Flexbox для подій, Grid для новин.
- До 768px одна колонка; від 768px дві; від 1024px чотири.
- Від 576px збільшено горизонтальні відступи.
- Посилання з головного меню на `lab8/index.html`.

## Джерела

- https://lpnu.ua/
- https://sass-lang.com/documentation/
- https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/CSS_layout/Responsive_Design
