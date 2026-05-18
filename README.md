# 📄 Kairos Test Project — Документация

Демо: 🔗 https://kairos-test-client-tk2y.vercel.app/

&nbsp;

## 🛠 Локальный запуск

### Требования

| Компонент           | Версия  |
| ------------------- | ------- |
| Node.js             | ≥18.0.0 |
| pnpm (или npm/yarn) | ≥8.0.0  |
| Python              | ≥3.10   |


### Фронтенд (Vite + TypeScript)



```md
# 1. Клонировать репозиторий

git clone https://github.com/Meow-Double/Kairos-Test.git
cd Kairos-Test

# 2. Установить зависимости фронтенда

cd client
pnpm install # или npm install

# 3. Запустить dev-сервер

pnpm dev
```

**Откройте: http://localhost:5173**

### Бэкенд (FastAPI + Python)

```md
# 1. Перейти в папку сервера

cd ../server

# 2. Создать виртуальное окружение

python -m venv venv
source venv/bin/activate # Linux/Mac

# или

venv\Scripts\activate # Windows

# 3. Установить зависимости

pip install -r requirements.txt

# 4. Создать .env файл (скопировать из .env.example)

cp .env.example .env

# Отредактировать: добавить GOOGLE_CLIENT_ID и GOOGLE_CLIENT_SECRET

# 5. Запустить сервер

uvicorn main:app --reload --host 127.0.0.1 --port 8000
```

**API документация: http://127.0.0.1:8000/docs**

&nbsp;


## 🏗 Архитектура проекта

```t
Kairos-Test/
├── client/                 # Фронтенд (Vite + TypeScript)
│   ├── src/
│   │   ├── components/     # UI-компоненты (Player, Tabs, Modal...)
│   │   ├── shared/
|   |   |   ├── consts/     # Постоянные константы
│   │   │   ├── ui/         # Переиспользуемые компоненты (Dropdown, Modal...)
│   │   │   └── utils/      # Утилиты (reactive, effect, WebSocket...)
│   │   ├── main.ts         # Точка входа
│   │   └── styles/         # Глобальные стили
│   ├── index.html
│   ├── vite.config.ts      # Настройки сборки + proxy на бэкенд
│   └── package.json
│
├── server/                 # Бэкенд (FastAPI + Python)
│   ├── main.py             # Точка входа + роуты авторизации
│   ├── requirements.txt    # Зависимости Python
│   ├── vercel.json         # Конфиг деплоя на Vercel
│   └── .env.example        # Шаблон переменных окружения
│
├── .gitignore
├── README.md
└── pnpm-workspace.yaml     # Настройки monorepo (pnpm)
```
&nbsp;

## 🔑 Ключевые решения

| Компонент    | Версия                                    | Зачем                                        |
| ------------ | ----------------------------------------- | -------------------------------------------- |
| Реактивность | Custom `reactive` + `Proxy` + `effect`    | Для реактивности                             |
| WebSocket    | Нативный `WebSocket` + Binance Public API | Реальные цены криптовалют в реальном времени |
| Авторизация  | Google OAuth2 + FastAPI                   | Авторизация по ТЗ                            |

&nbsp;

## ✨ Реализованный функционал

### 🎬 Hero-секция

    Видео на фоне с автозапуском (autoplay muted playsinline)
    Адаптивная вёрстка под все разрешения
    Кнопка авторизации через Google

### 💰 Крипто-дашборд

    Отображение монет в двух колонках
    Реальные цены через WebSocket (Binance Public API)
    Анимация появления новых монет

### 🔐 Авторизация

    Полный OAuth2 flow: клик - Google - редирект - получение данных
    Безопасная передача параметров через urlencode
    CORS настроен для продакшен-доменов

### 🎨 Интерфейс

    Адаптивность: мобильная версия (≤768px)
    Плавный скролл между секциями (кастомный JS)
    Анимация SVG-элементов при появлении в вьюпорте
