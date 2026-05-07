import { useParams, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Breadcrumbs from '../components/layout/Breadcrumbs';

export default function BlogPost() {
  const { slug } = useParams();
  const { t, i18n } = useTranslation();

  const title = t(`home.blog.posts.${slug}.title`);
  const date = t(`home.blog.posts.${slug}.date`);

  // Компонент для зеленой точки
  const GreenDot = () => (
    <span style={{ 
      display: 'inline-block', 
      width: '8px', 
      height: '8px', 
      backgroundColor: 'var(--primary-color)', 
      borderRadius: '50%', 
      marginRight: '12px',
      flexShrink: 0,
      marginTop: '10px'
    }} />
  );

  // СТАТЬЯ 1: ВИДЕОКАРТЫ (RU)
  const getGpuArticleContentRU = () => (
    <div style={{ color: 'var(--text-color)', lineHeight: '1.8', fontSize: '16px' }}>
      <img src="/blog/BLOG-how-to-choose-gpu.png" alt={title} style={{ width: '100%', borderRadius: '12px', marginBottom: '30px', aspectRatio: '16/9', objectFit: 'cover' }} />
      <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
        <section>
          <h2 style={{ fontSize: '32px', fontWeight: 700, marginBottom: '16px' }}>Производитель графического процессора</h2>
          <p>С него начинается название всех видеокарт. Их главным компонентом выступает графический процессор (ГПУ). Его разрабатывают компании NVIDIA и AMD. Также графические процессоры выпускает компания Intel. Но она специализируется на производстве серверных решений. Да, в 2022 году они выпустили свои карты для десктопного сегмента под брендом «ARC». Но эти устройства оказались не конкурентны на фоне ускорителей от NVIDIA и AMD.</p>
        </section>
        <section>
          <h2 style={{ fontSize: '32px', fontWeight: 700, marginBottom: '16px' }}>Семейство</h2>
          <p>Это второе слово в названии карты. Оно сообщает назначение устройства. Например, карты NVIDIA серии «TITAN» применяются для разработки нейронных сетей. А продукция AMD семейства «Radeon PRO» используется профессионалами для создания анимаций, монтажа видео в 8K разрешении и т.п.</p>
          <p style={{ marginTop: '16px' }}>Геймерам, а также ПК пользователям, не заинтересованным в работе со сложными графическими задачами, подойдут карты семейства «GeForce» от NVIDIA и «Radeon» от AMD. Далее мы будем рассматривать именно их.</p>
        </section>
        <section>
          <h2 style={{ fontSize: '32px', fontWeight: 700, marginBottom: '16px' }}>Буквенный индекс</h2>
          <p>Он следует сразу за семейством и сообщает о приблизительной мощности и поддержке современных технологий. Продукция NVIDIA обозначается тремя буквенными индексами:</p>
          <ul style={{ listStyle: 'none', padding: 0, margin: '16px 0', display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <li style={{ display: 'flex', alignItems: 'flex-start' }}><GreenDot /><div><strong>GT</strong> – устройство имеет низкую производительность и не обладает последними технологиями. Используется только для вывода изображения на монитор.</div></li>
            <li style={{ display: 'flex', alignItems: 'flex-start' }}><GreenDot /><div><strong>GTX</strong> – обладает производительностью для старых игр и несложных графических задач (обработка фото, монтаж видео в Full HD, базовое 2D-моделирование).</div></li>
            <li style={{ display: 'flex', alignItems: 'flex-start' }}><GreenDot /><div><strong>RTX</strong> – адаптер имеет поддержку всех функций, увеличенное число CUDA-ядер, трассировку лучей и DLSS-сглаживание. Используется для современного гейминга, а также для профессиональной работы с компьютерной графикой.</div></li>
          </ul>
          <p style={{ marginTop: '20px' }}>Продукция AMD маркируется двумя буквенными индексами:</p>
          <ul style={{ listStyle: 'none', padding: 0, margin: '16px 0', display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <li style={{ display: 'flex', alignItems: 'flex-start' }}><GreenDot /><div><strong>R</strong> – карта имеет низкий уровень производительности и подходит исключительно для вывода картинки на монитор.</div></li>
            <li style={{ display: 'flex', alignItems: 'flex-start' }}><GreenDot /><div><strong>RX</strong> – игровая серия ускорителей. Обладает всеми последними технологиями и подходит как для современных игр, так и для работы с графикой.</div></li>
          </ul>
        </section>
        <section>
          <h2 style={{ fontSize: '32px', fontWeight: 700, marginBottom: '16px' }}>Номер поколения</h2>
          <p>Примерно каждые 2 года выходят новые поколения видеокарт. Чем они актуальнее, тем выше их производительность. Например, NVIDIA GeForce RTX 5080, анонсированная на CES 2025, относится к серии RTX 50 – новейшему поколению, пришедшему на смену RTX 40 серии 2022 года.</p>
          <p style={{ marginTop: '16px' }}>У видеокарт NVIDIA номер поколения обозначается первыми двумя цифрами в названии. Например, числа 50 и 40 в названиях RTX 5080 и RTX 4080 как раз обозначают поколение.</p>
          <p style={{ marginTop: '16px' }}>У AMD ситуация немного изменилась: с выходом серии Radeon RX 9000 в 2025 году компания перешла на четырёхзначные номера, где поколение обозначается первой цифрой. Так, в названии AMD Radeon RX 9070 XT номер поколения – это цифра 9, а предыдущее поколение RX 7000 обозначалось цифрой 7.</p>
        </section>
        <section>
          <h2 style={{ fontSize: '32px', fontWeight: 700, marginBottom: '16px' }}>Серия и буквенный индекс в конце наименования</h2>
          <p>Именно они раскрывают конкретную производительность видеокарты. У продукции NVIDIA серия обозначается последними двумя цифрами в наименовании, а у AMD – последними тремя. Например, в названии AMD Radeon RX 9070 XT число 070 – это и есть серия. Чем она больше, тем выше производительность карты. Например, GeForce RTX 5090 превосходит GeForce RTX 5080 на 30–50% в зависимости от задачи.</p>
          <p style={{ marginTop: '16px' }}>Буквенный индекс в конце названия сообщает об «улучшенной версии» устройства. Карты NVIDIA маркируются приставкой <strong>Ti</strong>, а карты AMD – <strong>XT</strong>. Так, AMD Radeon RX 9070 XT в среднем на 10–13% мощнее обычной Radeon RX 9070.</p>
        </section>
        <section>
          <h2 style={{ fontSize: '32px', fontWeight: 700, marginBottom: '16px' }}>Разбор наименования на практике</h2>
          <p>Подытожим всё вышесказанное на примере <strong>NVIDIA GeForce RTX 5090</strong>. Её название говорит нам о том, что:</p>
          <ul style={{ listStyle: 'none', padding: 0, margin: '16px 0', display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <li style={{ display: 'flex', alignItems: 'flex-start' }}><GreenDot /><div><strong>NVIDIA</strong> – графический процессор от компании «зелёных»;</div></li>
            <li style={{ display: 'flex', alignItems: 'flex-start' }}><GreenDot /><div><strong>GeForce</strong> – устройство предназначено для игр и работы с графикой;</div></li>
            <li style={{ display: 'flex', alignItems: 'flex-start' }}><GreenDot /><div><strong>RTX</strong> – карта имеет поддержку всех последних функций;</div></li>
            <li style={{ display: 'flex', alignItems: 'flex-start' }}><GreenDot /><div><strong>50</strong> – устройство последнего поколения, выпущенного в январе 2025 года;</div></li>
            <li style={{ display: 'flex', alignItems: 'flex-start' }}><GreenDot /><div><strong>90</strong> – адаптер является самым мощным в текущем поколении.</div></li>
          </ul>
          <p style={{ marginTop: '20px' }}>У компании NVIDIA серия «90» является максимальной. У продукции AMD ситуация похожая – с переходом на серию RX 9000 самые производительные модели получили обозначение <strong>9070 XT</strong>, и именно цифра 9 в начале названия сигнализирует о принадлежности к новейшему поколению.</p>
        </section>
        <section>
          <h2 style={{ fontSize: '32px', fontWeight: 700, marginBottom: '16px' }}>Что выбрать – NVIDIA или AMD</h2>
          <p>Определитесь, зачем вам нужна видеокарта. Если требуется комплектующая для работы с графикой (видеомонтаж, проектирование, обработка фото, 3D-моделирование и т.п.), то ответ однозначный – берите карту NVIDIA. Почему устройство от «зелёных»? Потому что их продукция отличается стабильной работой и наличием CUDA-ядер.</p>
          <p style={{ marginTop: '16px' }}>Под стабильной работой понимают отсутствие ошибок. Лаги, зависания, фризы, вылеты программ – всё это отсутствует у графических ускорителей NVIDIA. А вот карты AMD, по сообщениям пользователей, перечисленными проблемами не обделены. Однако с выходом каждого нового драйвера ситуация становится лучше. </p>
          <p style={{ marginTop: '16px' }}>Ядра CUDA представляют собой технологию параллельного вычисления. Эта разработка увеличивает производительность ГПУ как в играх, так и в профессиональных задачах. При этом стоит учитывать, что NVIDIA по-прежнему значительно опережает AMD в задачах, связанных с ИИ-вычислениями.</p>
          <p style={{ marginTop: '16px' }}>Если вас интересует гейминг без трассировки лучей, карты от AMD заслуживают внимания. В актуальном поколении Radeon RX 9070 XT в среднем на 15% быстрее GeForce RTX 5070 при той же цене в рядовых играх. Однако для трассировки лучей NVIDIA остается более надежным выбором.</p>
        </section>
      </div>
    </div>
  );

  // ARTICLE 1: GRAPHICS CARDS (EN)
  const getGpuArticleContentEN = () => (
    <div style={{ color: 'var(--text-color)', lineHeight: '1.8', fontSize: '16px' }}>
      <img src="/blog/BLOG-how-to-choose-gpu.png" alt={title} style={{ width: '100%', borderRadius: '12px', marginBottom: '30px', aspectRatio: '16/9', objectFit: 'cover' }} />
      <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
        <section>
          <h2 style={{ fontSize: '32px', fontWeight: 700, marginBottom: '16px' }}>GPU Manufacturer</h2>
          <p>The name of all graphics cards begins with this. Their main component is the graphics processing unit (GPU). It is developed by NVIDIA and AMD. Intel also produces graphics processors. However, it specializes in server solutions. Yes, in 2022, they released their cards for the desktop segment under the "ARC" brand. Но these devices turned out to be uncompetitive compared to accelerators from NVIDIA and AMD.</p>
        </section>
        <section>
          <h2 style={{ fontSize: '32px', fontWeight: 700, marginBottom: '16px' }}>Family</h2>
          <p>This is the second word in the card's name. It indicates the purpose of the device. For example, NVIDIA's "TITAN" series cards are used for neural network development. And AMD's "Radeon PRO" family products are used by professionals for animation, 8K video editing, etc.</p>
          <p style={{ marginTop: '16px' }}>For gamers and PC users not interested in complex graphics tasks, the "GeForce" family from NVIDIA and "Radeon" from AMD are suitable. We will consider them specifically further on.</p>
        </section>
        <section>
          <h2 style={{ fontSize: '32px', fontWeight: 700, marginBottom: '16px' }}>Letter Index</h2>
          <p>It follows immediately after the family and indicates approximate power and support for modern technologies. NVIDIA products are designated by three letter indices:</p>
          <ul style={{ listStyle: 'none', padding: 0, margin: '16px 0', display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <li style={{ display: 'flex', alignItems: 'flex-start' }}><GreenDot /><div><strong>GT</strong> – the device has low performance and lacks the latest technologies. Used only for displaying images on a monitor.</div></li>
            <li style={{ display: 'flex', alignItems: 'flex-start' }}><GreenDot /><div><strong>GTX</strong> – has performance for older games and simple graphics tasks (photo processing, Full HD video editing, basic 2D modeling).</div></li>
            <li style={{ display: 'flex', alignItems: 'flex-start' }}><GreenDot /><div><strong>RTX</strong> – the adapter supports all functions, has an increased number of CUDA cores, ray tracing, and DLSS smoothing. Used for modern gaming as well as professional computer graphics work.</div></li>
          </ul>
          <p style={{ marginTop: '20px' }}>AMD products are marked with two letter indices:</p>
          <ul style={{ listStyle: 'none', padding: 0, margin: '16px 0', display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <li style={{ display: 'flex', alignItems: 'flex-start' }}><GreenDot /><div><strong>R</strong> – the card has a low performance level and is suitable exclusively for displaying a picture on a monitor.</div></li>
            <li style={{ display: 'flex', alignItems: 'flex-start' }}><GreenDot /><div><strong>RX</strong> – a gaming series of accelerators. It has all the latest technologies and is suitable for both modern games and graphics work.</div></li>
          </ul>
        </section>
        <section>
          <h2 style={{ fontSize: '32px', fontWeight: 700, marginBottom: '16px' }}>Generation Number</h2>
          <p>Approximately every 2 years, new generations of graphics cards are released. The more relevant they are, the higher their performance. For example, the NVIDIA GeForce RTX 5080, announced at CES 2025, belongs to the RTX 50 series – the newest generation that replaced the 2022 RTX 40 series.</p>
          <p style={{ marginTop: '16px' }}>For NVIDIA graphics cards, the generation number is indicated by the first two digits in the name. For example, the numbers 50 and 40 in the names RTX 5080 and RTX 4080 denote the generation.</p>
          <p style={{ marginTop: '16px' }}>With AMD, the situation has changed slightly: with the release of the Radeon RX 9000 series in 2025, the company switched to four-digit numbers, where the generation is indicated by the first digit. Thus, in the name AMD Radeon RX 9070 XT, the generation number is 9, while the previous RX 7000 generation was denoted by the number 7.</p>
        </section>
        <section>
          <h2 style={{ fontSize: '32px', fontWeight: 700, marginBottom: '16px' }}>Series and Suffix</h2>
          <p>It is these that reveal the specific performance of the graphics card. For NVIDIA products, the series is indicated by the last two digits in the name, and for AMD – by the last three. For example, in the name AMD Radeon RX 9070 XT, the number 070 is the series. The larger it is, the higher the card's performance. For instance, the GeForce RTX 5090 surpasses the GeForce RTX 5080 by 30–50% depending on the task.</p>
          <p style={{ marginTop: '16px' }}>The letter index at the end of the name indicates an "improved version" of the device. NVIDIA cards are marked with the <strong>Ti</strong> prefix, and AMD cards with <strong>XT</strong>. Thus, the AMD Radeon RX 9070 XT is on average 10–13% more powerful than the standard Radeon RX 9070.</p>
        </section>
        <section>
          <h2 style={{ fontSize: '32px', fontWeight: 700, marginBottom: '16px' }}>Naming Breakdown in Practice</h2>
          <p>Let's summarize everything above using the <strong>NVIDIA GeForce RTX 5090</strong> as an example. Its name tells us that:</p>
          <ul style={{ listStyle: 'none', padding: 0, margin: '16px 0', display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <li style={{ display: 'flex', alignItems: 'flex-start' }}><GreenDot /><div><strong>NVIDIA</strong> – graphics processor from the "green" team;</div></li>
            <li style={{ display: 'flex', alignItems: 'flex-start' }}><GreenDot /><div><strong>GeForce</strong> – the device is designed for games and graphics work;</div></li>
            <li style={{ display: 'flex', alignItems: 'flex-start' }}><GreenDot /><div><strong>RTX</strong> – the card supports all the latest features;</div></li>
            <li style={{ display: 'flex', alignItems: 'flex-start' }}><GreenDot /><div><strong>50</strong> – the latest generation device released in January 2025;</div></li>
            <li style={{ display: 'flex', alignItems: 'flex-start' }}><GreenDot /><div><strong>90</strong> – the adapter is the most powerful in the current generation.</div></li>
          </ul>
          <p style={{ marginTop: '20px' }}>For NVIDIA, the "90" series is the maximum. AMD has a similar situation – with the transition to the RX 9000 series, the most productive models received the <strong>9070 XT</strong> designation, and it is the digit 9 at the beginning of the name that signals belonging to the newest generation.</p>
        </section>
        <section>
          <h2 style={{ fontSize: '32px', fontWeight: 700, marginBottom: '16px' }}>What to Choose – NVIDIA or AMD</h2>
          <p>Decide what you need a graphics card for. If you need a component for graphics work (video editing, design, photo processing, 3D modeling, etc.), the answer is clear – take an NVIDIA card. Why the "green" team? Because their products are characterized by stable operation and the presence of CUDA cores.</p>
          <p style={{ marginTop: '16px' }}>Stable operation means no errors. Lags, freezes, hang-ups, program crashes – all these are absent from NVIDIA graphics accelerators. However, AMD cards, according to user reports, are not exempt from these problems. But with each new driver release, the situation gets better.</p>
          <p style={{ marginTop: '16px' }}>CUDA cores are a parallel computing technology. This development increases GPU performance in both games and professional tasks. At the same time, it is worth considering that NVIDIA still significantly outpaces AMD in tasks related to AI computing.</p>
          <p style={{ marginTop: '16px' }}>If you are interested in gaming without ray tracing, cards from AMD deserve attention. In the current generation, the Radeon RX 9070 XT is on average 15% faster than the GeForce RTX 5070 for the same price in standard games. However, for ray tracing, NVIDIA remains a more reliable choice.</p>
        </section>
      </div>
    </div>
  );

  // СТАТЬЯ 2: КРОССПЛАТФОРМЕННОСТЬ (RU)
  const getCrossplayArticleContentRU = () => (
    <div style={{ color: 'var(--text-color)', lineHeight: '1.8', fontSize: '16px' }}>
      <img src="/blog/BLOG-crossplay-multiplatform.png" alt={title} style={{ width: '100%', borderRadius: '12px', marginBottom: '30px', aspectRatio: '16/9', objectFit: 'cover' }} />
      <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
        <section>
          <p style={{ fontSize: '18px', color: 'var(--text-secondary)' }}>Кросс-платформенная игра, или crossplay, – это технология, которая позволяет игрокам на разных устройствах взаимодействовать в одном виртуальном пространстве. Для PC-геймеров эта функция стирает технические границы между сообществами.</p>
        </section>
        <section>
          <h2 style={{ fontSize: '32px', fontWeight: 700, marginBottom: '16px' }}>Что такое кроссплатформенные игры?</h2>
          <p>Это возможность для пользователей разных систем (ПК, PS5, Xbox, Switch) играть вместе. Существуют типы: True Cross-Platform (Fortnite), Cross-Save (Destiny 2) и адаптированные версии (PUBG).</p>
          <ul style={{ listStyle: 'none', padding: 0, margin: '16px 0', display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <li style={{ display: 'flex', alignItems: 'flex-start' }}><GreenDot /><div><strong>True Cross-Platform:</strong> Свободное переключение между устройствами с сохранением прогресса.</div></li>
            <li style={{ display: 'flex', alignItems: 'flex-start' }}><GreenDot /><div><strong>Cross-Save:</strong> Перенос сохранений, но мультиплеер может оставаться разделенным.</div></li>
          </ul>
        </section>
        <section>
          <h2 style={{ fontSize: '32px', fontWeight: 700, marginBottom: '16px' }}>История и Тренды</h2>
          <p>Microsoft первыми объединили Xbox и Windows. Sony открыла PlayStation для кроссплея в 2019 году. Сегодня кроссплей – это драйвер роста индустрии, расширяющий аудиторию и социальную свободу игроков.</p>
        </section>
      </div>
    </div>
  );

  // ARTICLE 2: CROSS-PLAY AND MULTIPLATFORM (EN)
  const getCrossplayArticleContentEN = () => (
    <div style={{ color: 'var(--text-color)', lineHeight: '1.8', fontSize: '16px' }}>
      <img src="/blog/BLOG-crossplay-multiplatform.png" alt={title} style={{ width: '100%', borderRadius: '12px', marginBottom: '30px', aspectRatio: '16/9', objectFit: 'cover' }} />
      <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
        <section>
          <p style={{ fontSize: '18px', color: 'var(--text-secondary)' }}>Cross-platform play, or crossplay, is a technology that allows players on different devices to interact in a single virtual space. For PC gamers, this feature erases technical boundaries between communities.</p>
        </section>
        <section>
          <h2 style={{ fontSize: '32px', fontWeight: 700, marginBottom: '16px' }}>What are cross-platform games?</h2>
          <p>This is the opportunity for users of different systems (PC, PS5, Xbox, Switch) to play together. There are several types: True Cross-Platform (Fortnite), Cross-Save (Destiny 2), and adapted versions (PUBG).</p>
          <ul style={{ listStyle: 'none', padding: 0, margin: '16px 0', display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <li style={{ display: 'flex', alignItems: 'flex-start' }}><GreenDot /><div><strong>True Cross-Platform:</strong> Free switching between devices with progress synchronization.</div></li>
            <li style={{ display: 'flex', alignItems: 'flex-start' }}><GreenDot /><div><strong>Cross-Save:</strong> Save transfer is possible, but multiplayer may remain divided.</div></li>
          </ul>
        </section>
        <section>
          <h2 style={{ fontSize: '32px', fontWeight: 700, marginBottom: '16px' }}>History and Trends</h2>
          <p>Microsoft was the first to unify Xbox and Windows. Sony opened PlayStation to crossplay in 2019. Today, crossplay is a driver of industry growth, expanding the audience and social freedom of players.</p>
        </section>
      </div>
    </div>
  );

  // СТАТЬЯ 3: GTA 6 (RU)
  const getGtaArticleContentRU = () => (
    <div style={{ color: 'var(--text-color)', lineHeight: '1.8', fontSize: '16px' }}>
      <img src="/blog/BLOG-gta-price.png" alt={title} style={{ width: '100%', borderRadius: '12px', marginBottom: '30px', aspectRatio: '16/9', objectFit: 'cover' }} />
      <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
        <section>
          <h2 style={{ fontSize: '32px', fontWeight: 700, marginBottom: '16px' }}>GTA 6 на старте продаж: что известно о цене</h2>
          <p>Релиз на консолях – 19 ноября 2026 года. Цена ожидается в районе $69.99–$79.99 за стандартное издание. Бюджет разработки превысил $1 млрд, что делает проект самым дорогим в истории.</p>
        </section>
        <section>
          <h2 style={{ fontSize: '32px', fontWeight: 700, marginBottom: '16px' }}>Издания</h2>
          <div style={{ overflowX: 'auto', margin: '20px 0' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', border: '1px solid var(--border-color)' }}>
              <thead>
                <tr style={{ backgroundColor: 'var(--card-bg)' }}>
                  <th style={{ padding: '12px', textAlign: 'left' }}>Издание</th>
                  <th style={{ padding: '12px', textAlign: 'left' }}>Цена</th>
                  <th style={{ padding: '12px', textAlign: 'left' }}>Контент</th>
                </tr>
              </thead>
              <tbody>
                <tr><td style={{ padding: '12px' }}>Standard</td><td style={{ padding: '12px' }}>$70–$80</td><td style={{ padding: '12px' }}>Базовая игра</td></tr>
                <tr><td style={{ padding: '12px' }}>Deluxe</td><td style={{ padding: '12px' }}>$90–$100</td><td style={{ padding: '12px' }}>Бонусы, артбук</td></tr>
                <tr><td style={{ padding: '12px' }}>Collector’s</td><td style={{ padding: '12px' }}>$200+</td><td style={{ padding: '12px' }}>Фигурки, сувениры</td></tr>
              </tbody>
            </table>
          </div>
        </section>
        <section>
          <h2 style={{ fontSize: '32px', fontWeight: 700, marginBottom: '16px' }}>Монетизация</h2>
          <p>Shark Cards и подписка GTA+ вернутся, обеспечивая Rockstar долгосрочный доход.</p>
        </section>
      </div>
    </div>
  );

  // ARTICLE 3: GTA 6 (EN)
  const getGtaArticleContentEN = () => (
    <div style={{ color: 'var(--text-color)', lineHeight: '1.8', fontSize: '16px' }}>
      <img src="/blog/BLOG-gta-price.png" alt={title} style={{ width: '100%', borderRadius: '12px', marginBottom: '30px', aspectRatio: '16/9', objectFit: 'cover' }} />
      <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
        <section>
          <h2 style={{ fontSize: '32px', fontWeight: 700, marginBottom: '16px' }}>GTA 6 Launch: What's Known About the Price</h2>
          <p>Console release – November 19, 2026. The price is expected to be around $69.99–$79.99 for the standard edition. The development budget has exceeded $1 billion, making the project the most expensive in history.</p>
        </section>
        <section>
          <h2 style={{ fontSize: '32px', fontWeight: 700, marginBottom: '16px' }}>Editions</h2>
          <div style={{ overflowX: 'auto', margin: '20px 0' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', border: '1px solid var(--border-color)' }}>
              <thead>
                <tr style={{ backgroundColor: 'var(--card-bg)' }}>
                  <th style={{ padding: '12px', textAlign: 'left' }}>Edition</th>
                  <th style={{ padding: '12px', textAlign: 'left' }}>Price</th>
                  <th style={{ padding: '12px', textAlign: 'left' }}>Content</th>
                </tr>
              </thead>
              <tbody>
                <tr><td style={{ padding: '12px' }}>Standard</td><td style={{ padding: '12px' }}>$70–$80</td><td style={{ padding: '12px' }}>Base game</td></tr>
                <tr><td style={{ padding: '12px' }}>Deluxe</td><td style={{ padding: '12px' }}>$90–$100</td><td style={{ padding: '12px' }}>Bonuses, artbook</td></tr>
                <tr><td style={{ padding: '12px' }}>Collector’s</td><td style={{ padding: '12px' }}>$200+</td><td style={{ padding: '12px' }}>Figures, souvenirs</td></tr>
              </tbody>
            </table>
          </div>
        </section>
        <section>
          <h2 style={{ fontSize: '32px', fontWeight: 700, marginBottom: '16px' }}>Monetization</h2>
          <p>Shark Cards and GTA+ subscription will return, providing Rockstar with long-term revenue.</p>
        </section>
      </div>
    </div>
  );

  // СТАТЬЯ 5: RYZEN 9000 (RU)
  const getRyzenArticleContentRU = () => (
    <div style={{ color: 'var(--text-color)', lineHeight: '1.8', fontSize: '16px' }}>
      <img src="/blog/BLOG-amd-ryzen-9000.png" alt={title} style={{ width: '100%', borderRadius: '12px', marginBottom: '30px', aspectRatio: '16/9', objectFit: 'cover' }} />
      <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
        <section>
          <h2 style={{ fontSize: '32px', fontWeight: 700, marginBottom: '16px' }}>Что такое Zen 5 и почему это круто?</h2>
          <p>Если коротко: это новый «мозг» процессора. Инженеры AMD не просто подняли частоты, а серьёзно переработали архитектуру.</p>
          <ul style={{ listStyle: 'none', padding: 0, margin: '16px 0', display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <li style={{ display: 'flex', alignItems: 'flex-start' }}><GreenDot /><div><strong>Более умные ядра:</strong> новые процессоры лучше «предсказывают будущее» (branch prediction). В играх, где ситуация меняется каждую секунду, это критично для стабильности кадров.</div></li>
            <li style={{ display: 'flex', alignItems: 'flex-start' }}><GreenDot /><div><strong>Техпроцесс 4 нм:</strong> это позволило сделать чипы плотнее и энергоэффективнее.</div></li>
            <li style={{ display: 'flex', alignItems: 'flex-start' }}><GreenDot /><div><strong>Результат:</strong> прирост производительности на такт (IPC) составил около 16% по сравнению с прошлым поколением. То есть на той же частоте новый процессор выполняет больше работы.</div></li>
            <li style={{ display: 'flex', alignItems: 'flex-start' }}><GreenDot /><div><strong>Для любителей эмуляции:</strong> если вы гоняете игры с PS3 через эмулятор RPCS3, для вас есть бонус – полноценная поддержка инструкций AVX-512. Это даёт серьёзный прирост там, где другие «задыхаются».</div></li>
          </ul>
        </section>

        <section>
          <h2 style={{ fontSize: '32px', fontWeight: 700, marginBottom: '16px' }}>Модельный ряд: кого выбрать?</h2>
          <p>AMD выпустила четыре основные модели. Давайте разберёмся, кто есть кто.</p>
        </section>

        <section>
          <h2 style={{ fontSize: '32px', fontWeight: 700, marginBottom: '16px' }}>«Монстры»: процессоры серии AMD Ryzen™ 9000X3D и 9000X</h2>
          <p>Это выбор для тех, кто днём рендерит тяжёлое 4K-видео, а вечером играет на ультра-настройках.</p>
          <ul style={{ listStyle: 'none', padding: 0, margin: '16px 0', display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <li style={{ display: 'flex', alignItems: 'flex-start' }}><GreenDot /><div><strong>Процессор AMD Ryzen™ 9 9950X (16 ядер):</strong> флагман. Очень мощный, но для чисто игрового ПК он часто избыточен.</div></li>
            <li style={{ display: 'flex', alignItems: 'flex-start' }}><GreenDot /><div><strong>Процессор AMD Ryzen™ 9 9900X (12 ядер):</strong> сбалансированный вариант. Он стал заметно холоднее предшественника (120 Вт против 170 Вт ранее), что приятно, если вы не хотите превращать комнату в сауну.</div></li>
          </ul>
        </section>

        <section>
          <h2 style={{ fontSize: '32px', fontWeight: 700, marginBottom: '16px' }}>«Народные любимцы»: процессоры серии AMD Ryzen™ 7 9700X и Ryzen 5 9600X</h2>
          <p>Вот где начинается самое интересное. AMD сначала выпустила их «зажатыми» по питанию (65 Вт), чтобы показать, какие они холодные. Но геймеры сказали: «Дайте нам мощность!».</p>
          <ul style={{ listStyle: 'none', padding: 0, margin: '16px 0', display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <li style={{ display: 'flex', alignItems: 'flex-start' }}><GreenDot /><div><strong>Фишка «105W TDP»:</strong> с новым обновлением BIOS вы можете официально снять лимиты. Это даёт +10–15% в рабочих задачах и немного более стабильные частоты в играх.</div></li>
            <li style={{ display: 'flex', alignItems: 'flex-start' }}><GreenDot /><div><strong>Вердикт:</strong> 9700X – вероятно, золотая середина для современных игр, если вы не готовы платить за серию X3D.</div></li>
          </ul>
        </section>

        <section>
          <h2 style={{ fontSize: '32px', fontWeight: 700, marginBottom: '16px' }}>Революция X3D: как AMD «перевернула игру» (буквально)</h2>
          <p>В AMD Ryzen™ 7 9800X3D с AMD 3D V-Cache™ Technology инженеры совершили ход конём – они переместили кэш под ядра!</p>
          <ul style={{ listStyle: 'none', padding: 0, margin: '16px 0', display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <li style={{ display: 'flex', alignItems: 'flex-start' }}><GreenDot /><div><strong>Ядра «дышат»:</strong> теперь кристаллы вычислений имеют прямой контакт с крышкой процессора и кулером. Тепло отводится идеально.</div></li>
            <li style={{ display: 'flex', alignItems: 'flex-start' }}><GreenDot /><div><strong>Высокие частоты:</strong> 9800X3D работает в диапазоне 4.7–5.2 ГГц. Он больше не «медленный» в обычных задачах.</div></li>
            <li style={{ display: 'flex', alignItems: 'flex-start' }}><GreenDot /><div><strong>Разгон:</strong> впервые X3D-процессоры можно полноценно разгонять!</div></li>
            <li style={{ display: 'flex', alignItems: 'flex-start' }}><GreenDot /><div><strong>Факт:</strong> в симуляторах вроде Assetto Corsa Competizione новый 9800X3D просто уничтожает конкурентов, опережая Intel порой на 75%.</div></li>
          </ul>
        </section>

        <section>
          <h2 style={{ fontSize: '32px', fontWeight: 700, marginBottom: '16px' }}>Игровая реальность: тесты и ощущения</h2>
          <ul style={{ listStyle: 'none', padding: 0, margin: '16px 0', display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <li style={{ display: 'flex', alignItems: 'flex-start' }}><GreenDot /><div><strong>Counter-Strike 2 и Valorant:</strong> картинка становится «масляной». Для мониторов 360 Гц+ это must-have.</div></li>
            <li style={{ display: 'flex', alignItems: 'flex-start' }}><GreenDot /><div><strong>Cyberpunk 2077:</strong> у Ryzen благодаря монолитной структуре и кэшу игра идёт значительно плавнее (+45% производительности по сравнению с новинками конкурента).</div></li>
            <li style={{ display: 'flex', alignItems: 'flex-start' }}><GreenDot /><div><strong>4K-гейминг:</strong> здесь всё упирается в видеокарту. Разница между процессорами сводится на нет, но Ryzen потребляет в разы меньше энергии.</div></li>
          </ul>
        </section>

        <section>
          <h2 style={{ fontSize: '32px', fontWeight: 700, marginBottom: '16px' }}>Важный нюанс: обновите Windows!</h2>
          <p>Это не шутка. Тесты показали, что старая версия Windows 11 неправильно работает с прогнозированием ветвлений новых Ryzen.</p>
          <p style={{ marginTop: '16px' }}>Совет: обязательно установите обновление Windows 11 24H2. Оно даёт бесплатные 10–11% прироста производительности в играх.</p>
        </section>

        <section>
          <h2 style={{ fontSize: '32px', fontWeight: 700, marginBottom: '16px' }}>Итог: брать или нет?</h2>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <li style={{ display: 'flex', alignItems: 'flex-start' }}><GreenDot /><div>Если вы сидите на стареньком AMD Ryzen™ 1000–3000 или Intel 8–10 поколения – переход станет для вас квантовым прыжком.</div></li>
            <li style={{ display: 'flex', alignItems: 'flex-start' }}><GreenDot /><div>Если у вас AMD Ryzen™ 7000, то спешить стоит только за моделью AMD Ryzen™ 7 9800X3D.</div></li>
            <li style={{ display: 'flex', alignItems: 'flex-start' }}><GreenDot /><div><strong>Главная звезда шоу – AMD Ryzen™ 7 9800X3D. Это сейчас лучший игровой процессор на планете.</strong></div></li>
          </ul>
        </section>
      </div>
    </div>
  );

  // ARTICLE 5: RYZEN 9000 (EN)
  const getRyzenArticleContentEN = () => (
    <div style={{ color: 'var(--text-color)', lineHeight: '1.8', fontSize: '16px' }}>
      <img src="/blog/BLOG-amd-ryzen-9000.png" alt={title} style={{ width: '100%', borderRadius: '12px', marginBottom: '30px', aspectRatio: '16/9', objectFit: 'cover' }} />
      <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
        <section>
          <h2 style={{ fontSize: '32px', fontWeight: 700, marginBottom: '16px' }}>What is Zen 5 and why is it cool?</h2>
          <p>In short: it's the new "brain" of the processor. AMD engineers didn't just increase clock speeds; they seriously reworked the architecture.</p>
          <ul style={{ listStyle: 'none', padding: 0, margin: '16px 0', display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <li style={{ display: 'flex', alignItems: 'flex-start' }}><GreenDot /><div><strong>Smarter Cores:</strong> new processors are better at "predicting the future" (branch prediction). In games where the situation changes every second, this is critical for frame stability.</div></li>
            <li style={{ display: 'flex', alignItems: 'flex-start' }}><GreenDot /><div><strong>4nm Process:</strong> this allowed the chips to be denser and more energy-efficient.</div></li>
            <li style={{ display: 'flex', alignItems: 'flex-start' }}><GreenDot /><div><strong>The Result:</strong> Instructions Per Clock (IPC) increased by about 16% compared to the previous generation. This means that at the same frequency, the new processor performs more work.</div></li>
            <li style={{ display: 'flex', alignItems: 'flex-start' }}><GreenDot /><div><strong>For Emulation Fans:</strong> if you play PS3 games via the RPCS3 emulator, there's a bonus for you – full support for AVX-512 instructions. This provides a serious boost where others "choke."</div></li>
          </ul>
        </section>

        <section>
          <h2 style={{ fontSize: '32px', fontWeight: 700, marginBottom: '16px' }}>The Lineup: Which one to choose?</h2>
          <p>AMD has released four main models. Let's look at who's who.</p>
        </section>

        <section>
          <h2 style={{ fontSize: '32px', fontWeight: 700, marginBottom: '16px' }}>"The Monsters": AMD Ryzen™ 9000X3D and 9000X Series</h2>
          <p>This is the choice for those who render heavy 4K videos by day and play at ultra settings by night.</p>
          <ul style={{ listStyle: 'none', padding: 0, margin: '16px 0', display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <li style={{ display: 'flex', alignItems: 'flex-start' }}><GreenDot /><div><strong>AMD Ryzen™ 9 9950X (16 cores):</strong> the flagship. Extremely powerful, but often overkill for a pure gaming PC.</div></li>
            <li style={{ display: 'flex', alignItems: 'flex-start' }}><GreenDot /><div><strong>AMD Ryzen™ 9 9900X (12 cores):</strong> a balanced option. It's noticeably cooler than its predecessor (120W vs 170W previously), which is nice if you don't want to turn your room into a sauna.</div></li>
          </ul>
        </section>

        <section>
          <h2 style={{ fontSize: '32px', fontWeight: 700, marginBottom: '16px' }}>"The Fan Favorites": AMD Ryzen™ 7 9700X and Ryzen 5 9600X</h2>
          <p>This is where it gets interesting. AMD initially released them with "restricted" power (65W) to show how cool they are. But gamers said, "Give us the power!"</p>
          <ul style={{ listStyle: 'none', padding: 0, margin: '16px 0', display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <li style={{ display: 'flex', alignItems: 'flex-start' }}><GreenDot /><div><strong>The "105W TDP" Feature:</strong> with a new BIOS update, you can officially lift the limits. This gives +10–15% in productivity tasks and slightly more stable frequencies in games.</div></li>
            <li style={{ display: 'flex', alignItems: 'flex-start' }}><GreenDot /><div><strong>Verdict:</strong> the 9700X is likely the "sweet spot" for modern gaming if you're not ready to pay for the X3D series.</div></li>
          </ul>
        </section>

        <section>
          <h2 style={{ fontSize: '32px', fontWeight: 700, marginBottom: '16px' }}>The X3D Revolution: How AMD "Flipped the Game" (Literally)</h2>
          <p>In the AMD Ryzen™ 7 9800X3D with AMD 3D V-Cache™ Technology, engineers made a genius move – they moved the cache *under* the cores!</p>
          <ul style={{ listStyle: 'none', padding: 0, margin: '16px 0', display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <li style={{ display: 'flex', alignItems: 'flex-start' }}><GreenDot /><div><strong>The Cores "Breathe":</strong> now the computation dies have direct contact with the IHS and the cooler. Heat dissipation is near perfect.</div></li>
            <li style={{ display: 'flex', alignItems: 'flex-start' }}><GreenDot /><div><strong>High Frequencies:</strong> the 9800X3D runs in the 4.7–5.2 GHz range. It's no longer "slow" in productivity tasks.</div></li>
            <li style={{ display: 'flex', alignItems: 'flex-start' }}><GreenDot /><div><strong>Overclocking:</strong> for the first time, X3D processors can be fully overclocked!</div></li>
            <li style={{ display: 'flex', alignItems: 'flex-start' }}><GreenDot /><div><strong>Fact:</strong> in simulations like Assetto Corsa Competizione, the new 9800X3D simply annihilates the competition, sometimes outperforming Intel by 75%.</div></li>
          </ul>
        </section>

        <section>
          <h2 style={{ fontSize: '32px', fontWeight: 700, marginBottom: '16px' }}>Gaming Reality: Tests and Impressions</h2>
          <ul style={{ listStyle: 'none', padding: 0, margin: '16px 0', display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <li style={{ display: 'flex', alignItems: 'flex-start' }}><GreenDot /><div><strong>Counter-Strike 2 and Valorant:</strong> the gameplay feels "buttery smooth." A must-have for 360Hz+ monitors.</div></li>
            <li style={{ display: 'flex', alignItems: 'flex-start' }}><GreenDot /><div><strong>Cyberpunk 2077:</strong> thanks to the monolithic structure and cache, the game runs significantly smoother (+45% performance compared to competitor's latest chips).</div></li>
            <li style={{ display: 'flex', alignItems: 'flex-start' }}><GreenDot /><div><strong>4K Gaming:</strong> here everything is GPU-bound. The difference between processors is negligible, but Ryzen consumes far less power.</div></li>
          </ul>
        </section>

        <section>
          <h2 style={{ fontSize: '32px', fontWeight: 700, marginBottom: '16px' }}>Important Note: Update Windows!</h2>
          <p>This is no joke. Tests have shown that older versions of Windows 11 do not work correctly with the branch prediction of the new Ryzens.</p>
          <p style={{ marginTop: '16px' }}>Tip: be sure to install the Windows 11 24H2 update. It gives a "free" 10–11% performance boost in games.</p>
        </section>

        <section>
          <h2 style={{ fontSize: '32px', fontWeight: 700, marginBottom: '16px' }}>Summary: To buy or not to buy?</h2>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <li style={{ display: 'flex', alignItems: 'flex-start' }}><GreenDot /><div>If you're on an old AMD Ryzen™ 1000–3000 or Intel 8th–10th generation – the transition will be a quantum leap for you.</div></li>
            <li style={{ display: 'flex', alignItems: 'flex-start' }}><GreenDot /><div>If you have an AMD Ryzen™ 7000, it's only worth upgrading for the AMD Ryzen™ 7 9800X3D model.</div></li>
            <li style={{ display: 'flex', alignItems: 'flex-start' }}><GreenDot /><div><strong>The main star of the show is the AMD Ryzen™ 7 9800X3D. It is currently the best gaming processor on the planet.</strong></div></li>
          </ul>
        </section>
      </div>
    </div>
  );

  // ARTICLE 6: GAMING CONSOLES (RU)
  const getConsoleArticleContentRU = () => (
    <div style={{ color: 'var(--text-color)', lineHeight: '1.8', fontSize: '16px' }}>
      <img src="/blog/BLOG-how-to-choose-gaming-console.png" alt={title} style={{ width: '100%', borderRadius: '12px', marginBottom: '30px', aspectRatio: '16/9', objectFit: 'cover' }} />
      <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
        <section>
          <p style={{ fontSize: '18px', color: 'var(--text-secondary)' }}>Игровая индустрия создает иллюзию, что выбор устройства зависит только от терафлопсов и количества ядер процессора, но реальность бьет по кошельку иначе. Однако покупка игровой консоли в 2026 году — это не столько выбор образа жизни и способа потребления контента, где ошибка стоит не только денег, но и сотен часов испорченного досуга. Производительность отходит на второй план, уступая место экосистемам, сервисам и уникальным фишкам, о которых редко пишут в сухих технических характеристиках.</p>
          <p style={{ marginTop: '16px' }}>Чтобы не переплачивать за ненужные функции и получить именно те эмоции, на которые вы рассчитываете, нужно разобрать неочевидные нюансы каждой платформы. Рассказываем, как выбрать игровую консоль.</p>
        </section>

        <section>
          <h2 style={{ fontSize: '32px', fontWeight: 700, marginBottom: '16px' }}>1. Зачем нужна консоль и какая она бывает</h2>
          <p>Главный аргумент в пользу приставки — глубокая оптимизация: разработчики создают игры под конкретное железо, выжимая из него максимум производительности. Вам не нужно обновлять драйверы или подбирать настройки графики ради стабильного FPS. Концепция Plug and Play превращает гейминг в отдых без лишних хлопот: достаточно включить устройство и запустить проект. Кроме того, современные консоли стали центрами домашних развлечений, объединяя в себе игры, стриминг и социальные функции в удобном ТВ-интерфейсе.</p>
        </section>

        <section>
          <h2 style={{ fontSize: '32px', fontWeight: 700, marginBottom: '16px' }}>2. Виды консолей: стационарные, портативные и гибриды</h2>
          <p>Типы консолей четко сегментированы:</p>
          <ul style={{ listStyle: 'none', padding: 0, margin: '16px 0', display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <li style={{ display: 'flex', alignItems: 'flex-start' }}><GreenDot /><div><strong>Стационарные модели</strong> — это короли гостиной, предлагающие 4K-разрешение, трассировку лучей и максимальную детализацию на больших экранах.</div></li>
            <li style={{ display: 'flex', alignItems: 'flex-start' }}><GreenDot /><div><strong>Гибридные решения</strong>, напротив, делают ставку на универсальность: вы можете начать сессию дома в док-станции, а затем просто вытащить планшет и продолжить игру в поезде.</div></li>
            <li style={{ display: 'flex', alignItems: 'flex-start' }}><GreenDot /><div><strong>Портативные системы</strong>, такие как Anbernic, занимают отдельный сегмент и возвращают нас в эпоху классического ретро-гейминга.</div></li>
          </ul>
          <p>Именно виды игровых консолей определяют ваш стиль игры: от вдумчивых часов перед ТВ до коротких партий в перерывах в течение дня.</p>
        </section>

        <section>
          <h2 style={{ fontSize: '32px', fontWeight: 700, marginBottom: '16px' }}>3. На что обратить внимание при выборе</h2>
          <p>Технические характеристики определяют комфорт использования. Решающую роль играет тип накопителя: современный быстрый SSD кардинально меняет восприятие, сокращая загрузки до нескольких секунд и делая переходы между локациями бесшовными. Также обратите внимание на уровень шума системы охлаждения под нагрузкой и поддержку 4K/120 FPS. Отдельным пунктом стоит объем памяти: современные проекты часто весят более 100 ГБ, поэтому наличие слота для расширения хранилища становится критически важным фактором при выборе. Аппаратная начинка должна работать на ваше удовольствие, а не создавать лишние проблемы с местом на диске.</p>
        </section>

        <section>
          <h2 style={{ fontSize: '32px', fontWeight: 700, marginBottom: '16px' }}>4. Игры, подписки и сервисы</h2>
          <p>Консоль мертва без контента, поэтому выбор экосистемы — это самый важный этап. Sony делает ставку на масштабные кинематографичные эксклюзивы, которые продают систему. Nintendo берет магией собственных франшиз (Mario, Zelda), идеально подходящих для семейного досуга. Microsoft же предлагает сервис Game Pass — своего рода «Netflix для игр», открывающий доступ к огромной библиотеке за фиксированную абонентскую плату. Важным плюсом станет обратная совместимость, позволяющая запускать игры прошлых поколений. Также решите, нужен ли вам физический дисковод: он позволяет покупать диски на вторичном рынке и обмениваться ими с друзьями, экономя бюджет.</p>
        </section>

        <section>
          <h2 style={{ fontSize: '32px', fontWeight: 700, marginBottom: '16px' }}>5. Контроллеры и аксессуары: что важно</h2>
          <p>Эргономика контроллеров критична для комфорта. Современные модели с тактильной отдачей усиливают эффект присутствия. Из периферии полезны зарядные станции и гарнитуры, а второй геймпад необходим для игры с друзьями на одном диване. Для портативных систем обязателен защитный чехол.</p>
        </section>

        <section>
          <h2 style={{ fontSize: '32px', fontWeight: 700, marginBottom: '16px' }}>6. Как выбрать консоль под себя</h2>
          <p>Сценарий использования — лучший критерий, как выбрать игровую приставку под себя. Например, хардкор-геймерам важны 4K и мощность стационарных башен. Семьям и компаниям подходят гибриды с яркими аркадами и локальным мультиплеером. Путешественникам же критичны автономность и габариты. Определите правильное устройство: оно должно вписываться в ваш ритм жизни, не заставляя менять привычки ради игры.</p>
        </section>

        <section>
          <h2 style={{ fontSize: '32px', fontWeight: 700, marginBottom: '16px' }}>7. Сравнение популярных моделей</h2>
          <p>На полках магазинов можно найти устройства под любые задачи:</p>
          <ul style={{ listStyle: 'none', padding: 0, margin: '16px 0', display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <li style={{ display: 'flex', alignItems: 'flex-start' }}><GreenDot /><div><strong>Nintendo Switch 2:</strong> новое поколение легендарного гибрида. Она получила возросшую производительность для запуска современных игр и остается лучшим выбором для мобильного гейминга и семейных компаний.</div></li>
            <li style={{ display: 'flex', alignItems: 'flex-start' }}><GreenDot /><div><strong>Sony PS5 Digital Edition:</strong> ультимативная система для любителей блокбастеров. Тонкий корпус без дисковода и инновационный геймпад DualSense обеспечивают полное погружение в сюжетные приключения.</div></li>
            <li style={{ display: 'flex', alignItems: 'flex-start' }}><GreenDot /><div><strong>Xbox Series X:</strong> самая мощная стационарная консоль с тихим охлаждением. В связке с подпиской это самое выгодное решение для тех, кто хочет играть в сотни тайтлов без больших затрат.</div></li>
          </ul>
        </section>
      </div>
    </div>
  );

  // ARTICLE 6: GAMING CONSOLES (EN)
  const getConsoleArticleContentEN = () => (
    <div style={{ color: 'var(--text-color)', lineHeight: '1.8', fontSize: '16px' }}>
      <img src="/blog/BLOG-how-to-choose-gaming-console.png" alt={title} style={{ width: '100%', borderRadius: '12px', marginBottom: '30px', aspectRatio: '16/9', objectFit: 'cover' }} />
      <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
        <section>
          <p style={{ fontSize: '18px', color: 'var(--text-secondary)' }}>The gaming industry creates the illusion that choosing a device depends only on teraflops and the number of processor cores, but reality hits the wallet differently. However, buying a gaming console in 2026 is not so much a choice of hardware as a choice of lifestyle and way of consuming content, where a mistake costs not only money but also hundreds of hours of ruined leisure time. Performance takes a back seat, giving way to ecosystems, services, and unique features that are rarely mentioned in dry technical specifications.</p>
          <p style={{ marginTop: '16px' }}>To avoid overpaying for unnecessary functions and to get exactly the emotions you are counting on, you need to analyze the non-obvious nuances of each platform. Here's how to choose a gaming console.</p>
        </section>

        <section>
          <h2 style={{ fontSize: '32px', fontWeight: 700, marginBottom: '16px' }}>1. Why you need a console and what types exist</h2>
          <p>The main argument in favor of a console is deep optimization: developers create games for specific hardware, squeezing maximum performance out of it. You don't need to update drivers or adjust graphics settings for a stable FPS. The Plug and Play concept turns gaming into relaxation without extra hassle: just turn on the device and launch the project. In addition, modern consoles have become home entertainment centers, combining games, streaming, and social functions in a convenient TV interface.</p>
        </section>

        <section>
          <h2 style={{ fontSize: '32px', fontWeight: 700, marginBottom: '16px' }}>2. Types of consoles: stationary, handheld, and hybrids</h2>
          <p>Console types are clearly segmented:</p>
          <ul style={{ listStyle: 'none', padding: 0, margin: '16px 0', display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <li style={{ display: 'flex', alignItems: 'flex-start' }}><GreenDot /><div><strong>Stationary models</strong> — these are the kings of the living room, offering 4K resolution, ray tracing, and maximum detail on large screens.</div></li>
            <li style={{ display: 'flex', alignItems: 'flex-start' }}><GreenDot /><div><strong>Hybrid solutions</strong>, in contrast, focus on versatility: you can start a session at home in a docking station and then simply take the tablet out and continue the game on a train.</div></li>
            <li style={{ display: 'flex', alignItems: 'flex-start' }}><GreenDot /><div><strong>Handheld systems</strong>, such as Anbernic, occupy a separate segment and return us to the era of classic retro gaming.</div></li>
          </ul>
          <p>It is the types of gaming consoles that determine your play style: from thoughtful hours in front of the TV to short sessions during breaks throughout the day.</p>
        </section>

        <section>
          <h2 style={{ fontSize: '32px', fontWeight: 700, marginBottom: '16px' }}>3. What to look for when choosing</h2>
          <p>Technical specifications determine the comfort of use. A decisive role is played by the type of storage: a modern fast SSD fundamentally changes perception, reducing loads to a few seconds and making transitions between locations seamless. Also pay attention to the noise level of the cooling system under load and support for 4K/120 FPS. A separate point is memory capacity: modern projects often weigh more than 100 GB, so the presence of a slot for expanding storage becomes a critically important factor when choosing. The hardware should work for your pleasure, not create extra problems with disk space.</p>
        </section>

        <section>
          <h2 style={{ fontSize: '32px', fontWeight: 700, marginBottom: '16px' }}>4. Games, subscriptions, and services</h2>
          <p>A console is dead without content, so choosing an ecosystem is the most important step. Sony focuses on large-scale cinematic exclusives that sell the system. Nintendo takes the magic of its own franchises (Mario, Zelda), which are perfect for family leisure. Microsoft offers the Game Pass service — a kind of "Netflix for games," giving access to a huge library for a fixed subscription fee. A major plus is backward compatibility, allowing you to run games from previous generations. Also decide if you need a physical disc drive: it allows you to buy discs on the secondary market and exchange them with friends, saving your budget.</p>
        </section>

        <section>
          <h2 style={{ fontSize: '32px', fontWeight: 700, marginBottom: '16px' }}>5. Controllers and accessories: what is important</h2>
          <p>Controller ergonomics are critical for comfort. Modern models with haptic feedback enhance the effect of presence. From peripherals, charging stations and headsets are useful, and a second gamepad is necessary for playing with friends on the same sofa. For handheld systems, a protective case is a must.</p>
        </section>

        <section>
          <h2 style={{ fontSize: '32px', fontWeight: 700, marginBottom: '16px' }}>6. How to choose a console for yourself</h2>
          <p>The use scenario is the best criterion for how to choose a game console for yourself. For example, for hardcore gamers, 4K and the power of stationary towers are important. For families and groups, hybrids with bright arcades and local multiplayer are suitable. For travelers, autonomy and dimensions are critical. Define the right device: it should fit into your rhythm of life, not forcing you to change habits for the sake of the game.</p>
        </section>

        <section>
          <h2 style={{ fontSize: '32px', fontWeight: 700, marginBottom: '16px' }}>7. Comparison of popular models</h2>
          <p>On store shelves, you can find devices for any task:</p>
          <ul style={{ listStyle: 'none', padding: 0, margin: '16px 0', display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <li style={{ display: 'flex', alignItems: 'flex-start' }}><GreenDot /><div><strong>Nintendo Switch 2:</strong> the new generation of the legendary hybrid. It received increased performance for running modern games and remains the best choice for mobile gaming and family groups.</div></li>
            <li style={{ display: 'flex', alignItems: 'flex-start' }}><GreenDot /><div><strong>Sony PS5 Digital Edition:</strong> the ultimate system for blockbuster fans. The slim body without a disc drive and the innovative DualSense gamepad provide full immersion in story adventures.</div></li>
            <li style={{ display: 'flex', alignItems: 'flex-start' }}><GreenDot /><div><strong>Xbox Series X:</strong> the most powerful stationary console with quiet cooling. In combination with a subscription, it is the most advantageous solution for those who want to play hundreds of titles without large expenditures.</div></li>
          </ul>
        </section>
      </div>
    </div>
  );

  return (
    <div style={{ backgroundColor: 'var(--bg-color)', minHeight: '100vh', paddingBottom: '80px' }}>
      <div className="container" style={{ padding: '5px 20px 0' }}>
        <Breadcrumbs items={[
          { label: t('home.blog.title'), path: '/blog' },
          { label: title, active: true }
        ]} />

        <div style={{ marginBottom: '40px' }}>
          <div style={{ color: 'var(--text-secondary)', fontSize: '14px', marginBottom: '12px' }}>{date}</div>
          <h1 className="title" style={{ fontSize: '42px', lineHeight: '1.2', marginBottom: '0' }}>{title}</h1>
        </div>

        {/* Content switch */}
        {slug === 'how-to-choose-gpu' && (i18n.language === 'ru' ? getGpuArticleContentRU() : getGpuArticleContentEN())}
        {slug === 'cross-play-multiplatform' && (i18n.language === 'ru' ? getCrossplayArticleContentRU() : getCrossplayArticleContentEN())}
        {slug === 'gta-6-price' && (i18n.language === 'ru' ? getGtaArticleContentRU() : getGtaArticleContentEN())}
        {slug === 'ryzen-9000-review' && (i18n.language === 'ru' ? getRyzenArticleContentRU() : getRyzenArticleContentEN())}
        
        {slug === 'how-to-choose-console' && (i18n.language === 'ru' ? getConsoleArticleContentRU() : getConsoleArticleContentEN())}
        
        {slug !== 'how-to-choose-gpu' && slug !== 'cross-play-multiplatform' && slug !== 'gta-6-price' && slug !== 'how-to-choose-console' && slug !== 'ryzen-9000-review' && (
          <div style={{ color: 'var(--text-secondary)', textAlign: 'center', padding: '100px 0' }}>
            <h2 style={{ color: 'var(--text-color)' }}>{i18n.language === 'ru' ? 'Контент в разработке' : 'Content under development'}</h2>
            <Link to="/blog" style={{ color: 'var(--primary-color)', textDecoration: 'none', fontWeight: 600 }}>
              {i18n.language === 'ru' ? 'Вернуться в блог' : 'Back to blog'}
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
