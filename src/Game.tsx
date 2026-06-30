import { useMemo, useState } from "react";
import { useNavigate } from "react-router";

import {
  Box,
  Button,
  Container,
  LinearProgress,
  Paper,
  Stack,
  Typography,
} from "@mui/material";

import data from "./data.json";

type Source = "human" | "robot";

interface TextEntry {
  id: number;
  text: string;
  source: Source;
}

function shuffle(array: TextEntry[]): TextEntry[] {
  const copy = [...array];

  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }

  return copy;
}

function Game() {
  const navigate = useNavigate();

  const texts = useMemo(() => shuffle(data as TextEntry[]), []);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [correctAnswers, setCorrectAnswers] = useState(0);

  const currentText = texts[currentIndex];

  function answer(choice: Source) {
    let score = correctAnswers;

    if (choice === currentText.source) {
      score++;
      setCorrectAnswers(score);
    }

    if (currentIndex + 1 >= texts.length) {
      localStorage.setItem("lastScore", score.toString());
      navigate("/");
      return;
    }

    setCurrentIndex((previous) => previous + 1);
  }

  return (
    <Container maxWidth="md">
      <Box
        sx={{
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          gap: 4,
        }}
      >
        <Typography variant="h5" textAlign="center">
          Text {currentIndex + 1} von {texts.length}
        </Typography>

        <LinearProgress
          variant="determinate"
          value={((currentIndex + 1) / texts.length) * 100}
        />

        <Paper
          elevation={2}
          sx={{
            p: 4,
            minHeight: 220,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Typography
            variant="h6"
            textAlign="center"
            sx={{ whiteSpace: "pre-wrap" }}
          >
            {currentText.text}
          </Typography>
        </Paper>

        <Stack direction="row" spacing={2}>
          <Button
            fullWidth
            variant="contained"
            size="large"
            color="success"
            onClick={() => answer("human")}
          >
            Human
          </Button>

          <Button
            fullWidth
            variant="contained"
            size="large"
            color="primary"
            onClick={() => answer("robot")}
          >
            Robot
          </Button>
        </Stack>
      </Box>
    </Container>
  );
}

export default Game;