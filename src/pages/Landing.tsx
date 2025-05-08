

const Landing = () => (
  <>
    <div className="bg-white text-gray-900">
      {/* Navbar */}
      <nav className="flex items-center justify-between p-6 shadow-md bg-white sticky top-0 z-50">
        <div className="text-2xl font-bold text-blue-600">AutoQuill</div>
        <div className="space-x-4">
          <a href="#how-it-works" className="text-gray-700 hover:text-blue-600">Як це працює</a>
          <a href="#integrations" className="text-gray-700 hover:text-blue-600">Інтеграції</a>
          <a href="#use-cases" className="text-gray-700 hover:text-blue-600">Використання</a>
          <a href="#pricing" className="text-gray-700 hover:text-blue-600">Тарифи</a>
          <a href="#faq" className="text-gray-700 hover:text-blue-600">FAQ</a>
          <button className="bg-blue-600 text-white hover:bg-blue-700">Увійти</button>
        </div>
      </nav>

      {/* Hero */}
      <section className="min-h-screen flex flex-col items-center justify-center text-center p-6 bg-gradient-to-br from-blue-500 to-purple-600 text-white">
        <h1 className="text-4xl md:text-6xl font-bold mb-4">Перетвори документи на контент за секунди</h1>
        <p className="text-xl md:text-2xl mb-6 max-w-2xl">AI-сервіс для створення унікальних статей, постів і звітів з PDF, DOCX та інших файлів</p>
        <div className="flex gap-4">
          <button className="bg-white text-blue-600 hover:bg-gray-100">Спробувати безкоштовно</button>
          <button className="border-white text-white">Дивитись демо</button>
        </div>
      </section>

      {/* How it works */}
      <section id="how-it-works" className="py-20 px-6 bg-gray-50 text-center">
        <h2 className="text-3xl font-bold mb-10">Як це працює?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-5xl mx-auto">
          {[
            { step: "1", text: "Завантаж файл (PDF, DOCX, TXT)" },
            { step: "2", text: "Вкажи тему/стиль контенту" },
            { step: "3", text: "Отримай унікальний текст і публікуй" },
          ].map((item) => (
            <div key={item.step} className="bg-white p-6 rounded-2xl shadow">
              <div className="text-4xl font-bold text-blue-600 mb-4">{item.step}</div>
              <p className="text-lg font-medium">{item.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Integrations */}
      <section id="integrations" className="py-20 px-6 text-center bg-white">
        <h2 className="text-3xl font-bold mb-10">Інтеграції</h2>
        <p className="mb-6 text-lg max-w-3xl mx-auto">Публікуй контент одразу в Telegram, Discord, Notion, Medium, WordPress, Google Docs, Slack, Email або використай власне API</p>
        <div className="flex flex-wrap justify-center gap-4 mt-4">
          {[
            "Telegram", "Discord", "Notion", "WordPress",
            "Medium", "Google Docs", "Slack", "Email API"
          ].map(name => (
            <div key={name} className="border rounded-xl px-4 py-2 bg-gray-100 text-gray-800">{name}</div>
          ))}
        </div>
      </section>

      {/* Use Cases */}
      <section id="use-cases" className="py-20 px-6 bg-gray-50 text-center">
        <h2 className="text-3xl font-bold mb-10">Хто і як використовує AutoQuill</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {[
            "Автори книг → конспекти, пости",
            "Бізнес → огляди документів, policy summary",
            "Студенти → реферати, есе",
            "Блогери → перетворення книг у серії постів",
            "SEO-спеціалісти → контент з ключовими словами",
            "Агенції → автоматизація контенту для клієнтів"
          ].map((text, i) => (
            <div key={i} className="bg-white p-6 rounded-2xl shadow text-left">
              <p className="text-lg">{text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="py-20 px-6 text-center">
        <h2 className="text-3xl font-bold mb-10">Що генерує AutoQuill?</h2>
        <div className="flex flex-wrap justify-center gap-6">
          {["Статті", "Пости в соцмережі", "Email-листи", "Огляди книг", "Конспекти", "Резюме/звіти"].map((item, i) => (
            <div key={i} className="px-6 py-3 bg-blue-100 text-blue-800 rounded-xl text-lg font-medium">
              {item}
            </div>
          ))}
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-20 px-6 text-center bg-gray-50">
        <h2 className="text-3xl font-bold mb-10">Тарифи</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-6xl mx-auto">
          {[{
            title: "Безкоштовно",
            price: "0₴",
            features: ["3 генерації", "1 інтеграція", "Обмежений функціонал"]
          }, {
            title: "Pro",
            price: "249₴ / міс",
            features: ["500 генерацій/міс", "Усі інтеграції", "Підтримка"]
          }, {
            title: "Команда",
            price: "Індивідуально",
            features: ["Без обмежень", "Командний доступ", "Розширене API"]
          }].map((plan, i) => (
            <div key={i} className="bg-white p-6 rounded-2xl shadow text-left">
              <h3 className="text-xl font-bold mb-2">{plan.title}</h3>
              <p className="text-2xl font-semibold text-blue-600 mb-4">{plan.price}</p>
              <ul className="space-y-2 mb-4">
                {plan.features.map((f, idx) => <li key={idx}>• {f}</li>)}
              </ul>
              <button className="bg-blue-600 text-white w-full">Обрати</button>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 px-6 text-center">
        <h2 className="text-3xl font-bold mb-10">Що кажуть наші користувачі</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {["Я зекономив 8 годин на тиждень, створюючи пости з книг", "Нарешті є інструмент, який автоматизує мій блог", "Супер для SEO-агенцій, генеруємо звіти клієнтам автоматично"].map((quote, i) => (
            <div key={i} className="bg-white p-6 rounded-2xl shadow">
              <p className="text-lg italic">“{quote}”</p>
              <p className="mt-4 font-medium text-blue-600">Користувач #{i + 1}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 px-6 bg-blue-600 text-white text-center">
        <h2 className="text-3xl font-bold mb-6">Готовий спробувати?</h2>
        <p className="text-lg mb-6">Завантаж свій файл і створи унікальний AI-контент вже зараз</p>
        <button className="bg-white text-blue-600 hover:bg-gray-100">Почати безкоштовно</button>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-20 px-6 text-center bg-gray-50">
        <h2 className="text-3xl font-bold mb-10">Часті питання</h2>
        <div className="max-w-4xl mx-auto space-y-6 text-left">
          {[{
            q: "Які файли підтримуються?",
            a: "PDF, DOCX, TXT та інші популярні формати."
          }, {
            q: "Чи мій текст буде унікальним?",
            a: "Так, ми генеруємо унікальний контент за допомогою ШІ."
          }, {
            q: "Чи зберігаєте ви мій контент?",
            a: "Ні, ми не зберігаємо файли або тексти без вашої згоди."
          }, {
            q: "Чи можна використовувати API?",
            a: "Так, доступне кастомне API у платних тарифах."
          }].map((faq, i) => (
            <div key={i}>
              <h3 className="font-semibold text-lg">{faq.q}</h3>
              <p className="text-gray-700">{faq.a}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  </>
);
export default Landing;