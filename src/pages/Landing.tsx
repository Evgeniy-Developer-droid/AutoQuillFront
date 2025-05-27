import i18n from "i18next";
import { useTranslation } from "react-i18next";

const Landing = () => {
  const {t} = useTranslation();

  const helpCenterLinks = {
    en: "https://nutritious-germanium-dd8.notion.site/AutoQuill-Help-Center-1fef064a60af80ee96bcf5b4bee6b569",
    ru: "https://nutritious-germanium-dd8.notion.site/AutoQuill-Help-Center-RU-1fef064a60af8082b377df42226a9c09",
    ua: "https://nutritious-germanium-dd8.notion.site/AutoQuill-Help-Center-UA-1fef064a60af80f29393d50df4de92cd"
  }

  return <>
    <div className="bg-white text-gray-900">
      {/* Navbar */}
      <nav className="flex items-center justify-between p-6 shadow-md bg-white sticky top-0 z-50">
        <div className="text-2xl font-bold text-gray-700">AutoQuill</div>
        <div className="space-x-4">
          <a href="#how-it-works" className="text-gray-700 hover:text-blue-600">{t("How it works")}</a>
          <a href="#integrations" className="text-gray-700 hover:text-blue-600">{t("Integrations")}</a>
          <a href="#use-cases" className="text-gray-700 hover:text-blue-600">{t("Using")}</a>
          <a href="#pricing" className="text-gray-700 hover:text-blue-600">{t("Tariffs")}</a>
          <a href="#faq" className="text-gray-700 hover:text-blue-600">{t("FAQ")}</a>
          <a href={helpCenterLinks[i18n.language]} className="text-gray-700 hover:text-blue-600">{t("Help Center")}</a>
          <a href={"/login"} className="btn bg-blue-400 text-white hover:bg-blue-700">{t("Log in")}</a>
          <select className={"border rounded-md p-2 bg-white text-gray-700"}
                  defaultValue={i18n.language}
                  onChange={(e) => i18n.changeLanguage(e.target.value)}>
            <option value="en">EN</option>
            <option value="ru">RU</option>
            <option value="ua">UA</option>
          </select>
        </div>
      </nav>

      {/* Hero */}
      <section
          className="min-h-screen flex flex-col items-center justify-center text-center p-6 bg-gradient-to-br from-blue-100 to-purple-300 text-black">
        <h1 className="text-4xl md:text-6xl font-bold mb-4">{t("Turn documents into content in seconds")}</h1>
        <p className="text-xl md:text-2xl mb-6 max-w-2xl">{t("AI service for creating unique articles, posts and reports from PDF, DOCX and other files")}</p>
        <div className="flex gap-4">
          <a href={"/register"} className="btn bg-white text-black hover:bg-gray-100">{t("Try for free")}</a>
        </div>
      </section>

      {/* How it works */}
      <section id="how-it-works" className="py-20 px-6 bg-gray-50 text-center">
        <h2 className="text-3xl font-bold mb-10">{t("How does it work?")}</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-5xl mx-auto">
          {[
            {step: "1", text: t("Upload file (PDF, DOCX, TXT)")},
            {step: "2", text: t("Specify the topic/style of content")},
            {step: "3", text: t("Get a unique text and publish it")},
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
        <h2 className="text-3xl font-bold mb-10">{t("Integrations")}</h2>
        <p className="mb-6 text-lg max-w-3xl mx-auto">{t("Publish content immediately to Telegram, Discord, Notion, Medium WordPress, Google Docs, Slack, Email or use your own API")}</p>
        <div className="flex flex-wrap justify-center gap-4 mt-4">
          {[
            "Telegram", "Discord", "Notion", "WordPress",
            "Medium", "Google Docs", "Slack", "Email API"
          ].map(name => (
              <div key={name} className="border rounded-xl px-4 py-2 bg-gray-100 text-gray-800">{name}</div>
          ))}
        </div>
      </section>

      {/* Demo links as buttons with links to telegram channel, discord server, and notion page */}
      <section className="py-10 px-6 text-center bg-gray-50">
          <h2 className="text-3xl font-bold mb-6">{t("Demo")}</h2>
          <div className="flex justify-center gap-4">
          <a href="https://t.me/autoquill_demo" target="_blank" rel="noopener noreferrer" className="btn bg-blue-600 text-white hover:bg-blue-700">{t("Telegram Channel")}</a>
          <a href="#" target="_blank" rel="noopener noreferrer" className="btn bg-indigo-600 text-white hover:bg-indigo-700">{t("Discord Server")}</a>
          <a href={helpCenterLinks[i18n.language]} target="_blank" rel="noopener noreferrer" className="btn bg-green-600 text-white hover:bg-green-700">{t("Notion Help Center")}</a>
          </div>
      </section>


      {/* Use Cases */}
      <section id="use-cases" className="py-20 px-6 bg-gray-50 text-center">
        <h2 className="text-3xl font-bold mb-10">{t("Who uses AutoQuill and how?")}</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {[
            t("Book authors → summaries, posts"),
            t("Business → document reviews, policy summary"),
            t("Students → abstracts, essays"),
            t("Bloggers → turning books into post series"),
            t("SEO specialists → content with keywords"),
            t("Agencies → content automation for clients")
          ].map((text, i) => (
              <div key={i} className="bg-white p-6 rounded-2xl shadow text-left">
                <p className="text-lg">{text}</p>
              </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="py-20 px-6 text-center">
        <h2 className="text-3xl font-bold mb-10">{t("What does AutoQuill generate?")}</h2>
        <div className="flex flex-wrap justify-center gap-6">
          {[t("Articles"), t("Social media posts"), t("Email lists"), t("Book reviews"), t("Abstracts"), t("Summary/reports")].map((item, i) => (
              <div key={i} className="px-6 py-3 bg-blue-100 text-blue-800 rounded-xl text-lg font-medium">
                {item}
              </div>
          ))}
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-20 px-6 text-center bg-gray-50">
        <h2 className="text-3xl font-bold mb-10">{t("Tariffs")}</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 max-w-6xl mx-auto">
          {[{
            title: "Free",
            code: "FREE",
            price: "0$",
            features: ["30 " + t("generations/month"), "30 "+t("publications/month"),
              t("Available integrations"), t("Knowledge base"), t("Scheduled publications (limited)")]
          }, {
            title: "Start",
            code: "START",
            price: "9$ / " + t("month"),
            features: ["100 " + t("generations/month"), "100 " + t("publications/month"),
              t("Available integrations"), t("Knowledge base"), t("Planned publications")]
          }, {
            title: "Pro",
            code: "PRO",
            price: "29$ / " + t("month"),
            features: ["500 " + t("generations/month"), "500 " + t("publications/month"),
              t("Available integrations"), t("Knowledge base"), t("Planned publications")]
          }, {
            title: "Business",
            code: "BUSINESS",
            price: "79$ / " + t("month"),
            features: ["2000 " + t("generations/month"), "2000 " + t("publications/month"),
              t("Available integrations"), t("Knowledge base"), t("Planned publications")]
          }].map((plan, i) => (
              <div key={i} className="bg-white p-6 rounded-2xl shadow text-left">
                <h3 className="text-xl font-bold mb-2">{plan.title}</h3>
                <p className="text-2xl font-semibold text-blue-600 mb-4">{plan.price}</p>
                <ul className="space-y-2 mb-4">
                  {plan.features.map((f, idx) => <li key={idx}>• {f}</li>)}
                </ul>
              </div>
          ))}
        </div>
      </section>

      {/* Pricing2 */}
      <section id="pricing2" className="py-20 px-6 text-center bg-gray-50">
        <h2 className="text-3xl font-bold mb-10">{t("One-time payment")}</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-6xl mx-auto">
          {[{
            title: "Basic Package",
            code: "BASIC_PACKAGE",
            price: "5$",
            features: ["50 " + t("generations"), "50 "+t("publications")]
          }].map((plan, i) => (
              <div key={i} className="bg-white p-6 rounded-2xl shadow text-left">
                <h3 className="text-xl font-bold mb-2">{plan.title}</h3>
                <p className="text-2xl font-semibold text-blue-600 mb-4">{plan.price}</p>
                <ul className="space-y-2 mb-4">
                  {plan.features.map((f, idx) => <li key={idx}>• {f}</li>)}
                </ul>
              </div>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 px-6 text-center">
        <h2 className="text-3xl font-bold mb-10">{t("What our users say")}</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {[t("I saved 8 hours a week by creating posts about books"), t("Finally there is a tool that automates my blog"), t("Great for SEO agencies, we generate reports for clients automatically")].map((quote, i) => (
              <div key={i} className="bg-white p-6 rounded-2xl shadow">
                <p className="text-lg italic">“{quote}”</p>
                <p className="mt-4 font-medium text-blue-600">{t("User")} #{i + 1}</p>
              </div>
          ))}
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 px-6 bg-blue-200 text-black text-center">
        <h2 className="text-3xl font-bold mb-6">{t("Ready to try?")}</h2>
        <p className="text-lg mb-6">{t("Upload your file and create unique AI content now")}</p>
        <a href={"/register"} className="btn bg-white text-blue-600 hover:bg-gray-100">{t("Start for free")}</a>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-20 px-6 text-center bg-gray-50">
        <h2 className="text-3xl font-bold mb-10">{t("Frequently asked questions")}</h2>
        <div className="max-w-4xl mx-auto space-y-6 text-left">
          {[{
            q: t("What files are supported?"),
            a: t("PDF, DOCX, TXT and other popular formats.")
          }, {
            q: t("Will my text be unique?"),
            a: t("Yes, we generate unique content using AI.")
          }, {
            q: t("Where can I publish content?"),
            a: t("We support autoposting to Telegram, Discord, and also to websites via API.")
          }, {
            q: t("Can I set a publishing schedule?"),
            a: t("Yes, you can create posts with a precise schedule by day and time.")
          }, {
            q: t("Can I edit the generated text before publishing?"),
            a: t("Of course! After generation, you can edit the text manually.")
          }, {
            q: t("Are my files and posts saved?"),
            a: t("Your files are stored in a secure environment. You can always view your post history and uploaded documents.")
          }, {
            q: t("How does content generation work?"),
            a: t("You upload a document or write a description, and AI creates text that fits the selected publishing channel.")
          }].map((faq, i) => (
              <div key={i}>
                <h3 className="font-semibold text-lg">{faq.q}</h3>
                <p className="text-gray-700">{faq.a}</p>
              </div>
          ))}
        </div>
      </section>


        {/* Social Media Links */}
        <section className="py-10 px-6 text-center bg-gray-50">
        <h2 className="text-3xl font-bold mb-6">{t("Follow us")}</h2>
        <div className="flex justify-center gap-6">
          <a href="https://t.me/autoquill" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Telegram</a>
          <a href="#" target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:underline">Discord</a>
          <a href={helpCenterLinks[i18n.language]} target="_blank" rel="noopener noreferrer" className="text-green-600 hover:underline">Notion Help Center</a>
        </div>
        </section>

    </div>
  </>
};
export default Landing;