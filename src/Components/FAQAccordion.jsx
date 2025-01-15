import React, { useState } from "react";

const AccordionItem = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="border-b border-gray-300">
      <button
        onClick={toggleAccordion}
        className="flex justify-between items-center w-full px-4 py-2 focus:outline-none"
      >
        <span className="text-lg font-medium ">{question}</span>
        <span className="ml-2">{isOpen ? "-" : "+"}</span>
      </button>
      {isOpen && (
        <div className="px-4 py-2">
          <p className="text-[#A4DEF1]">{answer}</p>
        </div>
      )}
    </div>
  );
};

const FAQAccordion = () => {
  const faqs = [
    {
      id: 1,
      question: "What genres do you feature?",
      answer:
        "We feature a wide range of genres including Fantasy, Adventure, Action, Science Fiction, Comedy, Crime, Drama, Horror, Romance, and Thriller.",
    },
    {
      id: 2,
      question: "How can I search for movies?",
      answer:
        "You can use our search feature located in the header to search for movies by title, genre, or any other keyword.",
    },
    {
      id: 3,
      question: "Can I save my favorite movies?",
      answer:
        "Yes, you can sign in and save your favorite movies to your profile.",
    },
    {
      id: 4,
      question: "Do you provide trailers for movies?",
      answer:
        "Absolutely! You can watch trailers for movies directly on our website. Just click on the movie poster to view the details page with the trailer.",
    },
    {
      id: 5,
      question: "How do ratings work?",
      answer:
        "You can rate movies and TV shows on Movie Mania using our star rating system. Simply hover over the stars and click to set your rating. ",
    },
  ];

  return (
    <div className="mt-4">
      {faqs.map((faq) => (
        <AccordionItem
          key={faq.id}
          question={faq.question}
          answer={faq.answer}
        />
      ))}
    </div>
  );
};

export default FAQAccordion;
