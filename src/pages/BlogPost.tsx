import { useParams, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ChevronRight } from 'lucide-react';

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

  // СТАТЬЯ 1: ВИДЕОКАРТЫ (EN)
  const getGpuArticleContentEN = () => (
    <div style={{ color: 'var(--text-color)', lineHeight: '1.8', fontSize: '16px' }}>
      <img src="/blog/BLOG-how-to-choose-gpu.png" alt={title} style={{ width: '100%', borderRadius: '12px', marginBottom: '30px', aspectRatio: '16/9', objectFit: 'cover' }} />
      <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
        <section>
          <h2 style={{ fontSize: '32px', fontWeight: 700, marginBottom: '16px' }}>GPU Manufacturer</h2>
          <p>The name of all graphics cards begins with the manufacturer. The main component is the GPU, developed by NVIDIA and AMD. Intel also makes desktop GPUs under the "ARC" brand, though they currently remain less competitive than NVIDIA and AMD solutions.</p>
        </section>
        <section>
          <h2 style={{ fontSize: '32px', fontWeight: 700, marginBottom: '16px' }}>Family</h2>
          <p>NVIDIA "TITAN" series is for neural networks, while AMD "Radeon PRO" is for professional animation and 8K editing. For gamers and standard PC users, "GeForce" from NVIDIA and "Radeon" from AMD are the primary choices.</p>
        </section>
        <section>
          <h2 style={{ fontSize: '32px', fontWeight: 700, marginBottom: '16px' }}>Letter Index</h2>
          <p>NVIDIA uses GT (basic display), GTX (standard gaming), and RTX (modern gaming with ray tracing and DLSS). AMD uses R (basic) and RX (gaming).</p>
        </section>
        <section>
          <h2 style={{ fontSize: '32px', fontWeight: 700, marginBottom: '16px' }}>Generation Number</h2>
          <p>New generations arrive every 2 years. NVIDIA's RTX 50 series (2025) succeeded the RTX 40 series. AMD's RX 9000 series (2025) uses the first digit to denote the generation.</p>
        </section>
        <section>
          <h2 style={{ fontSize: '32px', fontWeight: 700, marginBottom: '16px' }}>What to choose – NVIDIA or AMD</h2>
          <p>NVIDIA is the standard for professional graphics work due to stable drivers and CUDA. For pure gaming without ray tracing, AMD's RX 9000 series offers excellent value and raw performance. However, NVIDIA remains the leader in ray tracing and AI tasks.</p>
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

  // СТАТЬЯ 2: КРОССПЛАТФОРМЕННОСТЬ (EN)
  const getCrossplayArticleContentEN = () => (
    <div style={{ color: 'var(--text-color)', lineHeight: '1.8', fontSize: '16px' }}>
      <img src="/blog/BLOG-crossplay-multiplatform.png" alt={title} style={{ width: '100%', borderRadius: '12px', marginBottom: '30px', aspectRatio: '16/9', objectFit: 'cover' }} />
      <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
        <section>
          <p style={{ fontSize: '18px', color: 'var(--text-secondary)' }}>Cross-platform play allows gamers on different devices to play together. For PC users, it means a massive increase in player count and social flexibility.</p>
        </section>
        <section>
          <h2 style={{ fontSize: '32px', fontWeight: 700, marginBottom: '16px' }}>Core Concepts</h2>
          <p>From True Cross-Platform (unified progress) to Cross-Save (shared inventory). Major hits like Fortnite and Minecraft paved the way for industry-wide adoption.</p>
        </section>
        <section>
          <h2 style={{ fontSize: '32px', fontWeight: 700, marginBottom: '16px' }}>Future</h2>
          <p>Crossplay is no longer optional; it's a standard requirement for modern multiplayer titles, driven by business efficiency and community demands.</p>
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

  // СТАТЬЯ 3: GTA 6 (EN)
  const getGtaArticleContentEN = () => (
    <div style={{ color: 'var(--text-color)', lineHeight: '1.8', fontSize: '16px' }}>
      <img src="/blog/BLOG-gta-price.png" alt={title} style={{ width: '100%', borderRadius: '12px', marginBottom: '30px', aspectRatio: '16/9', objectFit: 'cover' }} />
      <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
        <section>
          <h2 style={{ fontSize: '32px', fontWeight: 700, marginBottom: '16px' }}>GTA 6: Pricing Details</h2>
          <p>Console launch: Nov 19, 2026. Estimated price: $69.99–$79.99. With a $1B+ budget, it's the most ambitious project yet.</p>
        </section>
        <section>
          <h2 style={{ fontSize: '32px', fontWeight: 700, marginBottom: '16px' }}>Editions & Monetization</h2>
          <p>Standard, Deluxe, and Collector's editions are expected. Rockstar will continue its successful live-service model with microtransactions and GTA+.</p>
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

  // СТАТЬЯ 5: RYZEN 9000 (EN)
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

  return (
    <div style={{ backgroundColor: 'var(--bg-color)', minHeight: '100vh', padding: '20px 0 80px' }}>
      <div className="container" style={{ padding: '0 20px' }}>
        <div style={{ display: 'flex', gap: '8px', fontSize: '14px', color: 'var(--text-secondary)', marginBottom: '30px' }}>
          <Link to="/" style={{ color: 'inherit', textDecoration: 'none' }}>{t('header.home')}</Link>
          <ChevronRight size={14} />
          <Link to="/blog" style={{ color: 'inherit', textDecoration: 'none' }}>{t('home.blog.title')}</Link>
          <ChevronRight size={14} />
          <span style={{ color: 'var(--text-color)' }}>{title}</span>
        </div>

        <div style={{ marginBottom: '40px' }}>
          <div style={{ color: 'var(--text-secondary)', fontSize: '14px', marginBottom: '12px' }}>{date}</div>
          <h1 className="title" style={{ fontSize: '42px', lineHeight: '1.2', marginBottom: '0' }}>{title}</h1>
        </div>

        {/* Content switch */}
        {slug === 'how-to-choose-gpu' && (i18n.language === 'ru' ? getGpuArticleContentRU() : getGpuArticleContentEN())}
        {slug === 'cross-play-multiplatform' && (i18n.language === 'ru' ? getCrossplayArticleContentRU() : getCrossplayArticleContentEN())}
        {slug === 'gta-6-price' && (i18n.language === 'ru' ? getGtaArticleContentRU() : getGtaArticleContentEN())}
        {slug === 'ryzen-9000-review' && (i18n.language === 'ru' ? getRyzenArticleContentRU() : getRyzenArticleContentEN())}
        
        {slug === 'how-to-choose-console' && (
          <div style={{ color: 'var(--text-secondary)', textAlign: 'center', padding: '40px 0 100px' }}>
            <img src="/blog/BLOG-how-to-choose-gaming-console.png" alt={title} style={{ width: '100%', borderRadius: '12px', marginBottom: '30px', aspectRatio: '16/9', objectFit: 'cover' }} />
            <h2 style={{ color: 'var(--text-color)' }}>{i18n.language === 'ru' ? 'Контент в разработке' : 'Content under development'}</h2>
            <p style={{ marginBottom: '20px' }}>{i18n.language === 'ru' ? 'Мы работаем над заполнением этой статьи.' : 'We are working on this article.'}</p>
            <Link to="/blog" style={{ color: 'var(--primary-color)', textDecoration: 'none', fontWeight: 600 }}>
              {i18n.language === 'ru' ? 'Вернуться в блог' : 'Back to blog'}
            </Link>
          </div>
        )}
        
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
