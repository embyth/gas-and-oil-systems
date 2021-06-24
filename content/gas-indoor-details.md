---
title: "Детальна інформація та алгоритм розрахунку внутрішньо-будинкової газової мережі"
excerpt: "Розрахунок внутрішньо-будинкової газової мережі використовується для визначенні діаметрів ділянок мережі, при яких максимально використовується заданий перепад тиску"
date: "06-24-2021"
author: "Rostyslav Miniukov"
calculationHref: "/gas-indoor"
---

# Розрахунок внутрішньо-будинкової газової мережі

Розрахунок проводиться за методом рівномірного розподілу гідравлічного нахилу шляхом підбору ділянок мережі

Методика розрахунку: ДБН В.2.5-20 "Газопостачання"

---

## Зміст

1. [Особливості гідравлічного розрахунку внутрішньо-будинкових газових мереж](#особливості-гідравлічного-розрахунку-внутрішньо-будинкових-газових-мереж)
2. [Мета](#мета)
3. [Вихідні дані для розрахунку](#вихідні-дані-для-розрахунку)
4. [Набір стандартних діаметрів трубопроводів](#набір-стандартних-діаметрів-трубопроводів)
5. [Алгоритм розрахунку](#алгоритм-розрахунку)
6. [Допустимі втрати тиску в внутрішньо-будинковій мережі](#допустимі-втрати-тиску-в-внутрішньо-будинковій-мережі)
7. [Коефіцієнт одночасності залежно від асортименту встановлених у квартирі газових приладів](#коефіцієнт-одночасності-залежно-від-асортименту-встановлених-у-квартирі-газових-приладів)

---

## Особливості гідравлічного розрахунку внутрішньо-будинкових газових мереж

1. внутрішні газопроводи житлових будинків відносяться до газових мереж низького тиску
2. при розрахунку вертикальних ділянок необхідно враховувати зміну надлишкового тиску газу, спричинену різницею геодезичних позначок кінця і початку ділянки та різницею густин повітря і газу
3. при розрахунку втрат тиску в місцевих опорах необхідно враховувати функціональне призначення ділянки
4. розрахункові витрати газу на ділянках визнаються з урахуванням коефіцієнта одночасності <code>К<sub>o</sub></code>, який показує імовірність одночасного включення в роботу газових приладів
5. газифікація будинків проводиться сталевими та поліетиленовими газопроводами

---

## Мета

Мета розрахунку полягає у визначенні діаметрів ділянок внутрішньої газової мережі, при яких максимально використовується заданий перепад тиску

---

## Вихідні дані для розрахунку

- конфігурація газової мережі
- масиви довжин і розрахункових витрат газу ділянок газової мережі <code>l</code>, м
- допустимі витрати тиску у мережі <code>P<sub>доп</sub></code>, Па
- фізичні властивості газу: густина <code>ρ<sub>н</sub></code>, кг/м<sup>3</sup> і кінематична в'язкість <code>ν<sub>н</sub></code>, м<sup>2</sup>/c за нормальних умов
- середня температура газу в газовій мережі <code>T<sub>ср</sub></code>, <sup>o</sup>C
- точність розрахунку гідравлічного нахилу <code>ε</code>, %
- максимальна швидкість руху газу <code>w<sub>max</sub></code>, м/с (для газових мереж низького тиску слід приймати швидкість руху газу не більшу за 7 м/с)
- усереднена витрата газу <code>Q<sub>cp</sub></code>, м<sup>3</sup>/год
- атмосферний тиск <code>P<sub>бар</sub></code>, Па

---

## Набір стандартних діаметрів трубопроводів

<table>
  <thead>
    <tr align="center">
      <td colspan="2"><b>Сталеві труби</b></td>
      <td colspan="2"><b>Поліетиленові труби</b></td>
    </tr>
    <tr align="center">
      <td>D×δ, мм</td><td>d, см</td><td>D×δ, мм</td><td>d, см</td>
    </tr>
  </thead>
  <tbody>
    <tr align="center">
      <td data-label="D×δ, мм">21,3x2,8</td><td data-label="d, cм">1,57</td><td data-label="D×δ, мм">40х3,7</td><td data-label="d, cм">3,26</td>
    </tr>
    <tr align="center">
      <td data-label="D×δ, мм">26,8x2,8</td><td data-label="d, cм">2,12</td><td data-label="D×δ, мм">50х2,9</td><td data-label="d, cм">4,42</td>
    </tr>
    <tr align="center">
      <td data-label="D×δ, мм">33,5x3,2</td><td data-label="d, cм">2,71</td><td data-label="D×δ, мм">63х3,6</td><td data-label="d, cм">5,58</td>
    </tr>
    <tr align="center">
      <td data-label="D×δ, мм">38х3</td><td data-label="d, cм">3,2</td><td data-label="D×δ, мм">75х4,3</td><td data-label="d, cм">6,64</td>
    </tr>
    <tr align="center">
      <td data-label="D×δ, мм">42,3х3,2</td><td data-label="d, cм">3,59</td><td data-label="D×δ, мм">90х5,2</td><td data-label="d, cм">7,96</td>
    </tr>
    <tr align="center">
      <td data-label="D×δ, мм">45х3</td><td data-label="d, cм">3,9</td><td data-label="D×δ, мм">110х6,3</td><td data-label="d, cм">9,74</td>
    </tr>
    <tr align="center">
      <td data-label="D×δ, мм">48х3,5</td><td data-label="d, cм">4,1</td><td data-label="D×δ, мм">125х7,1</td><td data-label="d, cм">11,08</td>
    </tr>
    <tr align="center">
      <td data-label="D×δ, мм">57х3</td><td data-label="d, cм">5,1</td><td data-label="D×δ, мм">140х8</td><td data-label="d, cм">12,4</td>
    </tr>
    <tr align="center">
      <td data-label="D×δ, мм">76х3</td><td data-label="d, cм">7</td><td data-label="D×δ, мм">160х9,1</td><td data-label="d, cм">14,18</td>
    </tr>
    <tr align="center">
      <td data-label="D×δ, мм">89х3</td><td data-label="d, cм">8,3</td><td data-label="D×δ, мм">180х10,3</td><td data-label="d, cм">15,94</td>
    </tr>
    <tr align="center">
      <td data-label="D×δ, мм">108х3</td><td data-label="d, cм">10,2</td><td data-label="D×δ, мм">200х11,4</td><td data-label="d, cм">17,72</td>
    </tr>
    <tr align="center">
      <td data-label="D×δ, мм">133х4</td><td data-label="d, cм">12,5</td><td data-label="D×δ, мм">225х12,8</td><td data-label="d, cм">19,94</td>
    </tr>
    <tr align="center">
      <td data-label="D×δ, мм">159х4,5</td><td data-label="d, cм">15</td><td data-label="D×δ, мм">250х14,2</td><td data-label="d, cм">22,16</td>
    </tr>
    <tr align="center">
      <td data-label="D×δ, мм">219х5</td><td data-label="d, cм">20,9</td><td data-label="D×δ, мм">280х15,9</td><td data-label="d, cм">24,82</td>
    </tr>
    <tr align="center">
      <td data-label="D×δ, мм">273х5</td><td data-label="d, cм">26,3</td><td data-label="D×δ, мм">315х17,9</td><td data-label="d, cм">27,92</td>
    </tr>
    <tr align="center">
      <td data-label="D×δ, мм">325х5</td><td data-label="d, cм">31,5</td><td data-label="D×δ, мм">355х20,1</td><td data-label="d, cм">31,48</td>
    </tr>
    <tr align="center">
      <td data-label="D×δ, мм">426х6</td><td data-label="d, cм">41,4</td><td data-label="D×δ, мм">400х22,7</td><td data-label="d, cм">35,46</td>
    </tr>
    <tr align="center">
      <td></td><td></td><td data-label="D×δ, мм">450х25,5</td><td data-label="d, cм">39,9</td>
    </tr>
    <tr align="center">
      <td></td><td></td><td data-label="D×δ, мм">500х28,4</td><td data-label="d, cм">44,32</td>
    </tr>
    <tr align="center">
      <td></td><td></td><td data-label="D×δ, мм">560х31,7</td><td data-label="d, cм">49,66</td>
    </tr>
    <tr align="center">
      <td></td><td></td><td data-label="D×δ, мм">630х35,7</td><td data-label="d, cм">55,86</td>
    </tr>
    <tr align="center">
      <td colspan="4"><b>Абсолютна шорсткість труб</b></td>
    </tr>
    <tr align="center">
      <td><code>К<sub>e</sub></code></td>
      <td data-label="Сталеві труби">0,01</td>
      <td><code>К<sub>e</sub></code></td>
      <td data-label="Поліетиленові труби">0,002</td>
    </tr>
  </tbody>
</table>

## Алгоритм розрахунку

Розрахунок починаємо з головного напряму руху газу – найбільш протяжного напряму руху газу.<br>
Заповнювати таблицю починаємо з найбільш віддаленої ділянки від точки живлення мережі.<br>
Для кожної ділянки основного напрямку руху газу визначаємо розрахункову витрату газу за формулою<br>

<p align="center">
  <img src="/assets/img/formulas/gas-indoor/1.png" alt="0"><br>
</p>
<p>
  <code>k<sub>o</sub></code> - коефіцієнт одночасності, значення якого залежать від асортименту газових приладів та кількості квартир, приймається згідно з ДБН В.2.5-20 (<a href="#коефіцієнт-одночасності-залежно-від-асортименту-встановлених-у-квартирі-газових-приладів">див. таблицю</a>),<br>
  <code>n</code> - кількість квартир, що живить дана ділянка,<br>
  <code>q<sub>кв</sub></code> - номінальна витрата газу газовими приладами в квартирі.<br>
</p>

1. Знаходимо надлишковий тиск газу на вході споживачів<br>
<p align="center">
  <img src="/assets/img/formulas/gas-indoor/2.png" alt="1">
</p>
<p>
  <code>ΔР<sub>доп</sub></code> - максимально допустимий перепад тиску газу у внутрішній газовій мережі;<br>
  <code>Р<sub>п</sub></code> – надлишковий тиск газу на початку мережі, Па<br>
</p>

2. Обчислюємо середній абсолютний тиск газу в системі, МПа<br>
<p align="center">
  <img src="/assets/img/formulas/gas-indoor/3.png" alt="2"><br>
</p>
<p>де <code>Р<sub>б</sub></code> – атмосферний тиск, при відсутності фактичних даних слід приймати <code>Р<sub>б</sub> = 101325</code> Па.<br></p>

3. Обчислюємо розрахункову довжину кожної ділянки за формулою<br>
<p align="center">                        
  <img src="/assets/img/formulas/gas-indoor/4.png" alt="3"><br>
</p>
<p><code>a<sub>i</sub></code> -  коефіцієнт місцевих опорів, який  залежить від функціонального призначення газопроводу;<br></p>

<table>
  <tbody>
    <tr align="center">
      <td>Функціональне призначення газопроводу</td>
      <td>Коефіцієнт місцевого опору <code>a</code>, %</td>
    </tr>
    <tr align="center">
      <td>На газопроводах від вводів у будинки до стояків</td>
      <td>25</td>
    </tr>
    <tr align="center">
      <td>На газових стояках</td>
      <td>20</td>
    </tr>
    <tr align="center">
      <td>На внутрішньоквартирній розводці <strong>при загальній її довжині:</strong><br>
        1-2 м<br>
        3-4 м<br>
        5-7 м<br>
        8-12 м
      </td>
      <td>
        <br>
        450<br>
        300<br>
        120<br>
        50
      </td>
    </tr>
  </tbody>
</table>

4. Знаходимо суму розрахункових довжин газопроводів на основному напрямку руху газу<br>
<p align="center">
  <img src="/assets/img/formulas/gas-indoor/5.png" alt="4"><br>
</p>

5. Методом послідовних наближень знаходимо середнє значення швидкості руху газу для конкретних умов газопостачання. Для цього спочатку обчислюємо середній гідравлічний нахил в газовій мережі<br>
<p align="center">
  <img src="/assets/img/formulas/gas-indoor/6.png" alt="5"><br>
</p>

6. Задаємося максимальним значенням швидкості руху газу на ділянках газової мережі низького тиску<br>
<p align="center">
  <img src="/assets/img/formulas/gas-indoor/7.png" alt="6"><br>
</p>

7. За формулою, рекомендованою ДБН В.2.5-20, визначаємо внутрішній діаметр характерної ділянки газової мережі, що має усереднене значення витрати газу <code>Q<sub>ср</sub></code><br>
<p align="center">
  <img src="/assets/img/formulas/gas-indoor/8.png" alt="7"><br>
</p>
<p>де <code>Т</code> – середнє значення температури газу в газовій мережі.<br></p>

8. Обчислюємо гідравлічний нахил на характерній ділянці при прийнятій швидкості руху газу<br>
<p align="center">
  <img src="/assets/img/formulas/gas-indoor/9.png" alt="8"><br>
</p>

9. Порівнюємо розрахований гідравлічний нахил <code>І<sub>р</sub></code> з максимально допустимим <code>І<sub>cр</sub></code>. Якщо різниця між ними перевищує задану точність розрахунку, тобто виконується умов<br>
<p align="center">
  <img src="/assets/img/formulas/gas-indoor/10.png" alt="9"><br>
</p>

10. то зменшуємо швидкість руху газу<br>
<p align="center">
  <img src="/assets/img/formulas/gas-indoor/11.png" alt="10"><br>
</p>

11. Для кожної ділянки газової мережі визначаємо необхідний внутрішній діаметр труби за формулою<br>
<p align="center">
  <img src="/assets/img/formulas/gas-indoor/12.png" alt="11"><br>
</p>

<p>Одержане значення діаметра заокруглюємо до найближчого більшого стандартного значення (<a href="#набір-стандартних-діаметрів-трубопроводів">таблиця</a>).<br></p>

12. Обчислюємо середній гідравлічний нахил в газовій мережі<br>
<p align="center">
  <img src="/assets/img/formulas/gas-indoor/13.png" alt="12"><br>
</p>
<p>де <code>k</code> – коефіцієнт завантаження будинкової мережі. При першому розрахунку слід приймати <code>k = 1</code><br>

<em>Наступні розрахунки проводимо в циклі для кожної ділянки газової мережі. З сортаменту сталевих труб вибираємо найменший діаметр трубопроводу.</em><br></p>

13. Для ділянки газової мережі знаходимо число Рейнольдса за формулою<br>
<p align="center">
  <img src="/assets/img/formulas/gas-indoor/14.png" alt="13"><br>
</p>

<p>Залежно від режиму руху газу, який характеризується величиною числа Рейнольда, вибираємо відповідну формулу для розрахунку втрат тиску від тертя для кожної ділянки газової мережі<br></p>

14. Втрати тиску від тертя для <code>Re<sub>i</sub> <= 2000</code><br>
<p align="center">
  <img src="/assets/img/formulas/gas-indoor/15.png" alt="14"><br>
</p>

15. Втрати тиску від тертя для <code>2000 < Re<sub>i</sub> < 4000</code><br>
<p align="center">
  <img src="/assets/img/formulas/gas-indoor/16.png" alt="15"><br>
</p>

16. Втрати тиску від тертя для <code>Re<sub>i</sub> >= 4000</code><br>
<p align="center">
  <img src="/assets/img/formulas/gas-indoor/17.png" alt="16"><br>
</p>

17. Обчислюємо зміну надлишкового тиску газу за рахунок різниці густини повітря і газу, ввівши коефіцієнт <code>B<sub>i</sub></code> для розпізнавання вертикальних ділянок<br>
<p align="center">
  <img src="/assets/img/formulas/gas-indoor/18.png" alt="17"><br>
</p>
<p>де <code>ρ<sub>пов.н</sub></code> – густина повітря за нормальних умов, <code>ρ<sub>пов.н</sub> = 1,293 кг/м<sup>3</sup></code>.<br>
<code>В<sub>i</sub> = 0</code>, якщо ділянка горизонтальна;<br>
<code>В<sub>i</sub> = +1</code>, якщо ділянка  вертикальна і газ рухається вниз;<br>
<code>В<sub>i</sub> = -1</code>, якщо ділянка  вертикальна і газ рухається вверх.<br></p>

18. Знаходимо загальну зміну тиску газу на ділянці<br>
<p align="center">
  <img src="/assets/img/formulas/gas-indoor/19.png" alt="18"><br>
</p>

19. Визначаємо сумарний перепад тиску газу на основному напрямку руху газу<br>
<p align="center">
  <img src="/assets/img/formulas/gas-indoor/20.png" alt="19"><br>
</p>

<p>В випадку, якщо сумарний перепад тиску газу є значно менше допустимого значення, то згідно першого методу підбору діаметра слід збільшувати значення усередненої витрати газу <code>Q<sub>ср</sub></code> і навпаки.
Для другого методу слід змінювати значення коефіцієнта <code>k</code> в формулі  середнього гідравлічного нахилу (12).</p>

---

### Допустимі втрати тиску в внутрішньо-будинковій мережі

Розрахункові сумарні втрати тиску газу в газопроводах низького тиску (від джерела газопостачання до найбільш віддаленого приладу) приймаються не більше **1800 Па**, зокрема в розподільних газопроводах **1200 Па**, газопроводах-введеннях і внутрішніх газопроводах - **600 Па**.

Для садибної забудови розподіл розрахункових втрат допускається приймати в розподільних газопроводах **1500 Па**, газопроводах-вводах і внутрішніх газопроводах - **300 Па**.

---

### Коефіцієнт одночасності залежно від асортименту встановлених у квартирі газових приладів

<table>
  <thead>
    <tr align="center">
      <td rowspan="2"><strong>Кількість квартир</strong></td>
      <td colspan="4"><strong>Коефіцієнт одночасності залежно від асортименту встановлених у квартирі газових приладів</strong></td>
    </tr>
    <tr align="center">
      <td>ПГ-4</td>
      <td>ПГ-2</td>
      <td>ПГ-4+ПГВ</td>
      <td>ПГ-2+ПГВ</td>
    </tr>
  </thead>
  <tbody>
    <tr align="center">
      <td data-label="Кількість картир">1</td>
      <td data-label="ПГ-4">1,000</td>
      <td data-label="ПГ-2">1,000</td>
      <td data-label="ПГ-4+ПГВ">0,700</td>
      <td data-label="ПГ-2+ПГВ">0,750</td>
    </tr>
    <tr align="center">
      <td data-label="Кількість картир">2</td>
      <td data-label="ПГ-4">0,650</td>
      <td data-label="ПГ-2">0,840</td>
      <td data-label="ПГ-4+ПГВ">0,560</td>
      <td data-label="ПГ-2+ПГВ">0,640</td>
    </tr>
    <tr align="center">
      <td data-label="Кількість картир">3</td>
      <td data-label="ПГ-4">0,450</td>
      <td data-label="ПГ-2">0,730</td>
      <td data-label="ПГ-4+ПГВ">0,480</td>
      <td data-label="ПГ-2+ПГВ">0,520</td>
    </tr>
    <tr align="center">
      <td data-label="Кількість картир">4</td>
      <td data-label="ПГ-4">0,350</td>
      <td data-label="ПГ-2">0,590</td>
      <td data-label="ПГ-4+ПГВ">0,430</td>
      <td data-label="ПГ-2+ПГВ">0,390</td>
    </tr>
    <tr align="center">
      <td data-label="Кількість картир">5</td>
      <td data-label="ПГ-4">0,290</td>
      <td data-label="ПГ-2">0,480</td>
      <td data-label="ПГ-4+ПГВ">0,400</td>
      <td data-label="ПГ-2+ПГВ">0,375</td>
    </tr>
    <tr align="center">
      <td data-label="Кількість картир">6</td>
      <td data-label="ПГ-4">0,280</td>
      <td data-label="ПГ-2">0,410</td>
      <td data-label="ПГ-4+ПГВ">0,392</td>
      <td data-label="ПГ-2+ПГВ">0,360</td>
    </tr>
    <tr align="center">
      <td data-label="Кількість картир">7</td>
      <td data-label="ПГ-4">0,280</td>
      <td data-label="ПГ-2">0,360</td>
      <td data-label="ПГ-4+ПГВ">0,370</td>
      <td data-label="ПГ-2+ПГВ">0,345</td>
    </tr>
    <tr align="center">
      <td data-label="Кількість картир">8</td>
      <td data-label="ПГ-4">0,265</td>
      <td data-label="ПГ-2">0,320</td>
      <td data-label="ПГ-4+ПГВ">0,360</td>
      <td data-label="ПГ-2+ПГВ">0,335</td>
    </tr>
    <tr align="center">
      <td data-label="Кількість картир">9</td>
      <td data-label="ПГ-4">0,258</td>
      <td data-label="ПГ-2">0,289</td>
      <td data-label="ПГ-4+ПГВ">0,345</td>
      <td data-label="ПГ-2+ПГВ">0,320</td>
    </tr>
    <tr align="center">
      <td data-label="Кількість картир">10</td>
      <td data-label="ПГ-4">0,254</td>
      <td data-label="ПГ-2">0,263</td>
      <td data-label="ПГ-4+ПГВ">0,340</td>
      <td data-label="ПГ-2+ПГВ">0,315</td>
    </tr>
    <tr align="center">
      <td data-label="Кількість картир">15</td>
      <td data-label="ПГ-4">0,240</td>
      <td data-label="ПГ-2">0,242</td>
      <td data-label="ПГ-4+ПГВ">0,300</td>
      <td data-label="ПГ-2+ПГВ">0,275</td>
    </tr>
    <tr align="center">
      <td data-label="Кількість картир">20</td>
      <td data-label="ПГ-4">0,235</td>
      <td data-label="ПГ-2">0,230</td>
      <td data-label="ПГ-4+ПГВ">0,280</td>
      <td data-label="ПГ-2+ПГВ">0,260</td>
    </tr>
    <tr align="center">
      <td data-label="Кількість картир">30</td>
      <td data-label="ПГ-4">0,231</td>
      <td data-label="ПГ-2">0,218</td>
      <td data-label="ПГ-4+ПГВ">0,250</td>
      <td data-label="ПГ-2+ПГВ">0,235</td>
    </tr>
    <tr align="center">
      <td data-label="Кількість картир">40</td>
      <td data-label="ПГ-4">0,227</td>
      <td data-label="ПГ-2">0,213</td>
      <td data-label="ПГ-4+ПГВ">0,230</td>
      <td data-label="ПГ-2+ПГВ">0,205</td>
    </tr>
    <tr align="center">
      <td data-label="Кількість картир">50</td>
      <td data-label="ПГ-4">0,223</td>
      <td data-label="ПГ-2">0,210</td>
      <td data-label="ПГ-4+ПГВ">0,215</td>
      <td data-label="ПГ-2+ПГВ">0,193</td>
    </tr>
    <tr align="center">
      <td data-label="Кількість картир">60</td>
      <td data-label="ПГ-4">0,220</td>
      <td data-label="ПГ-2">0,207</td>
      <td data-label="ПГ-4+ПГВ">0,203</td>
      <td data-label="ПГ-2+ПГВ">0,186</td>
    </tr>
    <tr align="center">
      <td data-label="Кількість картир">70</td>
      <td data-label="ПГ-4">0,217</td>
      <td data-label="ПГ-2">0,205</td>
      <td data-label="ПГ-4+ПГВ">0,195</td>
      <td data-label="ПГ-2+ПГВ">0,180</td>
    </tr>
    <tr align="center">
      <td data-label="Кількість картир">80</td>
      <td data-label="ПГ-4">0,214</td>
      <td data-label="ПГ-2">0,204</td>
      <td data-label="ПГ-4+ПГВ">0,192</td>
      <td data-label="ПГ-2+ПГВ">0,175</td>
    </tr>
    <tr align="center">
      <td data-label="Кількість картир">90</td>
      <td data-label="ПГ-4">0,212</td>
      <td data-label="ПГ-2">0,203</td>
      <td data-label="ПГ-4+ПГВ">0,187</td>
      <td data-label="ПГ-2+ПГВ">0,171</td>
    </tr>
    <tr align="center">
      <td data-label="Кількість картир">100</td>
      <td data-label="ПГ-4">0,210</td>
      <td data-label="ПГ-2">0,202</td>
      <td data-label="ПГ-4+ПГВ">0,185</td>
      <td data-label="ПГ-2+ПГВ">0,163</td>
    </tr>
    <tr align="center">
      <td data-label="Кількість картир">400</td>
      <td data-label="ПГ-4">0,180</td>
      <td data-label="ПГ-2">0,170</td>
      <td data-label="ПГ-4+ПГВ">0,150</td>
      <td data-label="ПГ-2+ПГВ">0,135</td>
    </tr>
  </tbody>
</table>
