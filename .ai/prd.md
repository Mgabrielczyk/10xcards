# Dokument wymagań produktu (PRD) - 10x-cards
## 1. Przegląd produktu
10x-cards to aplikacja webowa umożliwiająca szybkie generowanie, przeglądanie i zarządzanie tekstowymi zestawami fiszek edukacyjnych opartych na metodzie spaced repetition. Dzięki integracji z AI użytkownik może w prosty sposób tworzyć propozycje fiszek na podstawie wklejonego tekstu oraz zatwierdzać je do bazy, co przyspiesza proces nauki.

## 2. Problem użytkownika
Ręczne tworzenie wysokiej jakości fiszek jest czasochłonne i wymaga dużego nakładu pracy. To zniechęca użytkowników do systematycznego stosowania metody spaced repetition, która jest jedną z najskuteczniejszych technik zapamiętywania.

## 3. Wymagania funkcjonalne
1. Generowanie pojedynczych fiszek przez AI na podstawie wklejonego tekstu (do 200 znaków prodz, do 500 tył).
2. Interfejs recenzji dla każdej wygenerowanej fiszki z opcjami: akceptuj, edytuj, odrzuć, ponów generację.
3. Zapisywanie zaakceptowanych (w tym edytowanych) fiszek w bazie danych.
4. Manualne tworzenie fiszek poprzez modal z polami front/back.
5. Przeglądanie listy zapisanych fiszek z opcjami edycji i usuwania.
6. Autoryzacja użytkownika: logowanie (login i hasło) oraz wylogowanie.
7. Integracja z open-source’ową biblioteką algorytmu powtórek (spaced repetition).
8. Rejestracja i logowanie uytkowników

## 4. Granice produktu
W ramach MVP nie będą realizowane:
- Zaawansowany algorytm powtórek (np. SuperMemo, Anki)
- Import plików w formatach PDF, DOCX i innych
- Współdzielenie zestawów fiszek między użytkownikami
- Integracje z zewnętrznymi platformami edukacyjnymi
- Aplikacje mobilne (projekt webowy tylko w przeglądarce)
- Audyt logów, akcje masowe i rozbudowana analityka

## 5. Historyjki użytkowników

#### US-001
Tytuł: Rejestracja konta
Opis: Użytkownik chce zarejestrować się do 10x-cards, aby zarządzać swoimi fiszkami.
Kryteria akceptacji:
- Zobaczony jest formularz z polami login i hasło.
- Po wprowadzeniu poprawnych danych i weryfikacji, konto jest aktywowane
- Uytkownik odtrzymuje potwierdzenie rejestracji i zostaje zalogowany

#### US-002
Tytuł: Logowanie do aplikacji
Opis: Użytkownik chce zalogować się do 10x-cards, aby zarządzać swoimi fiszkami.
Kryteria akceptacji:
- Zobaczony jest formularz z polami login i hasło.
- Po wprowadzeniu poprawnych danych użytkownik zostaje przekierowany do pulpitu.
- W przypadku błędnych danych wyświetlany jest komunikat o błędzie.

#### US-003
Tytuł: Wylogowanie z aplikacji
Opis: Użytkownik chce zakończyć sesję i zabezpieczyć dostęp do swoich fiszek.
Kryteria akceptacji:
- Na każdej stronie widoczna jest opcja wylogowania.
- Po kliknięciu użytkownik wraca do ekranu logowania.

#### US-004
Tytuł: Generowanie fiszki przez AI
Opis: Użytkownik wkleja fragment tekstu i otrzymuje jedną propozycję fiszki.
Kryteria akceptacji:
- Po wklejeniu tekstu i zatwierdzeniu wywoływana jest usługa AI.
- Użytkownik widzi front (max 200 znaków) i back (max 500 znaków).
- Propozycja ładuje się w czasie do 3 sekund.

#### US-005
Tytuł: Akceptacja fiszki AI
Opis: Użytkownik akceptuje propozycję fiszki AI.
Kryteria akceptacji:
- Po kliknięciu akceptuj fiszka jest zapisywana w bazie.
- Zapisana fiszka pojawia się na liście fiszek użytkownika.

#### US-006
Tytuł: Odrzucenie i ponowne generowanie fiszki AI
Opis: Użytkownik odrzuca propozycję i otrzymuje nową.
Kryteria akceptacji:
- Po kliknięciu odrzuć używana jest opcja ponownej generacji.
- Użytkownik otrzymuje nową propozycję w maks. 3 sekund.

#### US-007
Tytuł: Edytowanie propozycji fiszki AI
Opis: Użytkownik edytuje front lub back przed zapisem.
Kryteria akceptacji:
- Po kliknięciu edytuj pola front/back stają się edytowalne.
- Zmiany są walidowane (niepusty front, back do 500 znaków).
- Po zatwierdzeniu zaktualizowana fiszka trafia do bazy.

#### US-008
Tytuł: Ręczne tworzenie fiszki
Opis: Użytkownik tworzy nową fiszkę przez formularz modalny.
Kryteria akceptacji:
- Modal zawiera dwa pola tekstowe: front (max 200), back (max 500).
- Użytkownik może zapisać lub anulować tworzenie.
- Po zapisie fiszka pojawia się na liście.

#### US-009
Tytuł: Przeglądanie listy fiszek
Opis: Użytkownik chce zobaczyć wszystkie zapisane fiszki.
Kryteria akceptacji:
- Lista wyświetla front i datę utworzenia.
- Każda fiszka ma przyciski edytuj i usuń.

#### US-010
Tytuł: Edycja zapisanej fiszki
Opis: Użytkownik chce zmodyfikować istniejącą fiszkę.
Kryteria akceptacji:
- Po kliknięciu edytuj otwiera się modal z prewypełnionymi polami.
- Zmiany są walidowane i po zatwierdzeniu aktualizowane w bazie.

#### US-011
Tytuł: Usuwanie fiszki
Opis: Użytkownik chce usunąć niepotrzebną fiszkę.
Kryteria akceptacji:
- Po kliknięciu usuń pojawia się prośba o potwierdzenie.
- Po potwierdzeniu fiszka znika z listy i jest usunięta z bazy.

#### US-012
Tytuł: Integracja ze spaced repetition
Opis: Zaakceptowane fiszki będą dostępne w algorytmie powtórek.
Kryteria akceptacji:
- Po akceptacji fiszka otrzymuje metadane wymagane przez bibliotekę.
- Zapisane fiszki są zwracane przez endpoint algorytmu powtórek.

#### US-013
Tytuł: Błąd generacji fiszki AI
Opis: W przypadku awarii usługi AI użytkownik musi otrzymać komunikat o błędzie.
Kryteria akceptacji:
- W razie błędu generacji wyświetlany jest przyjazny komunikat.
- Formularz pozwala ponowić próbę bez odświeżania strony.

## 6. Metryki sukcesu
- Co najmniej 75% propozycji fiszek AI zaakceptowanych przez użytkowników.
- Użytkownicy generują minimum 75% wszystkich fiszek z wykorzystaniem AI.
