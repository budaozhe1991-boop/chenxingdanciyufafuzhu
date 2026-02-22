/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  CheckCircle2, 
  XCircle, 
  ChevronRight, 
  RotateCcw, 
  Trophy, 
  BookOpen, 
  Info,
  Star,
  ArrowRight,
  GraduationCap
} from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { QUESTIONS } from './constants';
import { Question, UserAnswer, Difficulty } from './types';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export default function App() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<UserAnswer[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);

  const currentQuestion = QUESTIONS[currentIndex];

  // Initialize answers
  useEffect(() => {
    if (answers.length === 0) {
      setAnswers(QUESTIONS.map(q => ({
        questionId: q.id,
        selectedOptionId: null,
        isCorrect: null
      })));
    }
  }, []);

  const handleSelect = (optionId: string) => {
    if (isSubmitted) return;
    setSelectedId(optionId);
  };

  const handleSubmit = () => {
    if (!selectedId) return;
    
    const isCorrect = selectedId === currentQuestion.correctOptionId;
    const newAnswers = [...answers];
    newAnswers[currentIndex] = {
      questionId: currentQuestion.id,
      selectedOptionId: selectedId,
      isCorrect
    };
    setAnswers(newAnswers);
    setIsSubmitted(true);
    setShowExplanation(true);
  };

  const handleNext = () => {
    if (currentIndex < QUESTIONS.length - 1) {
      setCurrentIndex(prev => prev + 1);
      setSelectedId(null);
      setIsSubmitted(false);
      setShowExplanation(false);
    } else {
      setIsFinished(true);
    }
  };

  const resetQuiz = () => {
    setCurrentIndex(0);
    setAnswers(QUESTIONS.map(q => ({
      questionId: q.id,
      selectedOptionId: null,
      isCorrect: null
    })));
    setSelectedId(null);
    setIsSubmitted(false);
    setIsFinished(false);
    setShowExplanation(false);
  };

  const score = answers.filter(a => a.isCorrect).length;
  const progress = ((currentIndex + 1) / QUESTIONS.length) * 100;

  const getEncouragement = (score: number) => {
    const ratio = score / QUESTIONS.length;
    if (ratio === 1) return "太棒了！你是语法小天才！🌟";
    if (ratio >= 0.8) return "做得好！继续保持！🚀";
    if (ratio >= 0.6) return "不错哦，再加把劲！💪";
    return "别灰心，多练习一定会进步的！📚";
  };

  if (isFinished) {
    return (
      <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center p-4">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-md w-full bg-white rounded-3xl shadow-xl p-8 text-center border border-slate-100"
        >
          <div className="w-24 h-24 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Trophy className="w-12 h-12 text-yellow-500" />
          </div>
          <h1 className="text-3xl font-bold text-slate-800 mb-2">练习完成!</h1>
          <p className="text-slate-500 mb-6">你已经完成了所有的语法练习</p>
          
          <div className="bg-slate-50 rounded-2xl p-6 mb-8">
            <div className="text-5xl font-black text-indigo-600 mb-2">
              {score}<span className="text-2xl text-slate-400 font-normal"> / {QUESTIONS.length}</span>
            </div>
            <p className="text-indigo-500 font-medium">{getEncouragement(score)}</p>
          </div>

          <div className="space-y-3">
            <button 
              onClick={resetQuiz}
              className="w-full py-4 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700 transition-colors flex items-center justify-center gap-2 shadow-lg shadow-indigo-200"
            >
              <RotateCcw className="w-5 h-5" />
              重新开始
            </button>
            <div className="pt-4 border-t border-slate-100">
              <p className="text-sm text-slate-400 mb-3">推荐复习内容</p>
              <div className="flex flex-wrap justify-center gap-2">
                <a href="#" className="text-xs px-3 py-1.5 bg-slate-100 text-slate-600 rounded-full hover:bg-indigo-50 hover:text-indigo-600 transition-colors">定语从句基础</a>
                <a href="#" className="text-xs px-3 py-1.5 bg-slate-100 text-slate-600 rounded-full hover:bg-indigo-50 hover:text-indigo-600 transition-colors">非谓语动词用法</a>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-900 font-sans selection:bg-indigo-100">
      {/* Header */}
      <header className="bg-white border-bottom border-slate-200 sticky top-0 z-10 px-4 py-3 sm:px-6">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-indigo-600 rounded-lg">
              <GraduationCap className="w-5 h-5 text-white" />
            </div>
            <h1 className="text-lg font-bold text-slate-800 hidden sm:block">GrammarMaster</h1>
          </div>
          
          <div className="flex-1 max-w-xs mx-4">
            <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                className="h-full bg-indigo-500"
              />
            </div>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-sm font-bold text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full">
              {currentIndex + 1} / {QUESTIONS.length}
            </span>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto p-4 sm:p-6 lg:p-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Question Section */}
          <div className="lg:col-span-12">
            <motion.div 
              key={currentIndex}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-3xl shadow-sm border border-slate-200 p-6 sm:p-10"
            >
              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-6">
                <span className={cn(
                  "px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider",
                  currentQuestion.difficulty === Difficulty.JUNIOR ? "bg-emerald-50 text-emerald-600" :
                  currentQuestion.difficulty === Difficulty.MIDDLE ? "bg-amber-50 text-amber-600" :
                  "bg-rose-50 text-rose-600"
                )}>
                  {currentQuestion.difficulty}
                </span>
                <span className="px-3 py-1 bg-slate-100 text-slate-500 rounded-full text-xs font-bold uppercase tracking-wider">
                  {currentQuestion.category}
                </span>
              </div>

              {/* Sentence */}
              <div className="mb-10">
                <h2 className="text-2xl sm:text-3xl font-medium leading-relaxed text-slate-800">
                  {currentQuestion.sentence.split('____').map((part, i, arr) => (
                    <React.Fragment key={i}>
                      {part}
                      {i < arr.length - 1 && (
                        <span className={cn(
                          "inline-flex items-center justify-center min-w-[120px] px-4 py-1 mx-2 border-b-4 transition-all duration-300",
                          !selectedId ? "border-slate-200 text-transparent" :
                          isSubmitted ? (
                            answers[currentIndex].isCorrect ? "border-emerald-500 text-emerald-600 bg-emerald-50" : "border-rose-500 text-rose-600 bg-rose-50"
                          ) : "border-indigo-500 text-indigo-600 bg-indigo-50"
                        )}>
                          {selectedId ? currentQuestion.options.find(o => o.id === selectedId)?.text : "____"}
                        </span>
                      )}
                    </React.Fragment>
                  ))}
                </h2>
              </div>

              {/* Options */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
                {currentQuestion.options.map((option) => {
                  const isSelected = selectedId === option.id;
                  const isCorrect = option.id === currentQuestion.correctOptionId;
                  
                  return (
                    <button
                      key={option.id}
                      disabled={isSubmitted}
                      onClick={() => handleSelect(option.id)}
                      className={cn(
                        "group relative flex items-center p-5 rounded-2xl border-2 transition-all duration-200 text-left",
                        !isSubmitted && isSelected ? "border-indigo-500 bg-indigo-50 ring-4 ring-indigo-50" :
                        !isSubmitted ? "border-slate-100 hover:border-indigo-200 hover:bg-slate-50" :
                        isCorrect ? "border-emerald-500 bg-emerald-50" :
                        isSelected && !isCorrect ? "border-rose-500 bg-rose-50" : "border-slate-100 opacity-50"
                      )}
                    >
                      <div className={cn(
                        "w-10 h-10 rounded-xl flex items-center justify-center font-bold mr-4 transition-colors",
                        isSelected ? "bg-indigo-600 text-white" : "bg-slate-100 text-slate-400 group-hover:bg-indigo-100 group-hover:text-indigo-600"
                      )}>
                        {option.id.toUpperCase()}
                      </div>
                      <span className={cn(
                        "text-lg font-medium",
                        isSelected ? "text-indigo-900" : "text-slate-600"
                      )}>
                        {option.text}
                      </span>
                      
                      {isSubmitted && isCorrect && (
                        <CheckCircle2 className="ml-auto w-6 h-6 text-emerald-500" />
                      )}
                      {isSubmitted && isSelected && !isCorrect && (
                        <XCircle className="ml-auto w-6 h-6 text-rose-500" />
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Action */}
              <div className="flex items-center justify-between pt-6 border-t border-slate-100">
                <div className="flex items-center gap-2 text-slate-400">
                  <Info className="w-4 h-4" />
                  <span className="text-sm">选择正确答案并点击提交</span>
                </div>
                
                {!isSubmitted ? (
                  <button
                    disabled={!selectedId}
                    onClick={handleSubmit}
                    className={cn(
                      "px-8 py-3 rounded-xl font-bold transition-all flex items-center gap-2",
                      selectedId ? "bg-indigo-600 text-white shadow-lg shadow-indigo-200 hover:bg-indigo-700" : "bg-slate-100 text-slate-400 cursor-not-allowed"
                    )}
                  >
                    提交答案
                    <ArrowRight className="w-5 h-5" />
                  </button>
                ) : (
                  <button
                    onClick={handleNext}
                    className="px-8 py-3 bg-slate-900 text-white rounded-xl font-bold hover:bg-slate-800 transition-all flex items-center gap-2 shadow-lg shadow-slate-200"
                  >
                    {currentIndex < QUESTIONS.length - 1 ? "下一题" : "查看结果"}
                    <ChevronRight className="w-5 h-5" />
                  </button>
                )}
              </div>
            </motion.div>
          </div>

          {/* Explanation Section */}
          <AnimatePresence>
            {showExplanation && (
              <motion.div 
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="lg:col-span-12 overflow-hidden"
              >
                <div className="bg-white rounded-3xl shadow-sm border border-slate-200 p-6 sm:p-8">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="p-2 bg-amber-50 rounded-lg">
                      <BookOpen className="w-5 h-5 text-amber-600" />
                    </div>
                    <h3 className="text-xl font-bold text-slate-800">详解卡片</h3>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-6">
                      <div>
                        <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-2">正确答案</h4>
                        <p className="text-2xl font-bold text-emerald-600">{currentQuestion.explanation.correctAnswer}</p>
                      </div>
                      <div>
                        <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-2">语法规则</h4>
                        <p className="text-slate-600 leading-relaxed">{currentQuestion.explanation.rule}</p>
                      </div>
                    </div>
                    
                    <div className="space-y-6">
                      <div className="bg-indigo-50/50 rounded-2xl p-4 border border-indigo-50">
                        <h4 className="text-xs font-black text-indigo-400 uppercase tracking-widest mb-2">例句展示</h4>
                        <p className="text-indigo-900 font-medium italic">"{currentQuestion.explanation.example}"</p>
                      </div>
                      <div className="bg-rose-50/50 rounded-2xl p-4 border border-rose-50">
                        <h4 className="text-xs font-black text-rose-400 uppercase tracking-widest mb-2">常见错误辨析</h4>
                        <p className="text-rose-900 text-sm">{currentQuestion.explanation.commonMistake}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>

      {/* Footer / Motivational Tip */}
      <footer className="max-w-4xl mx-auto p-4 sm:p-6 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-full shadow-sm border border-slate-100 text-slate-500 text-sm">
          <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
          <span>坚持练习，每天进步一点点！</span>
        </div>
      </footer>
    </div>
  );
}
