import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, PlayCircle } from "lucide-react";

type Lesson = {
  id: number;
  title: string;
  videoUrl: string;
  quiz: { question: string; options: string[]; answer: string };
};

export default function EduAfricaLMS() {
  const [completedLessons, setCompletedLessons] = useState<number[]>([]);
  const [currentLesson, setCurrentLesson] = useState<Lesson | null>(lessons[0]);
  const [selectedAnswer, setSelectedAnswer] = useState("");
  const [quizResult, setQuizResult] = useState<"correct" | "wrong" | null>(
    null
  );

  const handleQuizSubmit = () => {
    if (!currentLesson) return;
    if (selectedAnswer === currentLesson.quiz.answer) {
      setQuizResult("correct");
      if (!completedLessons.includes(currentLesson.id)) {
        setCompletedLessons([...completedLessons, currentLesson.id]);
      }
    } else {
      setQuizResult("wrong");
    }
  };

  const progress = (completedLessons.length / lessons.length) * 100;

  return (
    <div className="pt-28 pb-16 max-w-6xl mx-auto px-4">
      {/* Header */}
      <div className="mb-10 text-center">
        <h1 className="text-3xl md:text-4xl font-bold mb-2">
          EduAfrica LMS
        </h1>
        <p className="text-muted-foreground">
          Learn anywhere, anytime. Track your progress and test your knowledge.
        </p>
      </div>

      {/* Progress Tracker */}
      <div className="mb-10">
        <div className="flex justify-between mb-2 text-sm font-medium">
          <span>Progress</span>
          <span>{completedLessons.length}/{lessons.length} Lessons</span>
        </div>
        <Progress value={progress} />
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        {/* Lessons list */}
        <div className="col-span-1 space-y-4">
          {lessons.map((lesson) => (
            <Card
              key={lesson.id}
              className={`cursor-pointer border ${
                currentLesson?.id === lesson.id ? "border-primary" : ""
              }`}
              onClick={() => {
                setCurrentLesson(lesson);
                setSelectedAnswer("");
                setQuizResult(null);
              }}
            >
              <CardContent className="flex items-center gap-3 p-4">
                {completedLessons.includes(lesson.id) ? (
                  <CheckCircle className="h-5 w-5 text-green-500" />
                ) : (
                  <PlayCircle className="h-5 w-5 text-muted-foreground" />
                )}
                <span>{lesson.title}</span>
                {completedLessons.includes(lesson.id) && (
                  <Badge className="ml-auto bg-green-100 text-green-800">
                    Done
                  </Badge>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Video + Quiz */}
        <div className="col-span-2 space-y-6">
          {currentLesson && (
            <>
              {/* Video Player */}
              <Card>
                <CardContent className="p-4">
                  <h2 className="text-xl font-bold mb-4">
                    {currentLesson.title}
                  </h2>
                  <div className="aspect-video bg-black rounded-lg overflow-hidden mb-4">
                    <iframe
                      className="w-full h-full"
                      src={currentLesson.videoUrl}
                      title={currentLesson.title}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Quiz Section */}
              <Card>
                <CardContent className="p-4">
                  <h3 className="font-semibold mb-4">
                    Quiz: {currentLesson.quiz.question}
                  </h3>
                  <div className="space-y-3">
                    {currentLesson.quiz.options.map((opt, idx) => (
                      <label
                        key={idx}
                        className={`flex items-center gap-2 p-2 border rounded-lg cursor-pointer ${
                          selectedAnswer === opt
                            ? "border-primary bg-primary/10"
                            : "border-border"
                        }`}
                      >
                        <input
                          type="radio"
                          name="quiz"
                          value={opt}
                          checked={selectedAnswer === opt}
                          onChange={() => setSelectedAnswer(opt)}
                        />
                        {opt}
                      </label>
                    ))}
                  </div>
                  <Button className="mt-4" onClick={handleQuizSubmit}>
                    Submit Answer
                  </Button>

                  {quizResult && (
                    <p
                      className={`mt-3 font-medium ${
                        quizResult === "correct"
                          ? "text-green-600"
                          : "text-red-600"
                      }`}
                    >
                      {quizResult === "correct"
                        ? "✅ Correct!"
                        : "❌ Wrong, try again."}
                    </p>
                  )}
                </CardContent>
              </Card>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

const lessons: Lesson[] = [
  {
    id: 1,
    title: "Introduction to African History",
    videoUrl: "https://youtu.be/6wiTZZ5EbQ4?si=mPAhzmPKMpN0Ujt_",
    quiz: {
      question: "Who is considered the father of African history?",
      options: ["Cheikh Anta Diop", "Kwame Nkrumah", "Nelson Mandela", "Wole Soyinka"],
      answer: "Cheikh Anta Diop",
    },
  },
  {
    id: 2,
    title: "Basics of African Literature",
    videoUrl: "https://youtu.be/1-cI7N4pgB4?si=Gxqw_YsfXnG7dRai",
    quiz: {
      question: "Who wrote 'Things Fall Apart'?",
      options: ["Ngugi wa Thiong'o", "Chinua Achebe", "Wole Soyinka", "Buchi Emecheta"],
      answer: "Chinua Achebe",
    },
  },
  {
    id: 3,
    title: "African Geography",
    videoUrl: "https://youtu.be/Y8m95sCDEf0?si=v_KcVOt_psY45G_6",
    quiz: {
      question: "Which is the largest country in Africa by land area?",
      options: ["Nigeria", "Algeria", "Sudan", "South Africa"],
      answer: "Algeria",
    },
  },
];
