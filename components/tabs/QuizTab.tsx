import React, { useState } from 'react';
import { Award, CheckCircle, XCircle } from 'lucide-react';
import { QuizQuestion } from '../../types';

const questions: QuizQuestion[] = [
  {
    id: 1,
    question: "Adding more RAM to a single computer is an example of...",
    options: ["Horizontal Scaling", "Vertical Scaling", "Sharding", "Load Balancing"],
    correctAnswer: 1
  },
  {
    id: 2,
    question: "Which component is essential for Horizontal Scaling to distribute traffic?",
    options: ["Bigger CPU", "Load Balancer", "Larger Hard Drive", "More Electricity"],
    correctAnswer: 1
  },
  {
    id: 3,
    question: "Splitting a large database into smaller partitions based on User ID is called...",
    options: ["Replication", "Backups", "Sharding", "Caching"],
    correctAnswer: 2
  }
];

const QuizTab: React.FC = () => {
  const [answers, setAnswers] = useState<number[]>(new Array(questions.length).fill(-1));
  const [submitted, setSubmitted] = useState(false);

  const handleSelect = (qIndex: number, optionIndex: number) => {
    if (submitted) return;
    const newAnswers = [...answers];
    newAnswers[qIndex] = optionIndex;
    setAnswers(newAnswers);
  };

  const calculateScore = () => {
    return answers.reduce((acc, ans, idx) => acc + (ans === questions[idx].correctAnswer ? 1 : 0), 0);
  };

  return (
    <div className="max-w-2xl mx-auto space-y-8 animate-fadeIn">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-white mb-2">System Design Quiz</h2>
        <p className="text-slate-400">Test your knowledge on scalability concepts.</p>
      </div>

      <div className="space-y-6">
        {questions.map((q, qIdx) => (
          <div key={q.id} className="bg-slate-800 border border-slate-700 rounded-lg p-6">
            <h3 className="text-lg text-white font-medium mb-4">{qIdx + 1}. {q.question}</h3>
            <div className="space-y-2">
              {q.options.map((opt, optIdx) => {
                let btnClass = "w-full text-left p-3 rounded border transition-all ";
                
                if (submitted) {
                    if (optIdx === q.correctAnswer) btnClass += "bg-green-900/30 border-green-500 text-green-300 ";
                    else if (answers[qIdx] === optIdx) btnClass += "bg-red-900/30 border-red-500 text-red-300 ";
                    else btnClass += "bg-slate-900 border-slate-700 text-slate-500 opacity-50 ";
                } else {
                    if (answers[qIdx] === optIdx) btnClass += "bg-neon-blue/20 border-neon-blue text-white ";
                    else btnClass += "bg-slate-900 border-slate-700 text-slate-300 hover:bg-slate-700 ";
                }

                return (
                  <button
                    key={optIdx}
                    onClick={() => handleSelect(qIdx, optIdx)}
                    className={btnClass}
                  >
                    <div className="flex justify-between items-center">
                        <span>{opt}</span>
                        {submitted && optIdx === q.correctAnswer && <CheckCircle size={18} className="text-green-500"/>}
                        {submitted && answers[qIdx] === optIdx && optIdx !== q.correctAnswer && <XCircle size={18} className="text-red-500"/>}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-center pt-6">
        {!submitted ? (
            <button
                onClick={() => setSubmitted(true)}
                disabled={answers.includes(-1)}
                className={`px-8 py-3 rounded-full font-bold text-lg transition-all ${answers.includes(-1) ? 'bg-slate-700 text-slate-500 cursor-not-allowed' : 'bg-neon-green text-slate-900 hover:bg-green-400 shadow-[0_0_15px_rgba(10,255,10,0.5)]'}`}
            >
                Submit Answers
            </button>
        ) : (
            <div className="bg-slate-800 border border-slate-600 rounded-lg p-6 text-center w-full animate-bounce-in">
                <Award className="w-12 h-12 text-neon-yellow mx-auto mb-2" />
                <div className="text-2xl font-bold text-white mb-1">
                    You scored {calculateScore()} / {questions.length}
                </div>
                <p className="text-slate-400 mb-4">
                    {calculateScore() === 3 ? "Excellent! You are ready to architect systems." : "Good effort! Review the tabs to get a perfect score."}
                </p>
                <button 
                    onClick={() => {
                        setSubmitted(false);
                        setAnswers([-1, -1, -1]);
                    }}
                    className="text-neon-blue underline hover:text-white"
                >
                    Retry Quiz
                </button>
            </div>
        )}
      </div>
    </div>
  );
};

export default QuizTab;
