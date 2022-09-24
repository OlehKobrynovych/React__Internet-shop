import { NavLink } from 'react-router-dom';
import './AboutUs.css';

import woman from '../../assets/images/woman.webp';


// import { useState, useRef } from 'react';
// import { useNavigate } from 'react-router-dom';
// import cart from '../../assets/images/cart.svg';

// import Helocation from '../Helocation/Helocation';

function AboutUs() {
    // const [isOpenMenu, setIsOpenMenu] = useState(false);

    // const searchInputRef = useRef(null);

    // const navigate = useNavigate();

    // const handleClick = () => {
    //     searchInputRef.current.focus()
    // };

    return (
        <div className="about-us">
            <div className="about-us-wrap container">
                <p className="about-us__path">
                    <NavLink to='/'>Головна сторінка &nbsp; / &nbsp;</NavLink>
                    <span>ПРО НАС &nbsp; /</span>
                </p>

                <h4 className="about-us__title">ПРО НАС</h4>

                <div className="about-us__info-wrap">
                    <div className="about-us__info">
                        <div className="about-us__info-img"><img src={woman} alt='img'/></div>
                        <div className="about-us__info-text-wrap">
                            <h2 className="about-us__info-title">БРЕНД</h2>
                            <p className="about-us__info-text">
                                Наша історія починається в далекому 1990 році. Тоді зароджується історія двох маленьких людей з баченням великого майбутнього української моди. Галина та Олег Червонюк надихаються духом змін кінця ХХ століття і починають справжню культурну революцію. В пострадянському просторі невеличкого міста зароджувалися цінності нашого бренду. Ми поєднуємо тенденції найфешенебільниших клубів Лондону та Парижу з street-style. В культурі сучасної української моди свобода думки та стилю доступні кожному. 
                            </p>
                        </div>
                    </div>

                    <div className="about-us__info">
                        <div className="about-us__info-img"><img src={woman} alt='img'/></div>
                        <div className="about-us__info-text-wrap">
                            <h2 className="about-us__info-title">КОНЦЕПТ</h2>
                            <p className="about-us__info-text">
                            За правилами нашої компанії товар в магазинах оновлюється двічі на тиждень. Завдяки цьому на наших полицях завжди мешкають тренди та новинки моди. З кожним роком ми розвиваємо рух зелених в Україні. Наша компанія повністю відмовилась від викорстання газу та перейшла на відновлювальні джерела енергії. Щороку ми збільшуємо частку використання еко сировини та матеріалів, які розкладаються природнім шляхом. Завдяки сучасній голанській системі очистки води від нашого виробництва не страждає жодна водойма України.  
                            </p>
                        </div>
                    </div>
                </div>

                <h2 className="about-us__public-title">Публічна оферта</h2>
                <p className="about-us__public-sub-title">на замовлення, придбання, продаж та доставку товарів </p>
                <p className="about-us__public-text">
                    Цей договір між Товариством з обмеженою відповідальністю «Т-Стиль», в подальшому «Продавець» і користувачем послугами інтернет-сайту, в подальшому - «Замовник», є офіційною пропозицією Продавця на адресу необмеженого кола осіб укласти з Продавцем Договір про поставку товарів дистанційним способом на умовах, що передбачені цією офертою, шляхом створення Замовлення в Інтернет-магазині на веб-сайті
                    'НАЗВА САЙТУ' . Покупець, діючи з метою придбання Товару, приймає умови цього договору купівлі-продажу товарів (далі - Договір) на наступних умовах.
                </p>

                <p className="about-us__public-sub-title">1. ВИЗНАЧЕННЯ ТЕРМІНІВ </p>
                <p className="about-us__public-text"><b>Договір публічної оферти</b> – публічний Договір, умови якого згідно ст.ст. 633, 641 Цивільного кодексу України, є однаковими для всіх Покупців, беззастережне прийняття умов якого Покупцем (оплата Товару у відповідності до ч. 2 ст. 642 Цивільного кодексу України) вважається акцептом даного Договору між Продавцем і Покупцем.</p>
                <p className="about-us__public-text"><b>Адміністрація </b>– Товариство з обмеженою відповідальністю «Т-Стиль», зареєстроване за законодавством України, ЄДРПОУ 35750435, фактично розташоване за адресою: 33016, м. Рівне, вул. Фабрична, буд. 12, що є правовласником веб-сайту "НАЗВА МАгазину"</p>
                <p className="about-us__public-text"><b>Акцепт </b> – прийняття особою пропозиції укласти Договір (натисканням на посилання "Оформити замовлення", або шляхом здійснення замовлення через оператора Інтернет – магазину).</p>
                <p className="about-us__public-text"><b>Інтернет-магазин</b>–відповідний програмно-функціональний комплекс, розміщений на офіційному веб-сайті за адресою "НАЗВА МАГАЗИНУ" , який дозволяє ознайомитись з Товаром, його зовнішнім виглядом, технічними характеристиками, ціною, умовами оплати, тощо, зробити відповідне замовлення та ін.</p>
                <p className="about-us__public-text"><b>Продавець</b> – юридична особа або фізична особа-підприємець, яка розміщує в Інтернет – магазині інформацію про Товари і/або послуги, що ним реалізуються. Продавцем може бути як Адміністрація так і будь-яка особа, якій Адміністрація надала право на розміщення відомостей про Товар та/або послуги. Найменування Продавця вказується в документах на передачу Товару Покупцеві.</p>
                <p className="about-us__public-text"><b>Оферта </b> – пропозиція Продавця укласти даний Договір публічної оферти на умовах, викладених в даному Договорі, що адресована необмеженому колу осіб.</p>
                <p className="about-us__public-text"><b>Оформлення замовлення</b> – заявка Покупця на купівлю Товарів, що адресується Продавцю для її виконання та здійснюється за допомогою розміщення Покупцем заявки в Інтернет-магазині натисканням на посилання "Оформити замовлення", або наданням згоди на оформлення замовлення оператору Інтернет–магазину.</p>
                <p className="about-us__public-text"><b>Підтвердження замовлення </b> – повідомлення Продавця про отримання замовлення від Покупця та прийняття такого замовлення до виконання.</p>
                <p className="about-us__public-text"><b>Покупець</b> – будь-яка особа, що акцептувала дану публічну оферту.</p>
                <p className="about-us__public-text"><b>Сторони</b>– сукупне найменування Продавця і Покупця.</p>
                <p className="about-us__public-text"><b>Товар </b> – одяг, аксесуари, та будь-які інші товари, інформацію про які розміщено в Інтернет-магазині.</p>

                <p className="about-us__public-sub-title">2. ЗАГАЛЬНІ ПОЛОЖЕННЯ</p>

                <p className="about-us__public-text">
                    2.1. Наведена нижче інформація є офіційною пропозицією (офертою) інтернет-магазину https://goldi.ua/ будь-якій фізичній особі (далі - Покупець) укласти договір купівлі-продажу товарів. Зазначений договір є публічним, тобто, відповідно до статті 633 Цивільного кодексу України його умови однакові для всіх покупців.

                    2.2. Згідно зі статтею 642 Цивільного Кодексу України повним і беззастережним прийняттям умов даної пропозиції (оферти), що підтверджує укладення Договору купівлі-продажу товарів на запропонованих нижче умовах, є факт оформлення та підтвердження замовлення.

                    2.3. Оформленням Замовлення Покупець підтверджує узгодження і безумовне прийняття ним умов цієї пропозиції (оферти).

                    2.4. Укладаючи Договір (тобто акцептуючи умови справжньої Пропозиції (Пропоновані можливості) шляхом оформлення Замовлення), Покупець підтверджує наступне:

                    - Покупець цілком і повністю ознайомлений, і згоден з умовами цієї пропозиції (оферти);

                    - Покупець дає дозвіл на збір, обробку та передачу його персональних даних на умовах, визначених нижче в Застереженні щодо збору, обробки та передачі персональних даних дозвіл на обробку персональних даних діє протягом усього терміну дії Договору, а також протягом необмеженого терміну після закінчення його дії. Крім цього, укладенням Договору Замовник підтверджує, що він повідомлений (без додаткового повідомлення) про права, встановлених Законом України "Про захист персональних даних", про цілі збору даних, а також про те, що його персональні дані передаються Продавцю з метою можливості виконання умов цього Договору, можливості проведення взаєморозрахунків, а також для отримання рахунків, актів та інших документів. Замовник також погоджується з тим, що Продавець має право надавати доступ та передавати його персональні дані третім особам без будь-яких додаткових повідомлень Замовника, не змінюючи при цьому мета обробки персональних даних. Обсяг прав Замовника, як суб'єкта персональних даних відповідно до Закону України "Про захист персональних даних" йому відомий і зрозумілий.
                </p>

                <p className="about-us__public-sub-title">3. ЦІНА ТОВАРУ </p>
                                
                <p className="about-us__public-text">
                    3.1. Ціна на кожну позицію Товару вказана на сайті Інтернет-магазину.

                    3.2. Продавець має право в односторонньому порядку змінити ціну на будь-яку позицію Товару.

                    3.3. У разі зміни ціни на замовлений Товар Продавець зобов'язується проінформувати Покупця про зміну ціни Товару.

                    3.4. Покупець має право підтвердити або анулювати Замовлення на придбання Товару, якщо ціна змінена Продавцем після оформлення Замовлення.

                    3.5. Зміна Продавцем ціни на оплачений Покупцем Товар не допускається.

                    3.6. Продавець вказує вартість доставки Товару на сайті Інтернет-магазину або повідомляє Покупцеві при оформленні замовлення Оператором.

                    3.7. Зобов'язання Покупця по оплаті Товару вважаються виконаними з моменту надходження Продавцю коштів.

                    3.8. Розрахунки між Продавцем і Покупцем за Товар здійснюються способами, зазначеними на сайті Інтернет-магазину в розділі «Доставка і оплата».
                </p>
               
                <p className="about-us__public-sub-title">4. ОФОРМЛЕННЯ ЗАМОВЛЕННЯ </p>
                <p className="about-us__public-text">
                    4.1. Замовлення Товару здійснюється Покупцем через Оператора по телефону:

                    +380 675572036

                    +380 673106856 або через сервіс сайту Інтернет-магазину https://goldi.ua/

                    4.2. Найменування, кількість, артикул, ціна обраного Покупцем Товару вказуються в кошику Покупця на сайті Інтернет-магазину.

                    4.3. Якщо Продавцю необхідна додаткова інформація, він має право запросити її у Покупця. У разі ненадання необхідної інформації Покупцем, Продавець не несе відповідальності за надання якісної послуги Покупцю при покупці товарів в інтернет-магазині.

                    4.4. Ухвалення Покупцем умов цієї Оферти здійснюється за допомогою оформлення Замовлення через Оператора. Після оформлення Замовлення через Оператора дані про Покупця реєструються в базі даних Продавця.

                    4.5. Покупець несе відповідальність за достовірність наданої інформації при оформленні Замовлення.

                    4.6. Договір купівлі-продажу дистанційним способом між Продавцем і Покупцем вважається укладеним з моменту електронного оформлення замовлення на сервісі сайту інтернет-магазину.
                </p>

                <p className="about-us__public-sub-title">5. ДОСТАВКА ТА ПЕРЕДАЧА ТОВАРУ ПОКУПЦЮ</p>
                
                <p className="about-us__public-text">
                    5.1. Способи, порядок і терміни доставки товарів вказані на сайті в розділі «Доставка і оплата». Порядок і умови доставки замовленого товару Покупець погоджує з оператором інтернет-магазину в момент оформлення покупки.

                    5.3. Доставка товару здійснюється із залученням третіх осіб на вибір Покупця (службою поштового відправлення, службою доставки, кур‘єрською службою, та ін.).

                    5.4. При поставці Товару Покупцю, перевезення та доставка таких Товарів здійснюється за рахунок Покупця.

                    5.5. При доставці Товару за допомогою перевізника, Покупець в повному обсязі і беззастережно погоджується з Правилами перевезення вантажів компанії перевізника (в т.ч. вартістю доставки).

                    5.6. Зобов’язання Продавця по передачі Товару вважається виконаним, а також ризик випадкового знищення Товару переходять до Покупця у момент передачі Продавцем Товару перевізнику. Відповідальність за доставку Товару до місця доставки несе перевізник.

                    5.7. При отриманні товару Замовник повинен у присутності представника Поштового оператора/Кур'єра перевірити відповідність Товару якісним і кількісним характеристикам, (найменування товару, кількість, комплектність).

                    5.8. Замовник або Представник Замовника під час приймання товару підтверджує своїм підписом в товарному чеку та / або замовленні на доставку товарів, що не має претензій до кількості товару, зовнішнім виглядом і комплектності товару.
                </p>

                <p className="about-us__public-sub-title">6. ПОВЕРНЕННЯ ТОВАРУ</p>

                <p className="about-us__public-text">
                    6.1. Замовник має право відмовитися від товару в будь-який час до його передачі, а після передачі товару - в порядку і на умовах, визначених Законом України «Про захист прав споживачів».

                    6.2. Повернення товару належної якості можливий у випадку, якщо збережено його товарний вигляд, споживчі властивості, а також документ, що підтверджує факт покупки і умови замовлення зазначеного товару.

                    6.3. Замовник не має права відмовитися від товару належної якості, що має індивідуально-визначені властивості, якщо зазначений товар може бути використаний виключно Споживачем, який його придбав, (в т.ч. не стандартні, за бажанням Замовника, розміри та інше). Підтвердженням того, що товар має індивідуально-визначені властивості, є відмінність розмірів товару та інших характеристик, що вказані в інтернет-магазині.

                    6.4. Повернення товару, у випадках, передбачених законом та цим Договором, здійснюється за адресою, вказаною на сайті в розділі «Доставка і оплата».

                    6.5. При відмові Замовника від товару належної якості Продавець повертає кошти в розмірі вартості такого Товару, за винятком витрат продавця на доставку товару, який повертається.

                    6.6. Повернення суми, зазначеної в п.6.5. здійснюється протягом 14 робочих днів після отримання повернення магазином товару.
                </p>

                <p className="about-us__public-sub-title">7. ПРАВА І ОБОВ’ЯЗКИ ПРОДАВЦЯ</p>

                <p className="about-us__public-text">
                    7.1. Продавець має право:

                    - в будь-який час вносити зміни в даний Договір, матеріали та інформацію (в т.ч. про Товари), що пропонуються в Інтернет – магазині;

                    - відмовитись від укладення Договору публічної оферти за відсутності у нього можливостей продати Покупцеві відповідний Товар;

                    - здійснювати записи телефонних переговорів з Покупцем;

                    - призупинити продаж Товарів Покупцю у разі порушення Покупцем своїх зобов’язань (зокрема, але не обмежуючись, не здійснення оплати за замовлений Товар) за цим Договором;

                    - вимагати від Покупця добросовісно виконувати свої зобов’язання за даним Договором;

                    - без узгодження з Покупцем, передавати свої права та обов'язки по виконанню Договору третім особам.

                    8.2. Продавець зобов’язаний:

                    - надіслати Покупцю підтвердження замовлення або повідомити його про неможливість виконати замовлення Покупця;

                    - передати Товар Покупцеві після здійснення ним оплати за такий Товар;

                    - перевірити якість та кількість Товару при його передачі Покупцеві;

                    - не розголошувати будь-яку приватну інформацію Покупця і не надавати доступу до цієї інформації третім особам, за винятком випадків, передбачених законодавством України (не вважається порушенням надання Продавцем інформації контрагентам і третім особам, що діють на підставі Договору з Продавцем, в тому числі і для виконання зобов'язань перед Покупцем);

                    - запобігати спробам несанкціонованого доступу до інформації та/або передачу її особам, які не мають безпосереднього відношення до виконання Замовлень; своєчасно виявляти і припиняти такі факти;

                    - належним чином виконувати умови даного Договору.
                </p>

                <p className="about-us__public-sub-title">9. ПРАВА І ОБОВ’ЯЗКИ ПОКУПЦЯ</p>

                <p className="about-us__public-text">
                    9.1. Покупець має право:

                    - у разі не згоди з будь-яким пунктом оферти, відмовитись від покупки Товарів та будь-яких інших дій, передбачених даним Договором;

                    - звертатись за консультацією до Продавця щодо властивостей та характеристик Товару;

                    - вимагати від Продавця добросовісно виконувати свої зобов’язання за даним Договором;

                    - інші права, передбачені чинним законодавством України

                    9.2. Покупець зобов’язаний:

                    - до моменту укладення Договору ознайомитися зі змістом та умовами Договору, цінами на Товар, пропонованими Продавцем в Інтернет-магазині;

                    - повідомити всі необхідні дані, що ідентифікують його як покупця про оформленні замовлення;

                    - своєчасно оплатити замовлений Товар (і його доставку, у разі необхідності доставки Товару);

                    - належним чином оформити прийняття Товару (в т.ч. підписати та передати Продавцю відповідні документи на отримання Товару), пред’явити документ, що посвідчує особу (особу, уповноважену на отримання Товару);

                    - перевірити якість та кількість Товару при його отриманні від Продавця;

                    - не розголошувати будь-яку приватну інформацію Продавця і не надавати доступу до цієї інформації третім особам, за винятком випадків, передбачених законодавством України;

                    - належним чином виконувати умови даного Договору.
                </p>

                <p className="about-us__public-sub-title">10. ВІДПОВІДАЛЬНІСТЬ СТОРІН ТА ПОРЯДОК ВИРІШЕННЯ СПОРІВ</p>

                <p className="about-us__public-text">
                    10.1. Сторони несуть відповідальність за невиконання або неналежне виконання своїх зобов’язань за даним Договором у відповідності до чинного законодавства України.

                    10.2. Покупець, оформлюючи замовлення, несе відповідальність за достовірність наданої Продавцю інформації про себе, а також підтверджує, що він ознайомлений з умовами даного Договору і погоджується з ними.

                    10.3. Продавець не несе відповідальності за неможливість виконати замовлення Покупця, якщо така неможливість виникла в результаті незалежних від Продавця обставин, включаючи, але не обмежуючись, порушення роботи ліній зв’язку, несправність устаткування тощо.

                    10.4. Загальна відповідальність Продавця за невиконання або неналежне виконання умов даного Договору обмежується сумою платежу Покупця, що здійснений на підставі даного Договору.
                </p>

                <p className="about-us__public-sub-title">11. ФОРС-МАЖОР</p>

                <p className="about-us__public-text">
                    11.1. Перебіг терміну виконання Сторонами зобов’язань за цим Договором може бути призупинений тільки в разі настання обставин непереборної сили (форс-мажор), а саме: пожежі, стихійного лиха, збройного конфлікту, істотної зміни законодавства України, що ускладнює або унеможливлює виконання Стороною своїх зобов’язань по даному Договору, або з інших обставин, які перебувають поза контролем Сторін.

                    11.2. Сторона, яка зазнала дії обставин непереборної сили, має протягом 5 (п’яти) календарних днів письмово повідомити про це другу Сторону.

                    11.3. У випадку настання обставин непереборної сили Сторона, яка зазнала їх дії, за умови дотримання вимог пункту 11.2 даного Договору, на період дії таких обставин звільняється від відповідальності за даним Договором.

                    11.4. Після припинення дії обставин непереборної сили, перебіг терміну виконання зобов’язань поновлюється. Про припинення дії обставин непереборної сили Сторона, яка зазнала їх дії, має письмово повідомити другу Сторону.

                    11.5. Якщо дія обставин непереборної сили триває більше ніж 30 (тридцять) календарних днів поспіль, то Сторони мають право припинити дію цього Договору та здійснити остаточні розрахунки. При цьому збитки, заподіяні припиненням дії Договору, не відшкодовуються й штрафні санкції не сплачуються.
                </p>

                <p className="about-us__public-sub-title">12. ІНШІ УМОВИ ДОГОВОРУ</p>

                <p className="about-us__public-text">
                    12.1. Даний Договір набуває чинності з моменту отримання Покупцем підтвердження замовлення від Продавця. Договір діє до моменту повного виконання Сторонами своїх зобов’язань.

                    12.2. Цей Договір укладено на території України і діє в рамках чинного законодавства України.

                    12.3. Покупець та/або уповноважені особи Покупця надають згоду Продавцю на обробку їх персональних даних, а саме прізвища, ім’я, по-батькові, зареєстрованого місця проживання та/або фактичного місця проживання, ідентифікаційного номеру платника податків, паспортних даних, а також контактного номеру телефону/факсу, електронної адреси, будь-яких інших даних наданих при оформленні замовлення, з метою виконання вимог чинного законодавства України, пов’язаного з веденням фінансово-господарської діяльності Продавця та в межах вимог чинного законодавства про захист персональних даних.

                    Покупець підтверджує, що ознайомлений з правами суб'єкта персональних даних, передбачених ст. 8 Закону України «Про захист персональних даних». Адреса зберігання персональних даних – 33016 Україна, м. Рівне, вул. Фабрична, 12.

                    12.4. Інтернет - магазин містить матеріали, товарні знаки, фірмові найменування та інші матеріали, що охороняються законом. Покупець або будь-які інші треті особи не мають права використовувати матеріали, розміщені в Інтернет – магазині (в т.ч. вносити зміни, копіювати, публікувати, передавати третім особам і т.д.). Використання матеріалів сайту без згоди правовласників не допускається. При цитуванні матеріалів сайту, включаючи охоронювані авторські твори, посилання на сайт Інтернет - магазину обов'язкове.

                    12.5. Всі суперечки, пов'язані з невиконанням, або неналежним виконанням своїх зобов'язань за цим Договором Сторони будуть намагатися вирішити в ході переговорів. У разі недосягнення згоди в ході переговорів, суперечки будуть вирішуватися в порядку передбаченому чинним законодавством України.

                    12.6. У випадках, що не врегульовані даним Договором, Сторони керуються чинним законодавством України.
                </p>

                <p className="about-us__public-sub-title">Уважно ознайомтеся з текстом публічної оферти, і якщо Ви не згодні з будь-яким пунктом оферти, Ви маєте право відмовитися від покупки Товарів, наявних в Інтернет - магазині, і не вчиняти дій, вказаних в розділі 4 цієї Оферти.</p>
            </div>
        </div>
    );
}

export default AboutUs;