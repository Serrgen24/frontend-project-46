# Вычислитель отличий

[![hexlet-check](https://github.com/Serrgen24/frontend-project-46/actions/workflows/hexlet-check.yml/badge.svg)](https://github.com/Serrgen24/frontend-project-46/actions/workflows/hexlet-check.yml)
[![linter](https://github.com/Serrgen24/frontend-project-46/actions/workflows/linter.yml/badge.svg)](https://github.com/Serrgen24/frontend-project-46/actions/workflows/linter.yml)
[![Maintainability](https://api.codeclimate.com/v1/badges/d0554512ae29ce5c4a34/maintainability)](https://codeclimate.com/github/Serrgen24/frontend-project-46/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/d0554512ae29ce5c4a34/test_coverage)](https://codeclimate.com/github/Serrgen24/frontend-project-46/test_coverage)


## Описание
Вычислитель отличий – программа, определяющая разницу между двумя структурами данных. Это популярная задача, для решения которой существует множество онлайн сервисов, например [JSON Diff](http://www.jsondiff.com/). Подобный механизм используется при выводе тестов или при автоматическом отслеживании изменений в конфигурационных файлах.


### Возможности утилиты:

- Поддержка разных входных форматов: yaml, json
- Генерация отчета в виде plain text, stylish и json

## Системные требования
- Node.js версии 23.6.0 и выше

## Установка и запуск:
- Необходимо скопировать репозиторий к себе на компьютер;

### Все команды выполняются в корневой папке проекта:

**$ npm ci** - устанавливает все зависимости;\
**$ gendiff -h --help** - справочная информация по утилите;\
**$ gendiff filepath1 filepath2** - утилита сравнивает два конфигурационных файла, принимая на вход два аргумента - пути до этих файлов;\

## Примеры работы программы:

### Поиск различий между двумя плоскими json-файлами
[![asciicast](https://asciinema.org/a/TQWIBMnvOKVPRjDybaNvCNUmG.svg)](https://asciinema.org/a/TQWIBMnvOKVPRjDybaNvCNUmG)

### Поиск различий между двумя плоскими yaml файлами