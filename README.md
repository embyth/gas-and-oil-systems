# :fire: Розрахунок газових та нафтових систем

[![Vercel Status][vercel-image]][vercel-url] [![Dependency status][dependency-image]][dependency-url]

Сервіс для розрахунку режимів роботи нафто-, газопроводів, газових мереж та внутрішньобудинкових газових мереж

Автор: [Ростислав Мінюков](https://github.com/embyth/)

[**Сайт**](https://gas-and-oil-systems.vercel.app/)

---

## Структура проекту

```bash
.
├── calculations/             # директорія розрахунків
│   ├── gas-branches/         # директорія розрахунку розгалуженої газової мережі
│   ├── gas-indoor/           # директорія розрахунку внутрішньобудинкової газової мережі
│   ├── gas-network/          # директорія розрахунку кільцевої газової мережі
│   ├── gas-physics/          # директорія розрахунку фізичних властивостей газу
│   ├── gas-transmission/     # директорія розрахунку режиму роботи газотранспортної системи
│   └── oil-transmission/     # директорія розрахунку пропускної здатності магістрального нафтопроводу
├── components/               # директорія React компонентів
├── content/                  # директорія Markdown документації для розрахунків
├── hooks/                    # директорія React хуків
├── pages/                    # директорія NextJs сторінок
│   └── api/                  # директорія обробників запиту до API
├── public/                   # директорія загальнодоступних файлів (стилі, шрифти, картинки)
├── store/                    # директорія глобального контексту (сховище)
├── utils/                    # директорія допоміжних та утилітарних функцій
│   └── props/                # директорія статичних пропсів для NextJs
├── .editorconfig             # конфігурація Editorconfig
├── .eslintrc.json            # конфігурація ESLint
├── .gitattributes            # Git attributes файл
├── .gitignore                # Git ignore файл
├── LICENSE                   # ліцензія проекту
├── package.json              # npm залежності та файл з налаштуваннями проекту
├── package-lock.json         # npm lock-файл
└── README.md                 # документація проекту
```

[vercel-image]: https://therealsujitk-vercel-badge.vercel.app/?app=gas-and-oil-systems&style=flat-square
[vercel-url]: https://vercel.com/embyth/gas-and-oil-systems
[dependency-image]: https://david-dm.org/embyth/gas-and-oil-systems/dev-status.svg?style=flat-square
[dependency-url]: https://david-dm.org/embyth/gas-and-oil-systems?type=dev
