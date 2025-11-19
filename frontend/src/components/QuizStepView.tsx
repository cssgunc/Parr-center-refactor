import React, { useMemo, useState } from "react";
import {
  Box,
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  Typography,
  Alert,
} from "@mui/material";
import { QuizStep } from "@/lib/firebase/types";

interface QuizStepViewProps {
  step: QuizStep;
  onClose?: () => void;
}

export default function QuizStepView({ step, onClose }: QuizStepViewProps) {
  const [answers, setAnswers] = useState<number[]>(() =>
    step.questions.map(() => -1)
  );
  const [graded, setGraded] = useState(false);
  const questions = step.questions;

  const allAnswered = useMemo(() => answers.every((a) => a >= 0), [answers]);

  const handleSelect = (qIndex: number, choiceIndex: number) => {
    setAnswers((prev) => {
      const copy = [...prev];
      copy[qIndex] = choiceIndex;
      return copy;
    });
  };

  const grade = () => {
    setGraded(true);
  };

  const reset = () => {
    setAnswers(questions.map(() => -1));
    setGraded(false);
  };

  const results = useMemo(() => {
    const correctCount = questions.reduce(
      (acc, q, i) => (answers[i] === q.correctIndex ? acc + 1 : acc),
      0
    );
    const percent =
      questions.length > 0
        ? Math.round((correctCount / questions.length) * 100)
        : 0;
    const passed = percent >= step.passingScore;
    return { correctCount, percent, passed };
  }, [answers, questions, step.passingScore]);

  return (
    <Box sx={{ width: "100%", maxWidth: "1400px", mt: 4, bgcolor: "background.paper", p: 3, borderRadius: 2 }}>
      <Typography variant="h5" sx={{ fontWeight: 700, mb: 2 }}>
        Quiz
      </Typography>

      {questions.map((q, qi) => {
        const userAnswer = answers[qi];
        const isCorrect = graded && userAnswer === q.correctIndex;
        const isIncorrect = graded && userAnswer !== q.correctIndex;

        return (
          <Box
            key={qi}
            component="section"
            sx={{ mb: 2 }}
            aria-labelledby={`q-${qi}-label`}
          >
            <FormControl component="fieldset" fullWidth>
              <FormLabel id={`q-${qi}-label`}>
                <Typography sx={{ fontWeight: 600 }}>{`${qi + 1}. ${
                  q.prompt
                }`}</Typography>
              </FormLabel>

              <RadioGroup
                aria-labelledby={`q-${qi}-label`}
                name={`question-${qi}`}
                value={String(userAnswer)}
                onChange={(e) => handleSelect(qi, Number(e.target.value))}
              >
                {q.choices.map((choice, ci) => {
                  const showCorrect = graded && ci === q.correctIndex;
                  const userPicked = answers[qi] === ci;

                  return (
                    <Box
                      key={ci}
                      sx={{
                        mb: 1,
                        p: 1,
                        borderRadius: 1,
                        border: (t) =>
                          showCorrect
                            ? `1px solid ${t.palette.success.main}`
                            : userPicked && isIncorrect
                            ? `1px solid ${t.palette.error.main}`
                            : "1px solid transparent",
                        bgcolor: showCorrect
                          ? (t) => t.palette.action.hover
                          : "transparent",
                      }}
                    >
                      <FormControlLabel
                        value={String(ci)}
                        control={<Radio disabled={graded} />}
                        label={<Typography>{choice}</Typography>}
                      />
                    </Box>
                  );
                })}
              </RadioGroup>

              {graded && isIncorrect && (
                <Box sx={{ mt: 1 }}>
                  <Alert severity="info">
                    <strong>Correct:</strong> {q.choices[q.correctIndex]}
                    {q.explanation ? (
                      <div style={{ marginTop: 8 }}>{q.explanation}</div>
                    ) : null}
                  </Alert>
                </Box>
              )}

              {graded && isCorrect && (
                <Box sx={{ mt: 1 }}>
                  <Alert severity="success">Correct</Alert>
                </Box>
              )}
            </FormControl>
          </Box>
        );
      })}

      <Box sx={{ display: "flex", gap: 2, mt: 2, alignItems: "center" }}>
        {!graded ? (
          <>
            <Button
              variant="contained"
              color="primary"
              onClick={grade}
              disabled={!allAnswered}
            >
              Check Answers
            </Button>
            <Button variant="outlined" onClick={reset}>
              Reset
            </Button>
            <Typography sx={{ color: (t) => t.palette.text.secondary }}>
              {questions.length} question{questions.length !== 1 ? "s" : ""}
            </Typography>
          </>
        ) : (
          <>
            <Box sx={{ flex: 1 }}>
              <Alert severity={results.passed ? "success" : "error"}>
                {results.passed ? (
                  <div>
                    <strong>Passed</strong> — You scored {results.percent}% (
                    {results.correctCount}/{questions.length})
                  </div>
                ) : (
                  <div>
                    <strong>Not passing</strong> — You scored {results.percent}%
                    ({results.correctCount}/{questions.length})
                  </div>
                )}
              </Alert>
            </Box>

            <Button variant="contained" onClick={reset}>
              Retake
            </Button>
          </>
        )}
      </Box>
    </Box>
  );
}
